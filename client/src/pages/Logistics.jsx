import { Link } from 'react-router-dom';
import { Ship, Plane, Truck, PackageCheck, Anchor, Route } from 'lucide-react';
export default function Logistics(){
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-display font-extrabold text-4xl">Transport <span className="text-[#0E4D64]">Logistics</span></h1>
      <p className="text-black/60 max-w-3xl mt-2">Transshipment is our craft — sea, air, road and inter-modal stitched into one reliable chain from sourcing to final-customer delivery. Project cargo? Heavy lifts with crane partners.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {[{i:Ship,t:'Sea Freight',d:'FCL/LCL + RoRo via Kingston, transshipment across Caribbean'},{i:Plane,t:'Air Freight',d:'Urgent parts & docs, bonded handling'},{i:Truck,t:'Overland & Last-mile',d:'Kingston → island-wide, GPS-tracked fleet'},{i:Anchor,t:'Project Logistics',d:'Industrial machines, heavy lifts, cranes'}].map(x=><div key={x.t} className="bg-white border rounded-3xl p-6 card-hover"><div className="bg-[#0A1931] text-[#FED100] w-fit p-3 rounded-2xl"><x.i/></div><div className="font-display font-bold text-lg mt-3">{x.t}</div><div className="text-sm text-black/60 mt-1">{x.d}</div></div>)}
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <img src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80" className="rounded-3xl h-72 w-full object-cover" alt="port"/>
        <div className="bg-[#0A1931] text-white rounded-3xl p-8">
          <div className="font-display font-bold text-2xl flex items-center gap-2"><Route/> Why Kingston?</div>
          <ul className="mt-3 space-y-2 text-sm text-white/80 list-disc pl-5"><li>On a major Western Caribbean shipping lane + Panama Canal access</li><li>World-class ports, SEZ tax-efficient logistics parks</li><li>Fibre-linked digital hub for tracking & docs</li><li>Own assets + vetted partners for surge capacity</li></ul>
          <div className="flex gap-3 mt-5"><Link to="/contact" className="bg-[#FED100] text-black font-extrabold px-5 py-2.5 rounded-full text-sm">Request freight quote</Link><Link to="/track" className="border border-white/30 px-5 py-2.5 rounded-full text-sm font-bold">Track cargo</Link></div>
        </div>
      </div>
      <div className="bg-white border rounded-3xl p-6 mt-6 flex items-center gap-4"><PackageCheck className="text-[#009B3A]" size={32}/><p className="text-sm text-black/70"><b>Customer-obsessed ops:</b> one-to-one supply planning, quick load/unload, sourcing + production + distribution under one roof — B2B and final-customer delivery.</p></div>
    </div>
  );
}
