export default function GarrisonIntel({ postsToday, prayersToday, prayerRequests, testimonies }: { postsToday: number; prayersToday: number; prayerRequests: number; testimonies?: number }) {
  return (
    <aside className="garrison-rail overflow-hidden text-[#211f1a] xl:sticky xl:top-5">
      <section className="garrison-module garrison-paper border-b border-[#524d42]">
        <div className="garrison-module-header px-4 py-3 mono text-[10px]">FIELD STATUS <span className="ml-2 text-[#b69a5a]">A STRONGER BODY</span></div>
        <div className="grid grid-cols-2 border-b border-[#8d826d]/25">
          <div className="border-r border-[#8d826d]/25 p-5"><p className="display text-3xl">{postsToday}</p><p className="mono mt-1 text-[9px] text-[#6e685d]">POSTS TODAY</p></div>
          <div className="p-5"><p className="display text-3xl">{prayersToday}</p><p className="mono mt-1 text-[9px] text-[#6e685d]">PRAYERS TODAY</p></div>
          {testimonies !== undefined && <div className="col-span-2 border-t border-[#8d826d]/25 p-5"><p className="display text-3xl">{testimonies}</p><p className="mono mt-1 text-[9px] text-[#6e685d]">TESTIMONIES</p></div>}
        </div>
      </section>

      <section className="garrison-module garrison-paper border-b border-[#524d42]">
        <div className="garrison-module-header px-4 py-3 mono text-[10px]">PRAYER WATCH</div>
        <div className="p-5"><p className="serif text-lg leading-relaxed">{prayerRequests} {prayerRequests === 1 ? 'request' : 'requests'} from the Garrison.</p><a href="/community?type=PRAYER" className="mono mt-5 inline-block text-[9px] text-[#82231f]">VIEW PRAYER WATCH →</a></div>
      </section>

      <section className="garrison-module garrison-paper border-b border-[#524d42]">
        <div className="garrison-module-header px-4 py-3 mono text-[10px]">VERSE OF THE DAY</div>
        <div className="p-5"><p className="serif text-[18px] italic leading-[1.65]">“Submit yourselves therefore to God. Resist the devil, and he will flee from you.”</p><div className="mt-5 flex items-center gap-3"><span className="h-px flex-1 bg-[#8d826d]/45"/><span className="text-[#82231f]">✝</span><span className="h-px flex-1 bg-[#8d826d]/45"/></div><p className="mono mt-4 text-center text-[9px] text-[#82231f]">JAMES 4:7</p></div>
      </section>

      <section className="garrison-module garrison-paper">
        <div className="garrison-module-header px-4 py-3 mono text-[10px]">OUR RULES <span className="ml-2 text-[#b69a5a]">A HOLY ENVIRONMENT</span></div>
        <div className="space-y-3 p-5 text-sm"><p><b>01</b> Keep Christ at the center.</p><p><b>02</b> People are not the enemy.</p><p><b>03</b> Correct with humility.</p><a href="/community/rules" className="mono block pt-2 text-[9px] text-[#82231f]">READ ALL RULES →</a></div>
      </section>
    </aside>
  );
}
