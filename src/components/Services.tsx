import type { ComponentType } from "react";
import { CATEGORIES, formatCLP, PHONE_WA } from "../data";
import { Chair, Comb, Mustache, Razor, Scissors, Spray } from "./icons";
import { Reveal, SectionHead } from "./Chrome";

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  clasicos: Scissors,
  barba: Razor,
  extras: Comb,
  packs: Chair,
};

export function Services() {
  return (
    <section id="pizarra" className="checkerline relative py-16 sm:py-20 lg:py-28 xl:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          kicker="La pizarra de precios"
          title={
            <>
              Lo que hacemos, <span className="text-blood">al peso</span>
            </>
          }
          note="Todos los servicios incluyen lavado, peinado final y café de la casa. Efectivo, tarjeta o transferencia."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {CATEGORIES.map((cat, ci) => {
            const Icon = ICONS[cat.id] ?? Scissors;
            return (
              <Reveal key={cat.id} delay={ci * 90}>
                <div className="group/cat h-full border border-fern/60 bg-pine/80 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brass/60 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] sm:p-8">
                  <div className="mb-6 flex items-center gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center border border-brass/50 text-brass transition-colors duration-300 group-hover/cat:bg-brass group-hover/cat:text-ink">
                      <Icon className="w-6" />
                    </span>
                    <div>
                      <h3 className="font-display text-2xl tracking-wide text-flour uppercase">
                        {cat.titulo}
                      </h3>
                      <p className="mt-0.5 font-mono text-[11px] tracking-[0.16em] text-sage uppercase">
                        {cat.nota}
                      </p>
                    </div>
                  </div>

                  <ul>
                    {cat.services.map((s) => (
                      <li key={s.id}>
                        <div className="group -mx-3 flex items-baseline px-3 py-3 transition-colors duration-200 hover:bg-bone">
                          <div className="min-w-0">
                            <p className="flex items-center gap-2 font-semibold text-flour transition-colors duration-200 group-hover:text-ink">
                              <span className="truncate">{s.nombre}</span>
                              {s.hot && (
                                <span className="shrink-0 border border-blood/70 px-1.5 py-px font-mono text-[9px] font-bold tracking-[0.14em] text-blood uppercase transition-colors duration-200 group-hover:bg-blood group-hover:text-flour">
                                  ★ top
                                </span>
                              )}
                            </p>
                            <p className="mt-0.5 text-[13px] text-sage transition-colors duration-200 group-hover:text-ink/60">
                              {s.desc}
                            </p>
                          </div>
                          <span className="leader" />
                          <div className="shrink-0 text-right">
                            <p className="font-display text-xl text-flour transition-colors duration-200 group-hover:text-blood">
                              {formatCLP(s.precio)}
                            </p>
                            <p className="font-mono text-[10px] tracking-[0.14em] text-sage uppercase group-hover:text-ink/55">
                              {s.dur} min
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-col items-start justify-between gap-6 border border-dashed border-brass/40 bg-moss/40 px-7 py-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <Mustache className="w-10 shrink-0 text-brass" />
              <p className="text-sm leading-relaxed text-bone/85">
                ¿No sabes cuál elegir? Cuéntale al barbero qué necesitas y{" "}
                <strong className="text-flour">él te arma el combo a medida</strong>.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <a
                href={`https://wa.me/${PHONE_WA}?text=${encodeURIComponent("Hola, quiero consultar por un servicio 🙌")}`}
                target="_blank"
                rel="noreferrer"
                className="border border-brass/70 px-5 py-2.5 font-mono text-xs font-bold tracking-[0.16em] text-brass uppercase transition-all hover:bg-brass hover:text-ink"
              >
                Preguntar por WhatsApp
              </a>
              <a
                href="#agenda"
                className="flex items-center gap-2 bg-blood px-5 py-2.5 font-mono text-xs font-bold tracking-[0.16em] text-flour uppercase transition-all hover:-translate-y-0.5"
              >
                <Spray className="w-4" /> Agendar ya
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
