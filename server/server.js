import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import Stripe from 'stripe';
import { db, rowToCar, rowToOrder } from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;
const WHATSAPP_SALES = process.env.WHATSAPP_SALES || '18767589163';

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req,res)=>res.json({ok:true, service:'Alrobe API + SQLite', stripe: !!stripe, whatsapp: WHATSAPP_SALES, time:new Date().toISOString()}));

// ---- Parts ----
app.get('/api/parts', (req,res)=>{
  const { q, brand, category } = req.query;
  let sql = 'SELECT * FROM parts WHERE 1=1'; const args=[];
  if(brand && brand!=='All'){ sql+=' AND brand=?'; args.push(brand); }
  if(category && category!=='All'){ sql+=' AND category=?'; args.push(category); }
  let rows = db.prepare(sql).all(...args);
  if(q) { const s=q.toLowerCase(); rows = rows.filter(p=>(p.name+p.brand+p.id+(p.oem||'')+(p.fitment||'')).toLowerCase().includes(s)); }
  res.json(rows);
});
app.get('/api/parts/:id', (req,res)=>{
  const p = db.prepare('SELECT * FROM parts WHERE id=?').get(req.params.id);
  if(!p) return res.status(404).json({error:'Not found'});
  res.json(p);
});

// ---- VIN ----
app.get('/api/vin/:vin', (req,res)=>{
  const vin = req.params.vin.toUpperCase();
  if (vin.length < 11) return res.status(400).json({error:'VIN too short'});
  res.json({ vin, make: vin.startsWith('J')?'Toyota (Japan)':'Honda', model:'Corolla / Vezel class', year:2018+(vin.charCodeAt(0)%6), engine:'1.8L Hybrid / 1.5L Petrol', recommended:['BOS-1150','FEB-7701','BOS-2204'] });
});

// ---- Cars ----
app.get('/api/cars', (req,res)=>{
  const { q, condition } = req.query;
  let sql='SELECT * FROM cars WHERE 1=1'; const args=[];
  if(condition && condition!=='All'){ sql+=' AND condition=?'; args.push(condition); }
  let rows = db.prepare(sql).all(...args).map(rowToCar);
  if(q) rows = rows.filter(c=>c.title.toLowerCase().includes(q.toLowerCase()));
  res.json(rows);
});
app.get('/api/cars/:id', (req,res)=>{
  const c = db.prepare('SELECT * FROM cars WHERE id=?').get(req.params.id);
  if(!c) return res.status(404).json({error:'Not found'});
  res.json(rowToCar(c));
});

// ---- Import quote ----
app.post('/api/import-quote', (req,res)=>{
  const { cif=20000, engineCC=1500, age=3, condition='Used' } = req.body;
  const duty = cif*0.20 + (engineCC>2000? cif*0.10:0) + (age>5? 500:0);
  const gct = (cif+duty)*0.15;
  const total = cif+duty+gct+350+280;
  const quote = { cif, duty:Math.round(duty), gct:Math.round(gct), broker:280, handling:350, total:Math.round(total), eta:'25-35 days via Kingston Port', id:'Q-'+Date.now().toString().slice(-6) };
  db.prepare('INSERT INTO quotes VALUES (?,?,?,?)').run(quote.id, JSON.stringify({...quote,...req.body}), quote.total, new Date().toISOString());
  res.json(quote);
});
app.get('/api/quotes', (req,res)=>{
  const rows = db.prepare('SELECT * FROM quotes ORDER BY created DESC LIMIT 100').all();
  res.json(rows.map(r=>({id:r.id, total:r.total, created:r.created, ...JSON.parse(r.data)})));
});

// ---- Orders ----
app.post('/api/orders', (req,res)=>{
  const { items, customer, total, payment_method='unpaid' } = req.body;
  if(!items?.length) return res.status(400).json({error:'Empty cart'});
  const id = 'ALR-'+Math.floor(100000+Math.random()*899999);
  db.prepare('INSERT INTO orders (id,items,customer,total,status,payment_method,payment_status,created) VALUES (?,?,?,?,?,?,?,?)')
    .run(id, JSON.stringify(items), JSON.stringify(customer||{}), total||0, 'Received - Kingston Free Zone', payment_method, 'pending', new Date().toISOString());
  res.json({ id, items, customer, total, payment_method, payment_status:'pending', status:'Received - Kingston Free Zone' });
});
app.get('/api/orders', (req,res)=>{
  res.json(db.prepare('SELECT * FROM orders ORDER BY created DESC LIMIT 200').all().map(rowToOrder));
});
app.patch('/api/orders/:id', (req,res)=>{
  const { status, payment_status, whatsapp_sent } = req.body;
  const o = db.prepare('SELECT * FROM orders WHERE id=?').get(req.params.id);
  if(!o) return res.status(404).json({error:'Not found'});
  db.prepare('UPDATE orders SET status=COALESCE(?,status), payment_status=COALESCE(?,payment_status), whatsapp_sent=COALESCE(?,whatsapp_sent) WHERE id=?')
    .run(status??null, payment_status??null, whatsapp_sent??null, req.params.id);
  res.json(rowToOrder(db.prepare('SELECT * FROM orders WHERE id=?').get(req.params.id)));
});

// ---- Payments ----
app.get('/api/payments/methods', (req,res)=>res.json({
  stripe: !!stripe,
  whatsapp: WHATSAPP_SALES,
  methods: [
    {id:'card', label:'Card (Stripe)', enabled: !!stripe, note: stripe?'Live Visa/MC via Stripe':'Set STRIPE_SECRET_KEY to go live — demo mode now'},
    {id:'bank', label:'Bank Transfer (NCB / JN)', enabled:true, note:'NCB A/C 123-456789 — upload receipt on WhatsApp'},
    {id:'lynk', label:'Lynk / WiPay', enabled:true, note:'Send to @AlrobeIntl — confirm via WhatsApp'},
    {id:'pickup', label:'Cash on Pickup (Free Zone)', enabled:true, note:'Pay USD/JMD at 44 Caracas Ave'},
    {id:'whatsapp', label:'Order via WhatsApp', enabled:true, note:'Send cart straight to sales'},
  ]
}));

app.post('/api/payments/create-intent', async (req,res)=>{
  const { order_id, amount } = req.body;
  if(!order_id || !amount) return res.status(400).json({error:'order_id + amount required'});
  const pid = 'pi_'+Date.now().toString(36);
  if(!stripe){
    db.prepare('INSERT INTO payments VALUES (?,?,?,?,?,?,?)').run(pid, order_id, amount, 'card-demo', pid, 'requires_confirmation', new Date().toISOString());
    return res.json({ mock:true, clientSecret: pid, message:'Stripe not configured — demo intent. Add STRIPE_SECRET_KEY for live cards.' });
  }
  try{
    const intent = await stripe.paymentIntents.create({ amount: Math.round(amount*100), currency:'usd', metadata:{order_id} });
    db.prepare('INSERT INTO payments VALUES (?,?,?,?,?,?,?)').run(intent.id, order_id, amount, 'card', intent.id, 'requires_confirmation', new Date().toISOString());
    res.json({ clientSecret: intent.client_secret, id: intent.id });
  }catch(e){ res.status(500).json({error:e.message}); }
});

app.post('/api/payments/confirm', (req,res)=>{
  const { order_id, method='bank', provider_ref='' } = req.body;
  const o = db.prepare('SELECT * FROM orders WHERE id=?').get(order_id);
  if(!o) return res.status(404).json({error:'Order not found'});
  const pid = provider_ref || ('man_'+Date.now().toString(36));
  db.prepare('INSERT OR REPLACE INTO payments VALUES (?,?,?,?,?,?,?)').run(pid, order_id, o.total, method, provider_ref||'', 'confirmed', new Date().toISOString());
  db.prepare("UPDATE orders SET payment_method=?, payment_status='paid' WHERE id=?").run(method, order_id);
  res.json({ok:true, order_id, payment:pid});
});

app.get('/api/payments', (req,res)=>res.json(db.prepare('SELECT * FROM payments ORDER BY created DESC LIMIT 100').all()));

// ---- Track ----
app.get('/api/track/:id', (req,res)=>{
  const id = req.params.id.toUpperCase();
  const o = db.prepare('SELECT * FROM orders WHERE id=?').get(req.params.id.toUpperCase()) || db.prepare('SELECT * FROM orders WHERE id=?').get(req.params.id);
  const stages = ['Order Received','Kingston Free Zone Pick/Pack','Customs Cleared','In Transit / On Vessel','Out for Delivery','Delivered'];
  const idx = id.charCodeAt(id.length-1)%stages.length;
  res.json({ id, status: o?.status || stages[idx], payment_status: o?.payment_status||'unknown', progress:Math.round(((idx+1)/stages.length)*100), stages, updated:new Date().toISOString(), location:'Port of Kingston, Jamaica' });
});

// ---- Contact (persisted) ----
app.post('/api/contact', (req,res)=>{
  const {name='',email='',phone='',topic='',msg=''}=req.body;
  db.prepare('INSERT INTO contacts (name,email,phone,topic,msg,created) VALUES (?,?,?,?,?,?)').run(name,email,phone,topic,msg,new Date().toISOString());
  res.json({ok:true, message:'Received! Our Kingston team will call you Mon-Fri 10am-4pm.'});
});
app.get('/api/contacts', (req,res)=>res.json(db.prepare('SELECT * FROM contacts ORDER BY created DESC LIMIT 100').all()));

app.listen(PORT, ()=>console.log(`Alrobe API + SQLite on :${PORT} | stripe:${!!stripe}`));
