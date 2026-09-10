import { Link } from 'react-router-dom';
import { Boxes, Tags, PackageCheck, MonitorCheck, LayoutGrid, Wrench } from 'lucide-react';
export default function Warehouse(){
  const services = [
    {i:Boxes,t:'Order picking',d:'Piece / case pick, co-pack, blister, film wrap, import-compliant repack'},
    {i:Tags,t:'Labeling',d:'Price, special & relabeling to country stipulations'},
    {i:PackageCheck,t:'Packaging',d:'Samples, sales sets, transport-ready packs'},
    {i:MonitorCheck,t:'Quality checks',d:'Function tests, stress tests, sampling plans'},
    {i:LayoutGrid,t:'Display builds',d:'POS design, stocking & dismantling'},
    {i:Wrench,t:'Pre-assembly',d:'Build-on-demand, kitting, campaign inserts'},
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-display font-extrabold text-4xl">Warehouse <span className="text-[#009B3A]">Logistics Centre</span></h1>
      <p className="text-black/60 max-w-3xl mt-2">The interface between production and retail — metres of racking, forklifts, and value-added services that let you focus on selling.</p>
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {[['60,000','sq ft covered, bonded'],['40,000','sq ft open yard'],['+14,000','sq ft on request']].map(([n,d])=><div key={n} className="bg-[#0A1931] text-white rounded-3xl p-6 text-center"><div className="font-display font-extrabold text-4xl text-[#FED100]">{n}</div><div className="text-white/70 text-sm">{d}</div></div>)}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">{services.map(s=><div key={s.t} className="bg-white border rounded-3xl p-6 card-hover"><div className="bg-[#009B3A] text-white w-fit p-3 rounded-2xl"><s.i/></div><div className="font-bold text-lg mt-3">{s.t}</div><div className="text-sm text-black/60">{s.d}</div></div>)}</div>
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <img src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80" className="rounded-3xl h-72 w-full object-cover" alt="warehouse"/>
        <div className="bg-gradient-to-br from-[#009B3A] to-[#0E4D64] text-white rounded-3xl p-8"><div className="font-display font-extrabold text-2xl">Need a dedicated bay for Bosch, Febi or Luxxan stock?</div><p className="text-white/80 text-sm mt-2">Multi-user or dedicated-user sites, production & returns logistics included.</p><div className="flex gap-3 mt-5"><Link to="/contact" className="bg-white text-black font-extrabold px-5 py-2.5 rounded-full text-sm">Book a tour</Link><span className="text-sm font-bold self-center">44 Caracas Ave, Kingston 15</span></div></div>
      </div>
    </div>
  );
}
