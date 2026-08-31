import { ADDRESS, HOURS, PHONE, PHONE_WA, TESTIMONIALS, getOpenState } from "../data";
import { useNow } from "../hooks";
import { ArrowRight, Chat, Clock, Pin, Star } from "./icons";
import { Reveal, SectionHead } from "./Chrome";

/* ---------------- la clientela ---------------- */
export function Testimonials() {
  return (
    <section id="clientela" className="relative py-16 sm:py-20 lg:py-28 xl:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          kicker="La clientela"
          title={
            <>
              Palabra de <span className="text-blood">silla</span>
            </>
          }
          note="4.9 de promedio en 312 reseñas de Google. Lo que sigue salió de la boca de los propios clientes."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              key={t.nombre}
              delay={i * 90}
              className={`${t.big ? "lg:col-span-2" : ""} ${i === 2 ? "lg:translate-y-8" : ""} ${
                i === 4 ? "lg:-translate-y-4" : ""
              }`}
            >
              <figure
                className={`group h-full border border-fern/60 bg-pine p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brass/60 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] sm:p-8 ${
                  t.big ? "relative overflow-hidden" : ""
                }`}
              >
                {t.big && (
                  <span
                    aria-hidden
                    className="font-display pointer-events-none absolute -top-8 -right-3 text-[11rem] leading-none text-outline opacity-60 select-none"
                  >
                    ”
                  </span>
                )}
                <div className="flex gap-1 text-brass">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star key={s} className="w-4" />
                  ))}
                </div>
                <blockquote
                  className={`mt-5 leading-relaxed text-bone/90 ${
                    t.big ? "text-xl leading-snug sm:text-2xl" : "text-[15px]"
                  }`}
                >
                  “{t.texto}”
                </blockquote>
                <figcaption className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-flour">{t.nombre}</p>
                    <p className="mt-0.5 font-mono text-[10px] tracking-[0.18em] text-sage uppercase">
                      {t.detalle}
                    </p>
                  </div>
                  <span className="border border-blood/60 px-2.5 py-1 font-mono text-[9px] font-bold tracking-[0.16em] text-blood uppercase">
                    {t.servicio}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}

          <Reveal delay={420} className="lg:translate-y-8">
            <div className="flex h-full flex-col items-start justify-center border border-dashed border-brass/50 bg-moss/30 p-8">
              <p className="font-display text-6xl text-brass">4.9</p>
              <div className="mt-2 flex gap-1 text-brass">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="w-4" />
                ))}
              </div>
              <p className="mt-4 font-mono text-xs leading-relaxed tracking-[0.14em] text-sage uppercase">
                312 reseñas en Google
                <br />
                98 % vuelve a agendar
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- visítanos ---------------- */
function MiniMap() {
  return (
    <svg viewBox="0 0 400 190" className="h-44 w-full border border-fern/50 bg-moss/60" aria-hidden>
      {/* calles */}
      <g stroke="#2b4a37" strokeWidth="10">
        <path d="M0 55 H400" />
        <path d="M0 140 H400" />
        <path d="M90 0 V190" />
        <path d="M250 0 V190" />
        <path d="M340 0 V190" />
      </g>
      <path d="M0 100 L400 88" stroke="#ede3cb" strokeOpacity="0.25" strokeWidth="14" />
      <g stroke="#2b4a37" strokeWidth="1">
        <path d="M0 55 H400" />
        <path d="M0 140 H400" />
      </g>
      {/* manzanas */}
      <g fill="#0d1712" opacity="0.5">
        <rect x="18" y="14" width="54" height="28" />
        <rect x="110" y="12" width="120" height="30" />
        <rect x="110" y="112" width="120" height="60" />
        <rect x="270" y="14" width="52" height="58" />
        <rect x="18" y="112" width="54" height="60" />
      </g>
      <text x="12" y="92" fill="#ede3cb" opacity="0.55" fontSize="10" fontFamily="Space Mono, monospace" letterSpacing="2">
        ARTURO PRAT
      </text>
      <text x="256" y="178" fill="#93a89a" opacity="0.6" fontSize="8" fontFamily="Space Mono, monospace" letterSpacing="1.5">
        DIEGO LILLO
      </text>
      {/* pin */}
      <circle cx="200" cy="94" r="16" fill="none" stroke="#ce3a28" strokeWidth="2" className="pin-pulse" />
      <path
        d="M200 78c-7 0-12.5 5.4-12.5 12.2 0 9 12.5 20.8 12.5 20.8s12.5-11.8 12.5-20.8C212.5 83.4 207 78 200 78z"
        fill="#ce3a28"
      />
      <circle cx="200" cy="90.5" r="4" fill="#f6efdc" />
    </svg>
  );
}

export function Visit() {
  const now = useNow(30000);
  const state = getOpenState(now);
  const todayIdx = now.getDay();

  return (
    <section id="visita" className="checkerline relative border-t border-fern/40 bg-pine py-16 sm:py-20 lg:py-28 xl:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          kicker="Visítanos"
          title={
            <>
              La silla te <span className="text-blood">espera</span>
            </>
          }
          note="Atención con hora agendada: en la barbería de Aldunate 363, La Calera, o a domicilio en tu casa. Agenda y te guardamos el puesto."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* horarios */}
          <Reveal>
            <div className="h-full border border-fern/60 bg-ink/60 p-5 sm:p-7 md:p-9">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3 sm:mb-7 sm:gap-4">
                <h3 className="font-display flex items-center gap-3 text-xl tracking-wide text-flour uppercase sm:text-2xl">
                  <Clock className="w-5 text-brass sm:w-6" /> Horarios
                </h3>
                <span
                  className={`flex items-center gap-2 border px-2.5 py-1 font-mono text-[9px] font-bold tracking-[0.16em] uppercase sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-[0.18em] ${
                    state.open ? "border-fern text-brass" : "border-blood/60 text-blood"
                  }`}
                >
                  <span className={`blink-dot h-2 w-2 rounded-full ${state.open ? "bg-brass" : "bg-blood"}`} />
                  {state.msg}
                </span>
              </div>
              <ul className="space-y-1">
                {HOURS.map((h) => {
                  const isToday = h.d === todayIdx;
                  return (
                    <li
                      key={h.d}
                      className={`flex items-center justify-between gap-4 border-b border-fern/30 py-2.5 font-mono text-xs sm:py-3 sm:text-sm transition-colors ${
                        isToday ? "bg-moss/60 px-3 text-flour" : "text-bone/75"
                      }`}
                    >
                      <span className="flex items-center gap-2 sm:gap-3 tracking-[0.12em] uppercase">
                        {isToday && <span className="blink-dot h-2 w-2 rounded-full bg-blood" />}
                        {h.label}
                        {isToday && (
                          <span className="bg-blood px-1.5 py-px text-[9px] font-bold tracking-[0.16em] text-flour">
                            HOY
                          </span>
                        )}
                      </span>
                      <span className={h.open ? (isToday ? "font-bold text-brass" : "") : "text-blood"}>
                        {h.open ? `${h.open} — ${h.close}` : "cerrado"}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-5 font-mono text-[10px] leading-relaxed tracking-[0.1em] text-sage uppercase sm:mt-6 sm:text-[11px]">
                * La última hora se agenda 45 min antes del cierre.
              </p>
            </div>
          </Reveal>

          {/* ubicación */}
          <Reveal delay={120}>
            <div className="flex h-full flex-col border border-fern/60 bg-ink/60 p-5 sm:p-7 md:p-9">
              <h3 className="font-display mb-4 flex items-center gap-3 text-xl tracking-wide text-flour uppercase sm:mb-5 sm:text-2xl">
                <Pin className="w-5 text-brass sm:w-6" /> Dónde estamos
              </h3>
              <MiniMap />
              <p className="mt-4 text-sm leading-relaxed text-bone/85 sm:mt-5">{ADDRESS}</p>
              <p className="mt-2 font-mono text-[10px] tracking-[0.12em] text-sage uppercase sm:text-[11px] sm:tracking-[0.14em]">
                Pleno centro de La Calera · ¿Te queda lejos? José va a tu casa a domicilio
              </p>
              <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row sm:flex-wrap sm:pt-7">
                <a
                  href={`tel:${PHONE.replace(/\s/g, "")}`}
                  className="flex items-center justify-center gap-2 border border-bone/30 px-4 py-3 font-mono text-xs font-bold tracking-[0.16em] text-bone uppercase transition-all hover:border-brass hover:text-brass"
                >
                  <Chat className="w-4" /> {PHONE}
                </a>
                <a
                  href={`https://wa.me/${PHONE_WA}?text=${encodeURIComponent("Hola, vengo del sitio web 👋")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-brass px-4 py-3 font-mono text-xs font-bold tracking-[0.16em] text-ink uppercase transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(216,162,60,0.3)]"
                >
                  <Chat className="w-4" /> WhatsApp
                </a>
                <a
                  href="https://maps.google.com/?q=Aldunate+363,+La+Calera,+Valpara%C3%ADso,+Chile"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-center gap-2 border border-bone/30 px-4 py-3 font-mono text-xs font-bold tracking-[0.16em] text-bone uppercase transition-all hover:border-blood hover:text-blood"
                >
                  Cómo llegar
                  <ArrowRight className="w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
