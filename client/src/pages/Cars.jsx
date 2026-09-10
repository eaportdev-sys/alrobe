import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCars } from '../lib/api';
import { carToWhatsApp } from '../lib/whatsapp';
import { demoCars } from '../lib/demoData';
import { ArrowLeft, Fuel, Cog, Gauge, MapPin, BadgeCheck, MessageCircle } from 'lucide-react';

export function Cars(){
  const [cars,setCars]=useState(demoCars); const [cond,setCond]=useState('All'); const [q,setQ]=useState('');
  useEffect(()=>{ getCars().then(setCars).catch(()=>{}); },[]);
  const list = cars.filter(c=>(cond==='All'||c.condition===cond)&&(c.title.toLowerCase().includes(q.toLowerCase())));
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
       <h1 className="font-display font-extrabold text-4xl">Vehicle <span className="text-[#FF6B35]">Sales</span></h1>
       <p className="text-black/60">New and used vehicles, inspected and sourced for Jamaica. Shop what is ready or ask us to find your next vehicle.</p>
      <div className="flex flex-wrap gap-2 mt-4">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search Hilux, Prado, Vezel..." className="border rounded-full px-4 py-2 text-sm w-64 outline-none"/>
        {['All','New','Used'].map(c=><button key={c} onClick={()=>setCond(c)} className={`px-4 py-2 rounded-full text-sm font-bold ${cond===c?'bg-[#0A1931] text-white':'bg-white border'}`}>{c}</button>)}
        <Link to="/imports" className="ml-auto bg-[#FED100] px-5 py-2 rounded-full text-sm font-extrabold">Import your own →</Link>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {list.map(c=>(
          <Link key={c.id} to={`/cars/${c.id}`} className="card-hover bg-white rounded-3xl overflow-hidden border">
            <div className="relative"><img src={c.img} className="h-56 w-full object-cover" alt={c.title}/><span className="absolute top-3 left-3 bg-[#0A1931] text-[#FED100] text-xs font-extrabold px-3 py-1 rounded-full">{c.condition} • {c.origin}</span></div>
            <div className="p-5"><div className="font-display font-bold text-lg leading-tight">{c.title}</div>
            <div className="flex flex-wrap gap-3 text-xs text-black/60 mt-2"><span className="flex items-center gap-1"><Gauge size={13}/> {c.mileage.toLocaleString()} km</span><span className="flex items-center gap-1"><Fuel size={13}/> {c.fuel}</span><span className="flex items-center gap-1"><Cog size={13}/> {c.trans}</span></div>
            <div className="flex items-center justify-between mt-3"><span className="font-display font-extrabold text-2xl">${c.price.toLocaleString()}</span><span className="text-xs font-bold flex items-center gap-1 text-[#009B3A]"><MapPin size={13}/>{c.stock}</span></div></div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function CarDetail(){
  const {id}=useParams(); const [car,setCar]=useState(null);
  useEffect(()=>{ getCars().then(d=>setCar(d.find(x=>x.id===id))).catch(()=>{}); },[id]);
  if(!car) return <div className="p-10">Loading...</div>;
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link to="/cars" className="flex items-center gap-2 font-bold text-sm"><ArrowLeft size={16}/> Back to cars</Link>
      <div className="grid md:grid-cols-2 gap-8 mt-4">
        <img src={car.img} className="rounded-3xl w-full h-[380px] object-cover" alt={car.title}/>
        <div>
          <span className="bg-[#FED100] text-xs font-extrabold px-3 py-1 rounded-full">{car.badge} • {car.stock}</span>
          <h1 className="font-display font-extrabold text-3xl mt-2 leading-tight">{car.title}</h1>
          <div className="font-display font-extrabold text-4xl text-[#009B3A] mt-3">${car.price.toLocaleString()} <span className="text-sm font-body font-normal text-black/50">USD • duty options</span></div>
          <div className="grid grid-cols-2 gap-3 mt-5 text-sm">
            {[['Year',car.year],['Mileage',car.mileage.toLocaleString()+' km'],['Fuel',car.fuel],['Gearbox',car.trans],['Drive',car.drive],['Location',car.location]].map(([k,v])=><div key={k} className="bg-white border rounded-2xl p-3"><div className="text-xs text-black/50">{k}</div><div className="font-bold">{v}</div></div>)}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">{car.specs.map(s=><span key={s} className="text-xs font-bold bg-[#FFF8EC] border px-3 py-1.5 rounded-full flex items-center gap-1"><BadgeCheck size={13} className="text-[#009B3A]"/>{s}</span>)}</div>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link to="/imports" className="bg-[#0A1931] text-white font-bold px-6 py-3 rounded-full">Get import quote</Link>
            <a href={carToWhatsApp(car)} target="_blank" className="bg-[#25D366] text-white font-bold px-6 py-3 rounded-full flex items-center gap-2"><MessageCircle size={16}/> WhatsApp about this car</a>
            <Link to="/contact" className="border font-bold px-6 py-3 rounded-full">Book test drive</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
