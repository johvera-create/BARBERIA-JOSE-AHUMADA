import { useState, type CSSProperties, type ReactNode } from "react";
import { useReveal, useScrolled } from "../hooks";
import { ADDRESS, EMAIL, HOURS, PHONE, PHONE_WA, WEIBOOK_URL } from "../data";
import { Diamond, Scissors, XMark } from "./icons";

/* ---------- grano de película sobre toda la página ---------- */
export function Noise() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.02]"
      style={{
        backgroundImage: "radial-gradient(#f6efdc 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    />
  );
}

/* ---------- revelado al hacer scroll ---------- */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`rv ${inView ? "is-in" : ""} ${className}`}
      style={{ "--rv-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

/* ---------- poste de barbero ---------- */
export function BarberPole({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col ${className}`} aria-hidden>
      <div className="h-3 rounded-t-full bg-gradient-to-b from-[#c9c2ae] to-[#8d8672]" />
      <div className="h-2 bg-[#5c564a]" />
      <div className="pole-stripes flex-1 border-x-2 border-[#5c564a]" />
      <div className="h-2 bg-[#5c564a]" />
      <div className="h-3 rounded-b-full bg-gradient-to-t from-[#c9c2ae] to-[#8d8672]" />
    </div>
  );
}

/* ---------- cinta transportadora de oficios ---------- */
export function Marquee({ items }: { items: string[] }) {
  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center">
      {items.map((it, i) => (
        <span key={i} className="flex items-center">
          <span className="font-display px-7 text-xl tracking-[0.08em] whitespace-nowrap text-bone/85 uppercase">
            {it}
          </span>
          <Diamond className="w-2.5 shrink-0 text-blood" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee overflow-hidden border-y border-fern/50 bg-pine py-3.5">
      <div className="marquee-track">{[row("a"), row("b")]}</div>
    </div>
  );
}

/* ---------- cabecera de sección ---------- */
export function SectionHead({
  kicker,
  title,
  note,
}: {
  kicker: string;
  title: ReactNode;
  note?: string;
}) {
  return (
    <Reveal className="mb-8 flex flex-col items-start justify-between gap-4 sm:mb-12 sm:flex-row sm:items-end sm:gap-6">
      <div>
        <p className="mb-2 flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-blood uppercase sm:mb-3 sm:gap-3 sm:text-xs sm:tracking-[0.28em]">
          <span className="h-px w-6 bg-blood sm:w-10" />
          {kicker}
        </p>
        <h2 className="font-display text-3xl leading-[0.98] tracking-wide text-flour uppercase sm:text-4xl md:text-5xl lg:text-6xl">
          {title}
        </h2>
      </div>
      {note && <p className="max-w-xs font-mono text-xs leading-relaxed text-sage">{note}</p>}
    </Reveal>
  );
}

const LINKS = [
  { href: "#pizarra", label: "Servicios" },
  { href: "#casa", label: "El Barbero" },
  { href: "#taller", label: "Galería" },
  { href: "#agenda", label: "Agendar" },
  { href: "#visita", label: "Contacto" },
];

export function Nav() {
  const scrolled = useScrolled(50);
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-fern/50 bg-ink/95 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-3" aria-label="Volver arriba">
          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-brass/80 bg-pine shadow-md transition-transform duration-300 group-hover:scale-105">
            <img src="/logo.jpg" alt="José Ahumada Logo" className="h-full w-full object-cover" />
          </span>
          <span className="leading-none">
            <span className="font-display block text-lg tracking-[0.06em] text-flour">JOSÉ AHUMADA</span>
            <span className="mt-1 block font-mono text-[10px] tracking-[0.3em] text-sage uppercase">
              Peluquero · Est. 2023
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative font-mono text-[13px] tracking-[0.14em] text-bone/80 uppercase transition-colors hover:text-flour"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-[2px] w-0 bg-blood transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href={WEIBOOK_URL}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 border-2 border-blood bg-blood px-5 py-2.5 font-mono text-[13px] font-bold tracking-[0.14em] text-flour uppercase transition-all duration-200 hover:bg-transparent hover:text-blood active:translate-y-0.5"
          >
            <Scissors className="w-4 transition-transform duration-300 group-hover:rotate-45" />
            Agendar hora ↗
          </a>
        </div>

        <button
          className="grid h-11 w-11 place-items-center border border-fern text-bone lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? (
            <XMark className="w-5" />
          ) : (
            <svg viewBox="0 0 24 24" className="w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h11" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="border-t border-fern/50 bg-ink px-5 pt-4 pb-8 lg:hidden">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display block border-b border-fern/30 py-3.5 text-2xl tracking-wide text-bone uppercase transition-colors hover:text-brass"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {l.label}
            </a>
          ))}
          <a
            href={WEIBOOK_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="mt-6 flex items-center justify-center gap-2 bg-blood py-4 font-mono text-sm font-bold tracking-[0.2em] text-flour uppercase"
          >
            <Scissors className="w-4" /> Agendar en Weibook ↗
          </a>
        </div>
      )}
    </nav>
  );
}

/* ---------- pie de página ---------- */
export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-fern/50 bg-[#0a120d]">
      <div className="mx-auto max-w-7xl px-5 pt-16 pb-8 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
          <div>
            <div className="flex items-center gap-4">
              <span className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-brass/80 bg-pine shadow-md">
                <img src="/logo.jpg" alt="José Ahumada Logo" className="h-full w-full object-cover" />
              </span>
              <div>
                <p className="font-display text-2xl tracking-[0.05em] text-flour">JOSÉ AHUMADA</p>
                <p className="mt-1 font-mono text-[10px] tracking-[0.3em] text-sage uppercase">
                  Peluquero · desde 2023
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-sage">
              Barbería con oficio de peluquería de antes: tijera clásica, degradé fino y buena
              conversación. Atención en Barbería (Aldunate 363), en su <strong>Authentic Studio</strong> particular y <strong>a domicilio</strong>.
            </p>
            <div className="mt-6 flex gap-5 font-mono text-xs tracking-[0.18em] uppercase">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-bone/70 transition-colors hover:text-brass">
                Instagram ↗
              </a>
              <a
                href={`https://wa.me/${PHONE_WA}?text=${encodeURIComponent("Hola José, vengo de tu sitio web 🙌")}`}
                target="_blank"
                rel="noreferrer"
                className="text-brass transition-colors hover:text-flour font-bold"
              >
                WhatsApp ↗
              </a>
            </div>
          </div>

          <div>
            <p className="mb-5 font-mono text-xs tracking-[0.28em] text-blood uppercase">Modalidades</p>
            <ul className="space-y-3 text-sm text-bone/80">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brass" /> Barbería Aldunate 363
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brass" /> Authentic Studio (Casa)
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brass" /> Servicio a Domicilio
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-5 font-mono text-xs tracking-[0.28em] text-blood uppercase">Horarios</p>
            <ul className="space-y-3 font-mono text-xs text-bone/80">
              <li className="flex justify-between gap-4">
                <span>Lun — Vie</span>
                <span className="text-flour">10:00 – 20:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Sábado</span>
                <span className="text-flour">09:00 – 18:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Domingo</span>
                <span className="text-blood">cerrado</span>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-5 font-mono text-xs tracking-[0.28em] text-blood uppercase">Contacto Directo</p>
            <p className="text-sm leading-relaxed text-bone/80">{ADDRESS}</p>
            <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="mt-3 block text-sm text-brass font-bold transition-colors hover:text-flour">
              {PHONE}
            </a>
            <a href={`mailto:${EMAIL}`} className="mt-1 block text-xs text-bone/70 transition-colors hover:text-brass">
              {EMAIL}
            </a>
            <a
              href={WEIBOOK_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-block border border-brass/70 px-5 py-2.5 font-mono text-xs tracking-[0.18em] text-brass uppercase transition-all hover:bg-brass hover:text-ink"
            >
              Reservar en Weibook ↗
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-fern/40 pt-6 font-mono text-[11px] tracking-[0.14em] text-sage uppercase">
          <p>© {new Date().getFullYear()} Peluquero José Ahumada</p>
          <p>Hecho a tijera, navaja y cariño en Santiago</p>
          <a href="#top" className="transition-colors hover:text-brass">
            Volver arriba ↑
          </a>
        </div>
      </div>

      <p
        aria-hidden
        className="font-display pointer-events-none -mb-6 text-center text-[19vw] leading-none tracking-tight whitespace-nowrap text-outline opacity-40 select-none lg:-mb-10"
      >
        AHUMADA
      </p>
    </footer>
  );
}

/* datos reutilizados por otras secciones */
export { HOURS };
