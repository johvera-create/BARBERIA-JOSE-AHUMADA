import type { CSSProperties } from "react";
import { getOpenState, nextAvailable, HOURS } from "../data";
import { useNow } from "../hooks";
import { ArrowRight, Scissors } from "./icons";
import { BarberPole } from "./Chrome";

function TicketBarcode() {
  const bars = [3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2, 1, 3, 4, 1, 2, 1, 3, 2, 1, 4, 1, 2];
  let x = 0;
  return (
    <svg viewBox="0 0 120 18" className="h-5 w-full text-ink" aria-hidden>
      {bars.map((w, i) => {
        const rect = <rect key={i} x={x} y="0" width={w} height="18" fill="currentColor" />;
        x += w + 1.4;
        return rect;
      })}
    </svg>
  );
}

function RotatingStamp() {
  return (
    <a
      href="#agenda"
      className="group absolute -bottom-9 -left-7 z-10 hidden sm:block lg:-left-14"
      aria-label="Agendar hora"
    >
      <svg viewBox="0 0 120 120" className="spin-slow h-28 w-28">
        <defs>
          <path id="stampcircle" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
        </defs>
        <circle cx="60" cy="60" r="58" className="fill-blood" />
        <circle cx="60" cy="60" r="34" fill="none" stroke="#f6efdc" strokeWidth="1" strokeDasharray="3 4" />
        <text className="fill-flour font-mono" fontSize="10.5" letterSpacing="2.6">
          <textPath href="#stampcircle">AGENDA TU HORA • SIN FILAS • LLEGASTE •</textPath>
        </text>
      </svg>
      <Scissors className="absolute top-1/2 left-1/2 w-7 -translate-x-1/2 -translate-y-1/2 text-flour transition-transform duration-300 group-hover:rotate-45" />
    </a>
  );
}

export function Hero() {
  const now = useNow(30000);
  const state = getOpenState(now);
  const today = HOURS.find((h) => h.d === now.getDay())!;

  return (
    <header id="top" className="pinstripe relative overflow-hidden">
      {/* marca de agua */}
      <p
        aria-hidden
        className="font-display pointer-events-none absolute -top-10 right-[-3rem] text-[24rem] leading-none text-outline opacity-25 select-none lg:text-[30rem]"
      >
        JA
      </p>

      <div className="mx-auto grid max-w-7xl gap-14 px-5 pt-32 pb-20 sm:px-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:gap-10 lg:pt-40 lg:pb-24">
        {/* ---- columna tipográfica ---- */}
        <div>
          <div className="mb-7 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] tracking-[0.3em] text-sage uppercase">
            <span className="flex items-center gap-3">
              <span className="h-px w-9 bg-blood" />
              Peluquero a la antigua
            </span>
            <span>La Calera · V Región</span>
            <span className="text-brass">Desde 2023</span>
          </div>

          <h1 className="font-display text-[17vw] leading-[0.86] tracking-[0.01em] text-flour uppercase sm:text-8xl lg:text-[6.6rem] xl:text-[7.6rem]">
            <span className="mask-line" style={{ "--ml-delay": "80ms" } as CSSProperties}>
              <span>Corte,</span>
            </span>
            <span className="mask-line" style={{ "--ml-delay": "230ms" } as CSSProperties}>
              <span className="text-outline">navaja</span>
            </span>
            <span className="mask-line" style={{ "--ml-delay": "380ms" } as CSSProperties}>
              <span>
                <em className="text-blood not-italic">&amp;</em> oficio.
              </span>
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-bone/85">
            El estudio de <strong className="font-semibold text-flour">José Ahumada</strong>: corte
            clásico, degradé y perfilado de barba con oficio de peluquería de antes. Atiende en su
            estudio de la casa, en <strong className="font-semibold text-flour">La Calera</strong> — y
            si te queda lejos, él va a tu domicilio.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#agenda"
              className="group flex items-center gap-3 border-2 border-blood bg-blood px-7 py-4 font-mono text-sm font-bold tracking-[0.16em] text-flour uppercase transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(206,58,40,0.35)] active:translate-y-0"
            >
              Agendar mi hora
              <ArrowRight className="w-4.5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
            <a
              href="#pizarra"
              className="flex items-center gap-3 border-2 border-bone/30 px-7 py-4 font-mono text-sm tracking-[0.16em] text-bone uppercase transition-all duration-200 hover:border-brass hover:text-brass"
            >
              Ver la pizarra
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs tracking-[0.12em] text-sage uppercase">
            <span className="text-brass">4.9★ en reseñas</span>
            <span className="text-blood">◆</span>
            <span>+2.100 cortes hechos</span>
            <span className="text-blood">◆</span>
            <span>Estudio y a domicilio</span>
          </div>
        </div>

        {/* ---- columna del ticket ---- */}
        <div className="relative flex justify-center lg:justify-end lg:pr-8">
          <BarberPole className="absolute -top-4 left-0 hidden h-110 w-7 lg:flex" />

          <div className="group relative w-full max-w-sm rotate-1 bg-bone text-ink shadow-[0_30px_70px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:rotate-0">
            {/* muescas de ticket */}
            <span className="absolute top-[164px] -left-3.5 h-7 w-7 rounded-full bg-ink" aria-hidden />
            <span className="absolute top-[164px] -right-3.5 h-7 w-7 rounded-full bg-ink" aria-hidden />

            <div className="px-7 pt-7 pb-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase">
                    Peluquería J. Ahumada
                  </p>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.22em] text-ink/55 uppercase">
                    La Calera · V Región
                  </p>
                </div>
                <p className="font-mono text-xs font-bold text-blood">Nº 0001</p>
              </div>

              <div className="my-5 border-t-2 border-dashed border-ink/25" />

              <div className="flex items-center gap-2.5">
                <span
                  className={`blink-dot h-2.5 w-2.5 rounded-full ${state.open ? "bg-fern" : "bg-blood"}`}
                />
                <p className="font-mono text-[13px] font-bold tracking-wide uppercase">{state.msg}</p>
              </div>

              <dl className="mt-5 space-y-2.5 font-mono text-[12px]">
                <div className="flex justify-between gap-4">
                  <dt className="tracking-[0.18em] text-ink/55 uppercase">Hoy</dt>
                  <dd className="text-right font-bold">
                    {today.open ? `${today.open} – ${today.close}` : "cerrado"}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="tracking-[0.18em] text-ink/55 uppercase">Turno libre</dt>
                  <dd className="text-right font-bold text-blood">{nextAvailable()}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="tracking-[0.18em] text-ink/55 uppercase">Estudio</dt>
                  <dd className="text-right font-bold">En casa · La Calera</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="tracking-[0.18em] text-ink/55 uppercase">¿A domicilio?</dt>
                  <dd className="text-right font-bold">Sí, se coordina</dd>
                </div>
              </dl>
            </div>

            <div className="border-t-2 border-dashed border-ink/25 px-7 py-5">
              <a
                href="#agenda"
                className="flex w-full items-center justify-center gap-2 bg-ink py-3.5 font-mono text-xs font-bold tracking-[0.24em] text-flour uppercase transition-colors duration-200 hover:bg-blood"
              >
                <Scissors className="w-4" />
                Reservar mi hora
              </a>
              <p className="mt-3 text-center font-mono text-[10px] tracking-[0.14em] text-ink/50 uppercase">
                Guarda este ticket · vale un café de la casa
              </p>
            </div>

            <div className="px-7 pb-6">
              <TicketBarcode />
            </div>
          </div>

          <RotatingStamp />
        </div>
      </div>
    </header>
  );
}
