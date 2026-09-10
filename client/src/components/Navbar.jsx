import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, Phone, Menu, X, Search, Container, Car, Package, Warehouse } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../lib/store';

const links = [
  { to:'/parts', label:'Auto Parts', icon:Package },
  { to:'/cars', label:'Car Sales', icon:Car },
  { to:'/imports', label:'Imports', icon:Container },
  { to:'/logistics', label:'Logistics', icon:Container },
  { to:'/warehouse', label:'Warehouse', icon:Warehouse },
  { to:'/track', label:'Track' },
  { to:'/contact', label:'Contact' },
];

export default function Navbar(){
  const {count} = useStore();
  const [open,setOpen]=useState(false);
  const [q,setQ]=useState('');
  const nav = useNavigate();
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[#0A1931] text-white text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-2">
          <p className="truncate">🇯🇲 Kingston Free Zone • 44 Caracas Ave • Mon–Fri 10am–4pm</p>
          <a href="tel:+18767589163" className="flex items-center gap-1 font-semibold text-[#FED100]"><Phone size={14}/> 876-758-9163</a>
        </div>
      </div>
      <nav className="bg-white/95 backdrop-blur border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#0A1931] grid place-items-center font-display font-800 text-[#FED100] text-xl font-extrabold">A</div>
            <div className="leading-tight">
              <div className="font-display font-extrabold text-lg">ALROBE <span className="text-[#009B3A]">INTL</span></div>
              <div className="text-[11px] tracking-widest text-black/60">PARTS • CARS • LOGISTICS</div>
            </div>
          </Link>
          <form onSubmit={e=>{e.preventDefault(); nav(`/parts?q=${q}`)}} className="hidden md:flex flex-1 max-w-md mx-4 items-center bg-[#FFF8EC] border rounded-full px-3 py-2">
            <Search size={16} className="text-black/50"/>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search Febi, Bosch, tyres, Hilux..." className="bg-transparent outline-none px-2 w-full text-sm"/>
          </form>
          <div className="hidden lg:flex items-center gap-1 flex-1">
            {links.slice(0,5).map(l=><NavLink key={l.to} to={l.to} className={({isActive})=>`px-3 py-2 rounded-full text-sm font-semibold ${isActive?'bg-[#0A1931] text-white':'hover:bg-black/5'}`}>{l.label}</NavLink>)}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Link to="/track" className="hidden sm:block text-sm font-semibold px-3 py-2 hover:underline">Track</Link>
            <Link to="/admin" className="hidden sm:block text-sm font-semibold px-3 py-2 hover:underline">Admin</Link>
            <Link to="/cart" className="relative bg-[#009B3A] text-white p-2.5 rounded-full hover:bg-[#0A1931]">
              <ShoppingCart size={18}/>{count>0&&<span className="absolute -top-1 -right-1 bg-[#FF6B35] text-white text-[11px] w-5 h-5 grid place-items-center rounded-full font-bold">{count}</span>}
            </Link>
            <button onClick={()=>setOpen(!open)} className="lg:hidden p-2">{open?<X/>:<Menu/>}</button>
          </div>
        </div>
        {open&&<div className="lg:hidden px-4 pb-4 grid gap-1">{links.map(l=><NavLink key={l.to} to={l.to} onClick={()=>setOpen(false)} className="px-3 py-2.5 rounded-xl font-semibold bg-[#FFF8EC] border">{l.label}</NavLink>)}<NavLink to="/admin" onClick={()=>setOpen(false)} className="px-3 py-2.5 rounded-xl font-semibold bg-black text-white text-center">Admin Dashboard</NavLink></div>}
      </nav>
    </header>
  );
}
