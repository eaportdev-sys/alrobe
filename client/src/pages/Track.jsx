import { useState } from 'react';
import { track } from '../lib/api';
export default function Track(){
  const [id,setId]=useState('ALR-123456'); const [res,setRes]=useState(null);
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="font-display font-extrabold text-4xl text-center">Track <span className="text-[#009B3A]">shipment</span></h1>
      <p className="text-center text-black/60 text-sm">Order ID, quote ID or bill of lading — live from Kingston Free Zone.</p>
      <form onSubmit={e=>{e.preventDefault(); track(id).then(setRes);}} className="flex gap-2 mt-5"><input value={id} onChange={e=>setId(e.target.value)} className="flex-1 border rounded-full px-4 py-3 text-sm outline-none"/><button className="bg-[#0A1931] text-white px-6 rounded-full font-bold text-sm">Track</button></form>
      {res&&<div className="bg-white border rounded-3xl p-6 mt-5"><div className="flex justify-between items-center"><div className="font-display font-extrabold text-lg">{res.id}</div><span className="text-xs font-bold bg-green-100 text-green-800 px-3 py-1 rounded-full">{res.progress}%</span></div><div className="text-sm text-black/60">{res.status} • {res.location}</div><div className="h-2 bg-black/10 rounded-full mt-3"><div className="h-2 bg-[#009B3A] rounded-full" style={{width:res.progress+'%'}}/></div><div className="mt-4 space-y-2">{res.stages.map((s,i)=><div key={s} className={`text-sm flex gap-2 items-center ${i/res.stages.length*100<res.progress?'font-bold':'text-black/40'}`}><span className={`w-6 h-6 rounded-full grid place-items-center text-xs ${i/res.stages.length*100<res.progress?'bg-[#009B3A] text-white':'bg-black/10'}`}>{i+1}</span>{s}</div>)}</div></div>}
    </div>
  );
}
