import { STATS } from "../data";
import { useCountUp, useReveal } from "../hooks";
import { Razor, Scissors, Towel } from "./icons";
import { Reveal, SectionHead } from "./Chrome";

function Stat({
  value,
  suffix,
  label,
  decimal,
  fixed,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  decimal?: boolean;
  fixed?: boolean;
  delay: number;
}) {
  const { ref, inView } = useReveal<HTMLDivElement>();
  const n = useCountUp(value, inView, 1600, decimal);
  return (
    <div ref={ref} className={`rv ${inView ? "is-in" : ""} border-l-2 border-blood/70 pl-5`} style={{ transitionDelay: `${delay}ms` }}>
      <p className="font-display text-4xl text-flour sm:text-5xl">
        {fixed ? value.toLocaleString("es-CL") : n}
        <span className="text-brass">{suffix}</span>
      </p>
      <p className="mt-1.5 font-mono text-[11px] tracking-[0.2em] text-sage uppercase">{label}</p>
    </div>
  );
}

const RULES = [
  {
    icon: Scissors,
    title: "La tijera manda",
    text: "Máquina para emparejar, tijera para decidir. Cada cabeza sale con un corte pensado, no con la misma plantilla de siempre.",
  },
  {
    icon: Razor,
    title: "Navaja con respeto",
    text: "Toalla caliente, aceite previo y pulso de relojero. El afeitado acá es un ritual, no un trámite.",
  },
  {
    icon: Towel,
    title: "Aquí no se apura a nadie",
    text: "Tu hora es tu hora. Café pasado, radio vieja y la conversación que tú quieras — o el silencio, también.",
  },
];

export function About() {
  return (
    <section id="casa" className="relative overflow-hidden py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          {/* composición fotográfica */}
          <Reveal className="relative">
            <div className="kenburns relative aspect-[4/5] overflow-hidden border border-fern/60 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
              <img
                src="https://image.qwenlm.ai/generated-images/e5d48b42-cc29-438f-bad2-2a63ee1028c8/_result.png"
                alt="Interior de la peluquería: sillones de cuero y luz cálida"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-5 font-mono text-[10px] tracking-[0.26em] text-bone/80 uppercase">
                El estudio · La Calera
              </p>
            </div>
            <figure className="absolute -right-4 -bottom-10 w-44 rotate-3 bg-flour p-2.5 pb-8 shadow-[0_20px_50px_rgba(0,0,0,0.55)] transition-transform duration-500 hover:rotate-0 sm:-right-8 sm:w-56">
              <img
                src="https://image.qwenlm.ai/generated-images/73246300-7af7-4033-871f-aa58398e159b/_result.png"
                alt="José Ahumada, el patrón"
                className="aspect-[4/5] w-full object-cover"
              />
              <figcaption className="mt-2 text-center font-mono text-[10px] tracking-[0.2em] text-ink/65 uppercase">
                El patrón, tijera en mano
              </figcaption>
            </figure>
            <span className="absolute -top-3 left-10 h-6 w-20 -rotate-6 bg-bone/25 backdrop-blur-[1px]" aria-hidden />
          </Reveal>

          {/* historia */}
          <div className="lg:pt-6">
            <SectionHead
              kicker="La casa"
              title={
                <>
                  Un estudio en la casa, <span className="text-blood">hecho a pulso</span>
                </>
              }
            />
            <div className="space-y-5 text-[15px] leading-relaxed text-bone/85">
              <p>
                En <strong className="font-semibold text-flour">2023</strong>, José Ahumada cumplió el
                sueño pendiente: montar su propio estudio en la casa, en{" "}
                <strong className="font-semibold text-flour">La Calera</strong>. Un sillón, su máquina
                de toda la vida y una convicción — cortar como en las peluquerías de antes, mirando a
                la cara al cliente y sin plantillas.
              </p>
              <p>
                Hoy la libreta se llena semana a semana, y cuando el cliente no puede llegar, el
                peluquero llega a él: <strong className="font-semibold text-flour">José atiende a
                domicilio</strong> por La Calera y alrededores. Cambia el lugar, no el trato: café
                pasado, toalla caliente y cero apuro.
              </p>
            </div>

            <ul className="mt-9 space-y-6">
              {RULES.map((r, i) => (
                <Reveal key={r.title} delay={i * 110}>
                  <li className="group flex gap-5">
                    <span className="grid h-12 w-12 shrink-0 place-items-center border border-fern text-brass transition-colors duration-300 group-hover:border-brass group-hover:bg-brass group-hover:text-ink">
                      <r.icon className="w-6" />
                    </span>
                    <div>
                      <p className="font-display text-lg tracking-wide text-flour uppercase">
                        <span className="mr-2 text-blood">{String(i + 1).padStart(2, "0")}</span>
                        {r.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-sage">{r.text}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>

            <p className="mt-10 font-mono text-sm text-brass italic">— José Ahumada, el patrón</p>
          </div>
        </div>

        {/* cifras de la casa */}
        <div className="mt-24 grid grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-8">
          {STATS.map((s, i) => (
            <Stat key={s.label} {...s} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- galería: el taller ---------------- */

const SHOTS = [
  { src: "https://image.qwenlm.ai/generated-images/e5d48b42-cc29-438f-bad2-2a63ee1028c8/_result.png", cap: "La sala, un sábado cualquiera", cls: "md:col-span-2 -rotate-1", w: "aspect-[16/9]" },
  { src: "https://image.qwenlm.ai/generated-images/729d21b7-78e4-48b2-8d71-435e4b58ca52/_result.png", cap: "Los fierros del oficio", cls: "rotate-2 md:translate-y-6", w: "aspect-[4/5]" },
  { src: "https://image.qwenlm.ai/generated-images/f4a44337-fd2b-4eff-9c42-66f9e4bd74d7/_result.png", cap: "Fade en plena faena", cls: "-rotate-2 md:-translate-y-2", w: "aspect-[4/5]" },
  { src: "https://image.qwenlm.ai/generated-images/c0a6850e-4335-4ad7-8641-70c9e2adf8ee/_result.png", cap: "Tónicos y pomadas de la repisa", cls: "rotate-1 md:translate-y-8", w: "aspect-[4/5]" },
  { src: "https://image.qwenlm.ai/generated-images/73246300-7af7-4033-871f-aa58398e159b/_result.png", cap: "El patrón en su elemento", cls: "-rotate-1 md:translate-y-2", w: "aspect-[4/5]" },
];

export function Gallery() {
  return (
    <section id="taller" className="checkerline relative border-y border-fern/40 bg-pine py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          kicker="El taller"
          title={
            <>
              Postales de <span className="text-blood">la peluquería</span>
            </>
          }
          note="Fotos sin filtro, como los cortes. Lo que ves es lo que hay: cuero, acero y harto cariño."
        />

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:gap-8">
          {SHOTS.map((s, i) => (
            <Reveal key={s.src + i} delay={i * 90} className={s.cls}>
              <figure className="group relative bg-flour p-3 pb-4 shadow-[0_18px_45px_rgba(0,0,0,0.45)] transition-all duration-500 hover:z-10 hover:scale-[1.03] hover:rotate-0 hover:shadow-[0_28px_70px_rgba(0,0,0,0.6)]">
                <span
                  className="absolute -top-2.5 left-1/2 z-10 h-5 w-16 -translate-x-1/2 -rotate-3 bg-bone/60 shadow-sm"
                  aria-hidden
                />
                <div className={`${s.w} overflow-hidden`}>
                  <img
                    src={s.src}
                    alt={s.cap}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <figcaption className="mt-3 text-center font-mono text-[10px] tracking-[0.22em] text-ink/65 uppercase">
                  {s.cap}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
