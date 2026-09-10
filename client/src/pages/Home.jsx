import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Warehouse, Car, Package, Star, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getParts, getCars } from '../lib/api';
import { demoParts, demoCars } from '../lib/demoData';
import { useStore } from '../lib/store';

export default function Home(){
  const [parts,setParts]=useState(demoParts); const [cars,setCars]=useState(demoCars);
  const {add}=useStore();
  useEffect(()=>{ getParts().then(d=>setParts(d.slice(0,4))).catch(()=>{}); getCars().then(d=>setCars(d.slice(0,3))).catch(()=>{}); },[]);
  return (
    <div>
      {/* HERO */}
      <section className="hero-pattern bg-[#0A1931] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-bold tracking-widest"><span className="w-2 h-2 rounded-full bg-[#009B3A] animate-pulse"/> KINGSTON FREE ZONE • CARIBBEAN HUB</div>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl leading-[1.02] mt-4">Parts. Cars.<br/><span className="text-[#FED100]">Warehouse</span> &<br/>Logistics — <span className="text-[#FF6B35]">One Island Partner.</span></h1>
            <p className="text-white/75 mt-4 max-w-lg">Febi & Bosch parts, Luxxan tyres, new & used imports, 60k sq ft bonded storage and transshipment from the Port of Kingston to the whole Caribbean.</p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link to="/parts" className="bg-[#FED100] text-black font-extrabold px-6 py-3 rounded-full flex items-center gap-2">Shop Parts <ArrowRight size={18}/></Link>
              <Link to="/cars" className="bg-white text-black font-extrabold px-6 py-3 rounded-full">Browse Cars</Link>
              <Link to="/imports" className="border border-white/30 px-6 py-3 rounded-full font-bold">Import Calculator</Link>
            </div>
            <div className="flex gap-6 mt-8 text-sm">
              <div><div className="font-display font-extrabold text-2xl text-[#FED100]">60k</div><div className="text-white/60">sq ft covered</div></div>
              <div><div className="font-display font-extrabold text-2xl text-[#FED100]">40k</div><div className="text-white/60">sq ft open yard</div></div>
              <div><div className="font-display font-extrabold text-2xl text-[#FED100]">25+</div><div className="text-white/60">islands served</div></div>
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=900&q=80" alt="Port of Kingston" className="rounded-3xl border-4 border-[#FED100] shadow-2xl h-[420px] object-cover w-full"/>
            <div className="absolute -bottom-5 -left-3 md:-left-6 bg-white text-black rounded-2xl p-4 shadow-xl flex items-center gap-3 max-w-[320px]">
              <div className="bg-[#009B3A] text-white p-2.5 rounded-xl"><ShieldCheck/></div>
              <div><div className="font-bold text-sm">Bonded & Insured</div><div className="text-xs text-black/60">Customs-cleared in 24–48h at Kingston Port</div></div>
            </div>
            <div className="absolute top-4 right-4 bg-[#0A1931]/90 backdrop-blur px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2"><MapPin size={15} className="text-[#FF6B35]"/> 17.96° N, 76.79° W</div>
          </div>
        </div>
        <div className="bg-[#FED100] text-black overflow-hidden py-2 font-display font-bold text-sm tracking-widest"><div className="whitespace-nowrap animate-pulse text-center">FEBI BILSTEIN • BOSCH • LUXXAN TYRES • TRANS-SHIPMENT • BONDED WAREHOUSING • NEW & USED IMPORTS •</div></div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {t:'Auto Parts',d:'Thousands of Febi SKUs',to:'/parts',icon:Package,c:'bg-[#009B3A]'},
          {t:'Car Sales',d:'New & used, duty-ready',to:'/cars',icon:Car,c:'bg-[#FF6B35]'},
          {t:'Warehouse',d:'Pick, pack, label, co-pack',to:'/warehouse',icon:Warehouse,c:'bg-[#0E4D64]'},
          {t:'Logistics',d:'Sea • Air • Land • Last-mile',to:'/logistics',icon:Truck,c:'bg-[#0A1931]'},
        ].map(x=>(
          <Link key={x.t} to={x.to} className="card-hover bg-white rounded-3xl p-6 border flex gap-4 items-center">
            <div className={`${x.c} text-white p-3 rounded-2xl`}><x.icon/></div>
            <div><div className="font-display font-extrabold text-lg">{x.t}</div><div className="text-sm text-black/60">{x.d}</div></div>
          </Link>
        ))}
      </section>

      {/* PARTS */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between"><h2 className="font-display font-extrabold text-3xl">This week’s parts deals</h2><Link to="/parts" className="font-bold text-[#009B3A] flex items-center gap-1">View all <ArrowRight size={16}/></Link></div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          {parts.map(p=>(
            <div key={p.id} className="card-hover bg-white rounded-3xl overflow-hidden border">
              <div className="relative"><img src={p.img} className="h-44 w-full object-cover" alt={p.name}/>{p.badge&&<span className="absolute top-3 left-3 bg-[#FED100] text-xs font-extrabold px-3 py-1 rounded-full">{p.badge}</span>}</div>
              <div className="p-4"><div className="text-[11px] font-bold tracking-widest text-[#009B3A]">{p.brand} • {p.id}</div><div className="font-bold leading-tight mt-1">{p.name}</div>
              <div className="text-xs text-black/55 mt-1">{p.fitment}</div>
              <div className="flex items-center gap-1 text-sm mt-2"><Star size={14} className="fill-[#FED100] text-[#FED100]"/>{p.rating} • {p.stock} in stock</div>
              <div className="flex items-center justify-between mt-3"><div className="font-display font-extrabold text-xl">${p.price}</div><button onClick={()=>add(p)} className="bg-[#0A1931] text-white text-sm font-bold px-4 py-2 rounded-full hover:bg-[#009B3A]">Add</button></div></div>
            </div>
          ))}
        </div>
      </section>

      {/* CARS */}
      <section className="max-w-7xl mx-auto px-4 mt-12">
        <div className="flex items-end justify-between"><h2 className="font-display font-extrabold text-3xl">Cars on the lot & on the water</h2><Link to="/cars" className="font-bold text-[#FF6B35] flex items-center gap-1">All cars <ArrowRight size={16}/></Link></div>
        <div className="grid md:grid-cols-3 gap-4 mt-5">
          {cars.map(c=>(
            <Link key={c.id} to={`/cars/${c.id}`} className="card-hover bg-[#0A1931] text-white rounded-3xl overflow-hidden">
              <img src={c.img} className="h-52 w-full object-cover" alt={c.title}/>
              <div className="p-5"><span className="text-[11px] font-extrabold tracking-widest bg-[#FED100] text-black px-3 py-1 rounded-full">{c.badge}</span>
              <div className="font-display font-bold text-lg mt-2 leading-tight">{c.title}</div>
              <div className="text-white/60 text-sm mt-1">{c.year} • {c.mileage.toLocaleString()} km • {c.fuel}</div>
              <div className="font-display font-extrabold text-2xl text-[#FED100] mt-2">${c.price.toLocaleString()}</div></div>
            </Link>
          ))}
        </div>
      </section>

      {/* WAREHOUSE BANNER */}
      <section className="max-w-7xl mx-auto px-4 mt-12">
        <div className="rounded-3xl overflow-hidden grid md:grid-cols-2 bg-gradient-to-r from-[#009B3A] to-[#0E4D64] text-white">
          <div className="p-8 md:p-12"><h3 className="font-display font-extrabold text-3xl">Need bonded space by the pallet — or by the acre?</h3><p className="text-white/80 mt-3">Order picking, blister & film wrap, labeling, display builds, pre-assembly. Focus on selling, we handle the shed.</p><div className="flex gap-3 mt-6"><Link to="/warehouse" className="bg-white text-black font-extrabold px-6 py-3 rounded-full">Warehouse tour</Link><Link to="/contact" className="border border-white/40 px-6 py-3 rounded-full font-bold">Get rate card</Link></div></div>
          <img src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80" className="h-64 md:h-auto object-cover" alt="warehouse"/>
        </div>
      </section>
    </div>
  );
}
