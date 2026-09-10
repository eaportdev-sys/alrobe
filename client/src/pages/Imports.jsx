import { useState } from 'react';
import { importQuote } from '../lib/api';
import { Calculator, Ship, FileCheck, Timer } from 'lucide-react';

export default function Imports(){
  const [form,setForm]=useState({cif:20000, engineCC:1500, age:10, condition:'Used', origin:'Japan'});
  const [res,setRes]=useState(null);
  const set = (k,v)=>setForm(f=>({...f,[k]:v}));
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
       <h1 className="font-display font-extrabold text-4xl">Special-Purpose <span className="text-[#0E4D64]">Imports</span></h1>
       <p className="text-black/60 max-w-2xl">We source vehicles typically 10–14+ years old from Japan, the UK and the USA, then coordinate freight, Kingston clearance, duty and delivery. Confirm eligibility before purchase; your final quote comes from our broker within 24h.</p>
      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-3xl border p-6">
          <div className="font-display font-bold text-lg flex items-center gap-2"><Calculator size={18}/> Duty & landed-cost estimator</div>
          <div className="grid sm:grid-cols-2 gap-4 mt-4 text-sm">
            <label>CIF value (USD)<input type="number" value={form.cif} onChange={e=>set('cif',+e.target.value)} className="mt-1 w-full border rounded-xl px-3 py-2"/></label>
            <label>Engine CC<input type="number" value={form.engineCC} onChange={e=>set('engineCC',+e.target.value)} className="mt-1 w-full border rounded-xl px-3 py-2"/></label>
             <label>Vehicle age (yrs)<input type="number" min="10" value={form.age} onChange={e=>set('age',Math.max(10,+e.target.value))} className="mt-1 w-full border rounded-xl px-3 py-2"/><span className="text-xs text-black/50">This branch focuses on 10–14+ year vehicles.</span></label>
            <label>Origin<select value={form.origin} onChange={e=>set('origin',e.target.value)} className="mt-1 w-full border rounded-xl px-3 py-2"><option>Japan</option><option>UK</option><option>USA</option><option>Singapore</option></select></label>
          </div>
          <div className="flex gap-2 mt-4">{['New','Used'].map(c=><button key={c} onClick={()=>set('condition',c)} className={`px-4 py-2 rounded-full text-sm font-bold ${form.condition===c?'bg-[#0A1931] text-white':'border'}`}>{c}</button>)}</div>
          <button onClick={()=>importQuote(form).then(setRes)} className="mt-5 w-full bg-[#FF6B35] text-white font-extrabold py-3 rounded-full">Calculate landed cost</button>
          {res&&<div className="mt-5 bg-[#FFF8EC] border rounded-2xl p-4 text-sm space-y-1"><div className="font-bold">Quote {res.id} • ETA {res.eta}</div><div className="flex justify-between"><span>Import duty</span><b>${res.duty.toLocaleString()}</b></div><div className="flex justify-between"><span>GCT (15%)</span><b>${res.gct.toLocaleString()}</b></div><div className="flex justify-between"><span>Broker + handling</span><b>${(res.broker+res.handling).toLocaleString()}</b></div><div className="flex justify-between font-display font-extrabold text-lg pt-2 border-t"><span>Total landed</span><span className="text-[#009B3A]">${res.total.toLocaleString()}</span></div></div>}
        </div>
        <div className="space-y-4">
          {[
            {icon:Ship,t:'1. Source & bid',d:'Tell us budget + model. We bid at USS, Copart, BCA auctions with translated inspection sheets.'},
            {icon:FileCheck,t:'2. Freight + clearance',d:'RoRo or container via Kingston Port. Our Free Zone team clears customs in 24–48h.'},
            {icon:Timer,t:'3. Compliant & delivered',d:'Duty, GCT, fitness + registration support. Island-wide delivery or Free Zone pickup.'},
          ].map(s=><div key={s.t} className="bg-[#0A1931] text-white rounded-3xl p-6 flex gap-4"><div className="bg-[#FED100] text-black p-3 rounded-2xl h-fit"><s.icon/></div><div><div className="font-display font-bold text-lg">{s.t}</div><div className="text-white/70 text-sm mt-1">{s.d}</div></div></div>)}
          <div className="bg-[#FED100] rounded-3xl p-6 font-bold text-sm">Popular right now: Hilux • Prado • Vezel • Note e-Power • Swift Hybrid — pre-order to lock vessel space.</div>
        </div>
      </div>
    </div>
  );
}
