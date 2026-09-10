import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'alrobe.db');

export const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

db.exec(`
CREATE TABLE IF NOT EXISTS parts (
  id TEXT PRIMARY KEY, brand TEXT, name TEXT, category TEXT,
  fitment TEXT, price REAL, oldPrice REAL, stock INTEGER,
  rating REAL, img TEXT, badge TEXT, oem TEXT
);
CREATE TABLE IF NOT EXISTS cars (
  id TEXT PRIMARY KEY, title TEXT, condition TEXT, origin TEXT,
  price REAL, year INTEGER, mileage INTEGER, fuel TEXT,
  trans TEXT, drive TEXT, location TEXT, stock TEXT,
  img TEXT, badge TEXT, specs TEXT
);
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY, items TEXT, customer TEXT, total REAL,
  status TEXT, payment_method TEXT DEFAULT 'unpaid',
  payment_status TEXT DEFAULT 'pending',
  whatsapp_sent INTEGER DEFAULT 0,
  created TEXT
);
CREATE TABLE IF NOT EXISTS quotes (
  id TEXT PRIMARY KEY, data TEXT, total REAL, created TEXT
);
CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT,
  phone TEXT, topic TEXT, msg TEXT, created TEXT
);
CREATE TABLE IF NOT EXISTS payments (
  id TEXT PRIMARY KEY, order_id TEXT, amount REAL, method TEXT,
  provider_ref TEXT, status TEXT, created TEXT
);
`);

function count(t){ return db.prepare(`SELECT COUNT(*) c FROM ${t}`).get().c; }

function seedIfEmpty(){
  const dataDir = path.join(__dirname,'data');
  try{
    if(count('parts')===0 && fs.existsSync(path.join(dataDir,'parts.json'))){
      const parts = JSON.parse(fs.readFileSync(path.join(dataDir,'parts.json'),'utf-8'));
      const ins = db.prepare(`INSERT OR REPLACE INTO parts VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`);
      const tx = db.transaction(()=>{ for(const p of parts) ins.run(p.id,p.brand,p.name,p.category,p.fitment,p.price,p.oldPrice??null,p.stock,p.rating,p.img,p.badge??null,p.oem); });
      tx(); console.log(`Seeded ${parts.length} parts`);
    }
    if(count('cars')===0 && fs.existsSync(path.join(dataDir,'cars.json'))){
      const cars = JSON.parse(fs.readFileSync(path.join(dataDir,'cars.json'),'utf-8'));
      const ins = db.prepare(`INSERT OR REPLACE INTO cars VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);
      const tx = db.transaction(()=>{ for(const c of cars) ins.run(c.id,c.title,c.condition,c.origin,c.price,c.year,c.mileage,c.fuel,c.trans,c.drive,c.location,c.stock,c.img,c.badge,JSON.stringify(c.specs||[])); });
      tx(); console.log(`Seeded ${cars.length} cars`);
    }
    // Migrate old JSON orders/quotes if tables empty
    for(const [file, table] of [['orders.json','orders'],['quotes.json','quotes']]){
      const fp = path.join(dataDir,file);
      if(!fs.existsSync(fp)) continue;
      const arr = JSON.parse(fs.readFileSync(fp,'utf-8'));
      if(table==='orders' && count('orders')===0 && arr.length){
        const ins = db.prepare(`INSERT OR REPLACE INTO orders (id,items,customer,total,status,payment_method,payment_status,created) VALUES (?,?,?,?,?,?,?,?)`);
        const tx = db.transaction(()=>{ for(const o of arr) ins.run(o.id, JSON.stringify(o.items||[]), JSON.stringify(o.customer||{}), o.total||0, o.status||'Received', o.payment_method||'unpaid', o.payment_status||'pending', o.created||new Date().toISOString()); });
        tx(); console.log(`Migrated ${arr.length} orders from JSON`);
      }
      if(table==='quotes' && count('quotes')===0 && arr.length){
        const ins = db.prepare(`INSERT OR REPLACE INTO quotes VALUES (?,?,?,?)`);
        const tx = db.transaction(()=>{ for(const q of arr) ins.run(q.id||('Q-'+Date.now()), JSON.stringify(q), q.total||0, q.created||new Date().toISOString()); });
        tx(); console.log(`Migrated ${arr.length} quotes from JSON`);
      }
    }
  }catch(e){ console.error('Seed error', e.message); }
}
seedIfEmpty();

export const rowToCar = r => ({...r, specs: r.specs?JSON.parse(r.specs):[]});
export const rowToOrder = r => ({...r, items: JSON.parse(r.items||'[]'), customer: JSON.parse(r.customer||'{}'), whatsapp_sent: !!r.whatsapp_sent});
