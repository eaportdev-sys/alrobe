import { useState } from 'react';
import { sendContact } from '../lib/api';
export default function Contact(){
  const [f,setF]=useState({name:'',email:'',phone:'',topic:'Parts quote',msg:''});
  const [done,setDone]=useState(null);
  const set=(k,v)=>setF(s=>({...s,[k]:v}));
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-6">
      <div className="bg-[#0A1931] text-white rounded-3xl p-8">
        <h1 className="font-display font-extrabold text-3xl">Talk to <span className="text-[#FED100]">Kingston</span></h1>
        <p className="text-white/70 text-sm mt-2">Mon–Fri 10am–4pm • We reply within one business day.</p>
        <div className="mt-5 space-y-2 text-sm"><div><b>ALROBE INTL CORP LTD</b></div><div className="text-white/75">44 Caracas Avenue, Kingston Free Zone, Kingston 15, Jamaica</div><div className="text-[#FED100] font-bold">876-758-9163 / 876-418-6298 / 876-435-0448<br/>sales@alrobeintl.com</div></div>
        <div className="mt-6 bg-white/10 rounded-2xl p-4 text-xs text-white/70">References: Bosch, Febi Bilstein distribution across the Caribbean + Luxxan (Techking) tyres for the Jamaican market.</div>
      </div>
      <form onSubmit={e=>{e.preventDefault(); sendContact(f).then(r=>setDone(r.message));}} className="bg-white border rounded-3xl p-6 space-y-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <input required placeholder="Full name *" value={f.name} onChange={e=>set('name',e.target.value)} className="border rounded-xl px-3 py-2.5 text-sm outline-none"/>
          <input required placeholder="Email *" value={f.email} onChange={e=>set('email',e.target.value)} className="border rounded-xl px-3 py-2.5 text-sm outline-none"/>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <input placeholder="Phone / WhatsApp" value={f.phone} onChange={e=>set('phone',e.target.value)} className="border rounded-xl px-3 py-2.5 text-sm outline-none"/>
          <select value={f.topic} onChange={e=>set('topic',e.target.value)} className="border rounded-xl px-3 py-2.5 text-sm"><option>Parts quote</option><option>Car purchase</option><option>Import request</option><option>Warehouse space</option><option>Freight / transshipment</option></select>
        </div>
        <textarea required placeholder="Tell us part numbers, car model, pallet count..." rows={5} value={f.msg} onChange={e=>set('msg',e.target.value)} className="border rounded-xl px-3 py-2.5 text-sm w-full outline-none"/>
        <button className="w-full bg-[#009B3A] text-white font-extrabold py-3 rounded-full">Send request</button>
        {done&&<div className="bg-green-50 border border-green-200 text-green-800 text-sm rounded-xl p-3">{done}</div>}
      </form>
    </div>
  );
}
