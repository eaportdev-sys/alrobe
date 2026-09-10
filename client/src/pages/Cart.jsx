import { Link } from 'react-router-dom';
import { useStore } from '../lib/store';
import { useEffect, useState } from 'react';
import { createOrder, getMethods, createIntent, confirmPayment } from '../lib/api';
import { cartToWhatsApp } from '../lib/whatsapp';
import { CreditCard, Landmark, Smartphone, Banknote, MessageCircle } from 'lucide-react';

const ICONS = { card: CreditCard, bank: Landmark, lynk: Smartphone, pickup: Banknote, whatsapp: MessageCircle };

export default function Cart(){
  const {cart,setQty,remove,total,clear}=useStore();
  const [cust,setCust]=useState({name:'',phone:'',email:''});
  const [order,setOrder]=useState(null);
  const [methods,setMethods]=useState([]);
  const [payMethod,setPayMethod]=useState('pickup');
  const [payMsg,setPayMsg]=useState('');
  const [stripeInfo,setStripeInfo]=useState(null);

  useEffect(()=>{ getMethods().then(m=>{ setMethods(m.methods||[]); }).catch(()=>{}); },[]);

  const placeOrder = async () => {
    const o = await createOrder({items:cart,customer:cust,total,payment_method:payMethod});
    if(payMethod==='card'){
      const intent = await createIntent({order_id:o.id, amount:total});
      setStripeInfo(intent);
      if(intent.mock) setPayMsg('Demo card intent created ('+intent.clientSecret+'). Add STRIPE_SECRET_KEY for live Visa/MC. We marked order as pending — pay on pickup or via bank.');
    }
    if(payMethod==='whatsapp'){
      window.open(cartToWhatsApp(cart,total,cust),'_blank');
    }
    setOrder(o); clear();
  };

  const markPaid = async (method) => {
    if(!order) return;
    await confirmPayment({order_id:order.id, method, provider_ref:''});
    setPayMsg(`Marked ${order.id} as paid via ${method}. Receipt logged.`);
  };

  if(order) return (
    <div className="max-w-xl mx-auto px-4 py-12 text-center">
      <div className="text-6xl">🎉</div>
      <h1 className="font-display font-extrabold text-3xl mt-3">Order {order.id} received!</h1>
      <p className="text-black/60 mt-2">Pay method: <b>{order.payment_method}</b> • Total ${order.total.toFixed(2)} USD. Our Free Zone team will call {cust.phone||'you'}.</p>
      {stripeInfo?.mock && <div className="mt-3 text-xs bg-amber-50 border border-amber-200 rounded-xl p-3">Stripe demo mode: {stripeInfo.message}</div>}
      <div className="grid sm:grid-cols-2 gap-2 mt-5">
        <a href={cartToWhatsApp([],order.total,cust)} onClick={e=>e.preventDefault()} className="hidden"/>
        <a href={`https://wa.me/18767589163?text=${encodeURIComponent(`Hello ALROBE! Order ${order.id} — $${order.total.toFixed(2)} — Name ${cust.name}`)}`} target="_blank" className="bg-[#25D366] text-white font-bold px-5 py-3 rounded-full text-sm flex items-center justify-center gap-2"><MessageCircle size={16}/> Send receipt on WhatsApp</a>
        <button onClick={()=>markPaid('bank')} className="border px-5 py-3 rounded-full font-bold text-sm">I paid via Bank/Lynk</button>
        <button onClick={()=>markPaid('pickup')} className="border px-5 py-3 rounded-full font-bold text-sm">Pay on pickup</button>
        <Link to="/track" className="bg-[#0A1931] text-white px-5 py-3 rounded-full font-bold text-sm">Track order</Link>
      </div>
      {payMsg && <div className="mt-3 text-sm bg-green-50 border border-green-200 rounded-xl p-3">{payMsg}</div>}
      <Link to="/parts" className="block mt-4 text-sm font-bold text-[#009B3A]">Keep shopping →</Link>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-[1fr_360px] gap-6">
      <div>
        <h1 className="font-display font-extrabold text-3xl">Your cart ({cart.length})</h1>
        <div className="space-y-3 mt-4">{cart.length===0&&<div className="bg-white border rounded-3xl p-8 text-center">Empty — <Link to="/parts" className="text-[#009B3A] font-bold">shop parts</Link> or <Link to="/cars" className="text-[#FF6B35] font-bold">browse cars</Link></div>}
        {cart.map(i=><div key={i.id} className="bg-white border rounded-2xl p-3 flex gap-3 items-center"><img src={i.img} className="w-20 h-20 rounded-xl object-cover" alt=""/><div className="flex-1"><div className="font-bold text-sm">{i.name}</div><div className="text-xs text-black/50">{i.id} • ${i.price}</div><div className="flex items-center gap-2 mt-2"><button onClick={()=>setQty(i.id,i.qty-1)} className="w-7 h-7 rounded-full border font-bold">-</button><span className="text-sm font-bold">{i.qty}</span><button onClick={()=>setQty(i.id,i.qty+1)} className="w-7 h-7 rounded-full border font-bold">+</button><button onClick={()=>remove(i.id)} className="text-xs text-red-600 ml-2">Remove</button></div></div><div className="font-extrabold">${(i.price*i.qty).toFixed(2)}</div></div>)}
        </div>
        {cart.length>0 && <a href={cartToWhatsApp(cart,total,cust)} target="_blank" className="mt-4 inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-5 py-2.5 rounded-full text-sm"><MessageCircle size={16}/> Quick order via WhatsApp</a>}
      </div>
      <div className="bg-[#0A1931] text-white rounded-3xl p-6 h-fit">
        <div className="font-display font-bold text-lg">Checkout + Payment</div>
        <div className="space-y-2 mt-3"><input placeholder="Name" value={cust.name} onChange={e=>setCust({...cust,name:e.target.value})} className="w-full rounded-xl px-3 py-2 text-sm text-black outline-none"/><input placeholder="Phone / WhatsApp" value={cust.phone} onChange={e=>setCust({...cust,phone:e.target.value})} className="w-full rounded-xl px-3 py-2 text-sm text-black outline-none"/><input placeholder="Email" value={cust.email} onChange={e=>setCust({...cust,email:e.target.value})} className="w-full rounded-xl px-3 py-2 text-sm text-black outline-none"/></div>
        <div className="font-bold text-sm mt-4 mb-2">Pay with</div>
        <div className="grid gap-2">
          {(methods.length?methods:[{id:'pickup',label:'Cash on Pickup'},{id:'bank',label:'Bank Transfer'},{id:'lynk',label:'Lynk / WiPay'},{id:'card',label:'Card (Stripe)'},{id:'whatsapp',label:'WhatsApp Order'}]).map(m=>{
            const Icon = ICONS[m.id]||Banknote;
            return <button key={m.id} onClick={()=>setPayMethod(m.id)} className={`flex items-center gap-2 text-left px-3 py-2.5 rounded-2xl text-sm border ${payMethod===m.id?'bg-[#FED100] text-black border-[#FED100] font-extrabold':'bg-white/10 border-white/15'}`}><Icon size={16}/><span>{m.label}<span className="block text-[11px] font-normal opacity-70">{m.note||''}</span></span></button>
          })}
        </div>
        <div className="flex justify-between text-sm mt-4"><span className="text-white/70">Subtotal</span><b>${total.toFixed(2)}</b></div>
        <div className="flex justify-between font-display font-extrabold text-xl mt-1 pt-2 border-t border-white/15"><span>Total</span><span className="text-[#FED100]">${total.toFixed(2)}</span></div>
        <button disabled={!cart.length} onClick={placeOrder} className="mt-4 w-full bg-[#FED100] text-black font-extrabold py-3 rounded-full disabled:opacity-40">Place order • {payMethod}</button>
        <p className="text-[11px] text-white/50 mt-2">Bank: NCB 123-456789 / JN — send receipt via WhatsApp. Cards via Stripe when keys set. USD pricing.</p>
      </div>
    </div>
  );
}
