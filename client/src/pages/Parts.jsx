import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getParts, vinDecode } from '../lib/api';
import { useStore } from '../lib/store';
import { demoParts } from '../lib/demoData';
import { Search, Star, ScanSearch } from 'lucide-react';

export default function Parts(){
  const [params] = useSearchParams();
  const [parts,setParts]=useState(demoParts); const [q,setQ]=useState(params.get('q')||'');
  const [brand,setBrand]=useState('All'); const [cat,setCat]=useState(params.get('cat')||'All');
  const [vin,setVin]=useState(''); const [vinRes,setVinRes]=useState(null);
  const {add}=useStore();
  const load = () => getParts({q, brand, category:cat}).then(setParts).catch(()=>{});
  useEffect(()=>{ load(); },[]);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
       <h1 className="font-display font-extrabold text-4xl">Parts <span className="text-[#009B3A]">Sales</span></h1>
       <p className="text-black/60">Genuine Febi Bilstein, Bosch and Luxxan parts with fitment support, Kingston pickup or island delivery.</p>
      <div className="grid lg:grid-cols-[280px_1fr] gap-6 mt-6">
        <aside className="space-y-4">
          <div className="bg-white rounded-3xl border p-5">
            <div className="font-bold mb-2 flex items-center gap-2"><Search size={16}/> Search</div>
            <form onSubmit={e=>{e.preventDefault(); load();}} className="flex gap-2"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="brake pad, 04465..." className="w-full border rounded-full px-3 py-2 text-sm outline-none"/><button className="bg-[#0A1931] text-white px-4 rounded-full text-sm font-bold">Go</button></form>
            <div className="font-bold mt-4 mb-2 text-sm">Brand</div>
            <div className="flex flex-wrap gap-2">{['All','Febi Bilstein','Bosch','Luxxan'].map(b=><button key={b} onClick={()=>{setBrand(b);}} className={`px-3 py-1.5 rounded-full text-xs font-bold border ${brand===b?'bg-[#0A1931] text-white':'bg-[#FFF8EC]'}`}>{b}</button>)}</div>
            <div className="font-bold mt-4 mb-2 text-sm">Category</div>
            <div className="flex flex-wrap gap-2">{['All','Brakes','Engine','Suspension','Tyres','Lubricants','Electrical','Filters','Accessories'].map(c=><button key={c} onClick={()=>setCat(c)} className={`px-3 py-1.5 rounded-full text-xs font-bold border ${cat===c?'bg-[#009B3A] text-white':'bg-white'}`}>{c}</button>)}</div>
            <button onClick={load} className="mt-4 w-full bg-[#FED100] font-extrabold py-2.5 rounded-full">Apply filters</button>
          </div>
          <div className="bg-[#0A1931] text-white rounded-3xl p-5">
            <div className="font-display font-bold flex items-center gap-2"><ScanSearch size={18}/> VIN lookup</div>
            <p className="text-xs text-white/60 mt-1">Enter VIN, get exact fitment + recommended parts.</p>
            <div className="flex gap-2 mt-3"><input value={vin} onChange={e=>setVin(e.target.value)} placeholder="JTDBR32E..." className="w-full rounded-full px-3 py-2 text-sm text-black outline-none"/><button onClick={()=>vinDecode(vin).then(setVinRes).catch(()=>alert('VIN too short'))} className="bg-[#FED100] text-black px-4 rounded-full text-sm font-bold">Decode</button></div>
            {vinRes&&<div className="mt-3 text-sm bg-white/10 rounded-2xl p-3"><div className="font-bold">{vinRes.make} • {vinRes.year}</div><div className="text-white/70 text-xs">{vinRes.engine} — VIN {vinRes.vin}</div><div className="text-xs mt-1">Fits: {vinRes.recommended.join(', ')}</div></div>}
          </div>
        </aside>
        <div>
          <div className="text-sm text-black/60 mb-3">{parts.length} results • Free Zone pickup today</div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {parts.map(p=>(
              <div key={p.id} className="card-hover bg-white rounded-3xl border overflow-hidden">
                <img src={p.img} className="h-44 w-full object-cover" alt={p.name}/>
                <div className="p-4"><div className="text-[11px] font-extrabold tracking-widest text-[#009B3A]">{p.brand} • {p.id} • OEM {p.oem}</div>
                <div className="font-bold mt-1 leading-tight">{p.name}</div><div className="text-xs text-black/55">{p.fitment}</div>
                <div className="flex items-center gap-1 text-sm mt-1"><Star size={13} className="fill-[#FED100] text-[#FED100]"/>{p.rating} • {p.stock} pcs</div>
                <div className="flex items-center justify-between mt-3"><div><span className="font-display font-extrabold text-xl">${p.price}</span>{p.oldPrice&&<span className="text-xs line-through text-black/40 ml-2">${p.oldPrice}</span>}</div><button onClick={()=>add(p)} className="bg-[#0A1931] hover:bg-[#009B3A] text-white text-sm font-bold px-4 py-2 rounded-full">Add to cart</button></div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
