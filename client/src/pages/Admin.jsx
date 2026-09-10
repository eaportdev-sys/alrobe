import { useEffect, useState } from 'react';
import { getOrders, getQuotes, getPayments, getContacts, patchOrder } from '../lib/api';
export default function Admin(){
  const [orders,setOrders]=useState([]); const [quotes,setQuotes]=useState([]);
  const [payments,setPayments]=useState([]); const [contacts,setContacts]=useState([]);
  const refresh = () => {
    getOrders().then(setOrders).catch(()=>{});
    getQuotes().then(setQuotes).catch(()=>{});
    getPayments().then(setPayments).catch(()=>{});
    getContacts().then(setContacts).catch(()=>{});
  };
  useEffect(refresh,[]);
  const revenue = orders.reduce((s,o)=>s+(o.total||0),0);
  const paid = orders.filter(o=>o.payment_status==='paid').length;
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-display font-extrabold text-3xl">Admin <span className="text-[#009B3A]">dashboard</span> <span className="text-sm font-body font-normal text-black/50">SQLite live</span></h1>
      <div className="grid sm:grid-cols-5 gap-3 mt-4">
        {[['Revenue (USD)','$'+revenue.toFixed(0)],['Orders',orders.length],['Paid',paid],['Import quotes',quotes.length],['Payments',payments.length]].map(([k,v])=><div key={k} className="bg-white border rounded-2xl p-4"><div className="text-xs text-black/50">{k}</div><div className="font-display font-extrabold text-2xl">{v}</div></div>)}
      </div>
      <div className="grid lg:grid-cols-2 gap-5 mt-6">
        <div className="bg-white border rounded-3xl p-5"><div className="font-bold mb-3">Latest orders + payments</div><div className="space-y-2 max-h-[460px] overflow-auto">{orders.length===0&&<p className="text-sm text-black/50">No orders yet.</p>}{orders.map(o=>(
          <div key={o.id} className="border rounded-2xl p-3 text-sm">
            <div className="flex justify-between"><b>{o.id}</b><span className="font-bold text-[#009B3A]">${o.total?.toFixed(2)}</span></div>
            <div className="text-black/55 text-xs">{o.customer?.name} • {o.customer?.phone} • {o.items?.length} items • {o.status}</div>
            <div className="flex gap-2 items-center mt-2 text-xs">
              <span className={`px-2 py-1 rounded-full font-bold ${o.payment_status==='paid'?'bg-green-100 text-green-800':'bg-amber-100 text-amber-800'}`}>{o.payment_method} / {o.payment_status}</span>
              {o.payment_status!=='paid' && <button onClick={()=>patchOrder(o.id,{payment_status:'paid'}).then(refresh)} className="border px-2 py-1 rounded-full">Mark paid</button>}
              <select value={o.status} onChange={e=>patchOrder(o.id,{status:e.target.value}).then(refresh)} className="border rounded-full px-2 py-1 text-xs">
                {['Received - Kingston Free Zone','Picking','Customs Cleared','Out for Delivery','Delivered'].map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
          </div>))}</div></div>
        <div className="space-y-5">
          <div className="bg-white border rounded-3xl p-5"><div className="font-bold mb-3">Payments log</div><div className="space-y-2 max-h-[220px] overflow-auto text-sm">{payments.length===0&&<p className="text-black/50 text-sm">No payments yet.</p>}{payments.map(p=><div key={p.id} className="border rounded-xl p-2 text-xs flex justify-between"><span><b>{p.order_id}</b> • {p.method} • {p.status}</span><b>${p.amount}</b></div>)}</div></div>
          <div className="bg-white border rounded-3xl p-5"><div className="font-bold mb-3">Import quotes</div><div className="space-y-2 max-h-[180px] overflow-auto">{quotes.map((q,i)=><div key={i} className="border rounded-xl p-2 text-xs flex justify-between"><span><b>{q.id}</b> • CIF ${q.cif} • {q.origin}</span><b>${q.total?.toLocaleString()}</b></div>)}</div></div>
          <div className="bg-white border rounded-3xl p-5"><div className="font-bold mb-3">Contact leads</div><div className="space-y-2 max-h-[180px] overflow-auto text-xs">{contacts.length===0&&<p className="text-black/50">No leads.</p>}{contacts.map(c=><div key={c.id} className="border rounded-xl p-2"><b>{c.name}</b> • {c.topic} • {c.phone}<div className="text-black/60">{c.msg}</div></div>)}</div></div>
        </div>
      </div>
    </div>
  );
}
