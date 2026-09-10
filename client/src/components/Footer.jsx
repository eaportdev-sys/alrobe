import { Link } from 'react-router-dom';
export default function Footer(){
  return (
    <footer className="bg-[#0A1931] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <div className="font-display font-extrabold text-2xl">ALROBE <span className="text-[#FED100]">INTL</span></div>
           <p className="text-white/70 text-sm mt-2">One automotive partner at Kingston Free Zone, with three focused branches: vehicle sales, parts sales and special-purpose imports.</p>
          <div className="mt-3 text-sm text-[#FED100] font-semibold">USD pricing • Island-wide delivery</div>
        </div>
        <div>
           <h4 className="font-bold mb-3 text-[#FED100]">Branches</h4>
           <div className="grid gap-2 text-sm text-white/80"><Link to="/cars">Vehicle Sales</Link><Link to="/parts">Parts Sales</Link><Link to="/parts?cat=Tyres">Tyres and maintenance</Link><Link to="/imports">Special-Purpose Imports</Link></div>
        </div>
        <div>
           <h4 className="font-bold mb-3 text-[#FED100]">Support</h4>
           <div className="grid gap-2 text-sm text-white/80"><Link to="/track">Track Shipment</Link><Link to="/logistics">Freight and delivery</Link><Link to="/warehouse">Warehouse support</Link><Link to="/contact">Get a Quote</Link></div>
        </div>
        <div>
          <h4 className="font-bold mb-3 text-[#FED100]">Contact</h4>
          <p className="text-sm text-white/80">44 Caracas Avenue, Kingston Free Zone<br/>Kingston 15, Jamaica<br/>876-758-9163 / 876-418-6298<br/>sales@alrobeintl.com</p>
          <Link to="/contact" className="inline-block mt-3 bg-[#FED100] text-black font-bold px-4 py-2 rounded-full text-sm">Request Callback</Link>
        </div>
      </div>
       <div className="border-t border-white/10 text-center text-xs text-white/60 py-4">© 2026 Alrobe International Corp Ltd • Vehicles • Parts • Special Imports</div>
    </footer>
  );
}
