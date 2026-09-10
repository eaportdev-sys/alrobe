import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Car, CheckCircle2, MapPin, Package, Phone, ShieldCheck, Ship } from 'lucide-react';

const branches = [
  {
    number: '01',
    label: 'Vehicle Sales',
    title: 'Find the right vehicle for the road ahead.',
    description: 'Shop duty-ready vehicles in stock or let our team source the right new or used model for you.',
    points: ['Inspected stock', 'New and used options', 'Test drives and delivery'],
    to: '/cars',
    action: 'Browse vehicles',
    icon: Car,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1000&q=85',
    className: 'bg-[#0A1931] text-white',
    accent: 'text-[#FED100]',
  },
  {
    number: '02',
    label: 'Parts Sales',
    title: 'Keep every vehicle moving.',
    description: 'Get dependable parts, tyres and service essentials with fitment support from people who know vehicles.',
    points: ['Febi and Bosch parts', 'Tyres and maintenance', 'VIN fitment support'],
    to: '/parts',
    action: 'Shop parts',
    icon: Package,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1000&q=85',
    className: 'bg-[#F2EBDD] text-[#0A1931]',
    accent: 'text-[#009B3A]',
  },
  {
    number: '03',
    label: 'Special-Purpose Imports',
    title: 'Source an older vehicle with a clear plan.',
    description: 'We help customers source vehicles typically 10–14+ years old, then coordinate freight, clearance and delivery.',
    points: ['Japan, UK and USA sourcing', 'Landed-cost estimate', 'Guidance on current eligibility'],
    to: '/imports',
    action: 'Start an import quote',
    icon: Ship,
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1000&q=85',
    className: 'bg-[#FF6B35] text-white',
    accent: 'text-[#0A1931]',
  },
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      <section className="bg-[#FFF8EC]">
        <div className="max-w-7xl mx-auto px-4 pt-10 pb-16 md:pt-16 md:pb-24 grid lg:grid-cols-[1.05fr_.95fr] gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-[.18em] text-[#009B3A]">
              <span className="w-2 h-2 rounded-full bg-[#FF6B35]" /> ALROBE INTERNATIONAL / JAMAICA
            </div>
            <h1 className="font-display font-extrabold text-5xl md:text-7xl leading-[.98] tracking-[-.05em] mt-5 max-w-3xl">
              One automotive partner.<br /><span className="text-[#FF6B35]">Three ways forward.</span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-black/65 mt-6 max-w-xl">
              Vehicles, parts and special-purpose imports, brought together by one team in Kingston. Choose the branch that fits your next move.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a href="#branches" className="bg-[#0A1931] text-white font-extrabold px-6 py-3.5 rounded-full flex items-center gap-2 hover:bg-[#009B3A] transition">Explore our branches <ArrowRight size={18} /></a>
              <Link to="/contact" className="bg-white border border-black/15 font-extrabold px-6 py-3.5 rounded-full hover:border-[#0A1931] transition">Talk to our team</Link>
            </div>
            <div className="grid grid-cols-3 gap-4 border-t border-black/10 mt-10 pt-6 max-w-xl">
              <div><div className="font-display font-extrabold text-2xl">03</div><div className="text-xs text-black/55 mt-1">focused branches</div></div>
              <div><div className="font-display font-extrabold text-2xl">10–14+</div><div className="text-xs text-black/55 mt-1">years import focus</div></div>
              <div><div className="font-display font-extrabold text-2xl">24h</div><div className="text-xs text-black/55 mt-1">quote response</div></div>
            </div>
          </div>
          <div className="relative min-h-[480px]">
            <img src="https://images.unsplash.com/photo-1535732820275-9ffd998cac22?w=1200&q=85" alt="Vehicle ready for sale" className="absolute inset-0 h-full w-full object-cover rounded-[2.5rem]" />
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-t from-[#0A1931]/85 via-transparent to-transparent" />
            <div className="absolute left-5 right-5 bottom-5 bg-white rounded-3xl p-5 shadow-2xl">
              <div className="flex items-center justify-between gap-4">
                <div><div className="text-xs font-extrabold tracking-[.15em] text-[#009B3A]">YOUR NEXT MOVE</div><div className="font-display font-extrabold text-xl mt-1">Start with what you need.</div></div>
                <div className="bg-[#FED100] text-[#0A1931] p-3 rounded-2xl"><ArrowRight /></div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4 text-xs font-bold">
                <span className="bg-[#FFF8EC] px-3 py-2 rounded-full">Buy a vehicle</span><span className="bg-[#FFF8EC] px-3 py-2 rounded-full">Find a part</span><span className="bg-[#FFF8EC] px-3 py-2 rounded-full">Import special purpose</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="branches" className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl">
            <div className="text-xs font-extrabold tracking-[.18em] text-[#FF6B35]">OUR THREE BRANCHES</div>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl leading-tight mt-3">One clear offer.<br /><span className="text-black/45">Three specialist teams.</span></h2>
            <p className="text-black/60 mt-4 text-lg">Whether you are buying, maintaining or sourcing a hard-to-find vehicle, there is a direct path to the right Alrobe team.</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-5 mt-10">
            {branches.map((branch) => {
              const Icon = branch.icon;
              return (
                <article key={branch.number} className={`${branch.className} rounded-[2rem] overflow-hidden flex flex-col`}>
                  <div className="relative h-52">
                    <img src={branch.image} alt={branch.label} className="h-full w-full object-cover mix-blend-luminosity opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute left-5 top-5 flex items-center gap-2 text-xs font-extrabold tracking-[.15em]"><span className={`p-2 rounded-xl bg-white ${branch.accent}`}><Icon size={17} /></span>{branch.number}</div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className={`text-xs font-extrabold tracking-[.16em] ${branch.accent}`}>{branch.label.toUpperCase()}</div>
                    <h3 className="font-display font-extrabold text-2xl leading-tight mt-3">{branch.title}</h3>
                    <p className="opacity-70 text-sm leading-relaxed mt-3">{branch.description}</p>
                    <div className="grid gap-2 mt-5 text-sm opacity-85">{branch.points.map(point => <div key={point} className="flex items-center gap-2"><CheckCircle2 size={15} className={branch.accent} />{point}</div>)}</div>
                    <Link to={branch.to} className="mt-7 self-start flex items-center gap-2 font-extrabold text-sm border-b border-current pb-1">{branch.action} <ArrowRight size={16} /></Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#0A1931] text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-[.8fr_1.2fr] gap-12 items-start">
          <div>
            <div className="text-xs font-extrabold tracking-[.18em] text-[#FED100]">THE ALROBE STANDARD</div>
            <h2 className="font-display font-extrabold text-4xl mt-3 leading-tight">Clear answers.<br />Practical support.</h2>
            <p className="text-white/60 mt-4 leading-relaxed">We make the vehicle journey easier to understand, from the first question to the final handover.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-[#FED100] text-[#0A1931] font-extrabold px-5 py-3 rounded-full mt-7">Speak with Alrobe <ArrowRight size={17} /></Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              ['01', 'Tell us what you need', 'A vehicle, a part or an import brief. Start with a conversation, not a complicated form.'],
              ['02', 'We source and prepare', 'Our Kingston team checks availability, fitment, landed cost and the next practical step.'],
              ['03', 'You move forward', 'Collect locally, arrange delivery or track your import with one point of contact.'],
              ['04', 'Support after sale', 'Parts guidance, service essentials and a team you can reach when you need us.'],
            ].map(([number, title, description]) => <div key={number} className="border border-white/15 rounded-3xl p-5"><div className="text-[#FF6B35] font-display font-extrabold">{number}</div><div className="font-bold mt-5">{title}</div><div className="text-white/55 text-sm leading-relaxed mt-2">{description}</div></div>)}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="rounded-[2rem] bg-[#FED100] p-7 md:p-10 grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div><div className="text-xs font-extrabold tracking-[.18em] text-[#0A1931]/60">READY WHEN YOU ARE</div><h2 className="font-display font-extrabold text-3xl md:text-4xl mt-2">Tell us which branch you are looking for.</h2><p className="text-[#0A1931]/65 mt-2">Visit us at Kingston Free Zone or contact the team directly.</p></div>
          <div className="flex flex-wrap gap-3"><a href="tel:+18767589163" className="bg-[#0A1931] text-white font-extrabold px-5 py-3 rounded-full flex items-center gap-2"><Phone size={17} /> 876-758-9163</a><Link to="/contact" className="bg-white text-[#0A1931] font-extrabold px-5 py-3 rounded-full">Contact us</Link></div>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-black/55 mt-6"><span className="flex items-center gap-2"><MapPin size={16} className="text-[#FF6B35]" /> 44 Caracas Avenue, Kingston Free Zone</span><span className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#009B3A]" /> One team across all three branches</span><span className="flex items-center gap-2"><BadgeCheck size={16} className="text-[#0A1931]" /> USD pricing</span></div>
      </section>
    </div>
  );
}
