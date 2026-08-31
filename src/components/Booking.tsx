import { useEffect, useMemo, useState } from "react";
import {
  MODALITIES,
  CATEGORIES,
  formatCLP,
  getDays,
  getSlots,
  longDate,
  makeCode,
  type Modality,
  type DayInfo,
  type Service,
} from "../data";
import { ArrowRight, Check, Scissors, XMark } from "./icons";
import { Reveal, SectionHead } from "./Chrome";

/* ---------------- tipos ---------------- */

interface Booking {
  code: string;
  serviceId: string;
  serviceName: string;
  modalityId: string;
  modalityName: string;
  dayLabel: string;
  dayISO: string;
  time: string;
  dur: number;
  precio: number;
  nombre: string;
  telefono: string;
  nota: string;
}

const LS_KEY = "ja-reservas";

function loadSaved(): Booking[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as Booking[]) : [];
  } catch {
    return [];
  }
}

/* ---------------- código de barras determinístico ---------------- */
function Barcode({ seed, className = "" }: { seed: string; className?: string }) {
  const bars = seed
    .split("")
    .flatMap((ch) => [ch.charCodeAt(0) % 3 + 1, ch.charCodeAt(0) % 2 + 1, 2]);
  let x = 0;
  return (
    <svg viewBox="0 0 120 16" className={className} aria-hidden>
      {bars.map((w, i) => {
        const r = <rect key={i} x={x} y="0" width={w} height="16" fill="currentColor" />;
        x += w + 1.3;
        return r;
      })}
    </svg>
  );
}

/* ---------------- ticket ---------------- */
function Ticket({
  sel,
  confirmed,
}: {
  sel: Partial<Booking>;
  confirmed: Booking | null;
}) {
  const b = confirmed ?? sel;
  return (
    <div
      className={`relative bg-bone text-ink shadow-[0_28px_70px_rgba(0,0,0,0.5)] transition-transform duration-500 ${
        confirmed ? "ticket-in rotate-0" : "rotate-[1.2deg] hover:rotate-0"
      }`}
    >
      <span className="absolute top-[150px] -left-3.5 h-7 w-7 rounded-full bg-ink" aria-hidden />
      <span className="absolute top-[150px] -right-3.5 h-7 w-7 rounded-full bg-ink" aria-hidden />

      <div className="px-7 pt-7 pb-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase">
              Peluquería J. Ahumada
            </p>
            <p className="mt-1 font-mono text-[10px] tracking-[0.22em] text-ink/55 uppercase">
              Ticket de hora
            </p>
          </div>
          <p className="font-mono text-xs font-bold text-blood">{b.code ?? "····"}</p>
        </div>

        <div className="my-5 border-t-2 border-dashed border-ink/25" />

        <dl className="space-y-3 font-mono text-[12px]">
          {(
            [
              ["Servicio", b.serviceName],
              ["Modalidad", b.modalityName],
              ["Día", b.dayLabel],
              ["Hora", b.time],
              ["Duración", b.dur ? `${b.dur} min` : undefined],
              ["Cliente", b.nombre || undefined],
            ] as [string, string | undefined][]
          ).map(([k, v]) => (
            <div key={k} className="flex items-baseline gap-3">
              <dt className="w-20 shrink-0 tracking-[0.18em] text-ink/50 uppercase">{k}</dt>
              <dd className={`flex-1 border-b border-dotted border-ink/25 pb-0.5 ${v ? "font-bold" : "text-ink/35"}`}>
                {v ?? "— por definir —"}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="border-t-2 border-dashed border-ink/25 px-7 py-5">
        <div className="flex items-baseline justify-between">
          <p className="font-mono text-[11px] font-bold tracking-[0.24em] uppercase">Total</p>
          <p className="font-display text-4xl">{b.precio ? formatCLP(b.precio) : "$ —"}</p>
        </div>
        <p className="mt-3 font-mono text-[10px] leading-relaxed tracking-[0.08em] text-ink/55 uppercase">
          Llega 5 min antes · Pagas en el local · Cancela gratis hasta 2 h antes
        </p>
      </div>

      <div className="px-7 pb-6">
        <Barcode seed={b.code ?? "PENDIENTE0000"} className="h-4 w-full text-ink" />
      </div>

      {confirmed && (
        <div className="stamp-in absolute top-24 -right-3 border-[3px] border-blood px-4 py-1.5 text-center sm:-right-6">
          <p className="font-display text-2xl leading-none tracking-wide text-blood uppercase">
            Confirmado
          </p>
          <p className="mt-1 font-mono text-[10px] font-bold tracking-[0.2em] text-blood">
            {confirmed.code}
          </p>
        </div>
      )}
    </div>
  );
}

/* ---------------- pasos ---------------- */
const STEPS = ["Servicio", "Modalidad", "Día y hora", "Tus datos"];

export function Booking() {
  const days = useMemo(() => getDays(8).filter((d) => d.hours.open !== null), []);

  const [step, setStep] = useState(0);
  const [service, setService] = useState<Service | null>(null);
  const [barber, setBarber] = useState<Modality | null>(null);
  const [day, setDay] = useState<DayInfo | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [nota, setNota] = useState("");
  const [errors, setErrors] = useState<{ nombre?: string; telefono?: string }>({});
  const [saved, setSaved] = useState<Booking[]>(loadSaved);
  const [confirmed, setConfirmed] = useState<Booking | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(saved));
    } catch {
      /* sin espacio, no pasa nada */
    }
  }, [saved]);

  const slots = useMemo(() => {
    if (!day || !barber) return [];
    const mine = saved
      .filter((b) => b.dayISO === day.iso && b.modalityId === barber.id)
      .map((b) => b.time);
    return getSlots(day, barber.id).map((s) => ({
      ...s,
      taken: s.taken || mine.includes(s.time),
    }));
  }, [day, barber, saved]);

  const telDigits = telefono.replace(/\D/g, "");
  const stepValid = [
    !!service,
    !!barber,
    !!day && !!time,
    nombre.trim().length >= 2 && telDigits.length >= 8,
  ][step];

  const pickDay = (d: DayInfo) => {
    setDay(d);
    setTime(null);
  };

  const next = () => {
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    const errs: typeof errors = {};
    if (nombre.trim().length < 2) errs.nombre = "Cuéntanos tu nombre, po.";
    if (telDigits.length < 8) errs.telefono = "Necesitamos un teléfono válido (mín. 8 dígitos).";
    setErrors(errs);
    if (Object.keys(errs).length > 0 || !service || !barber || !day || !time) return;

    const booking: Booking = {
      code: makeCode(),
      serviceId: service.id,
      serviceName: service.nombre,
      modalityId: barber.id,
      modalityName: barber.nombre,
      dayLabel: longDate(day.date),
      dayISO: day.iso,
      time,
      dur: service.dur,
      precio: service.precio,
      nombre: nombre.trim(),
      telefono: telefono.trim(),
      nota: nota.trim(),
    };
    setSaved((s) => [booking, ...s]);
    setConfirmed(booking);
  };

  const reset = () => {
    setStep(0);
    setService(null);
    setBarber(null);
    setDay(null);
    setTime(null);
    setNombre("");
    setTelefono("");
    setNota("");
    setErrors({});
    setConfirmed(null);
  };

  const cancel = (code: string) => {
    setSaved((s) => s.filter((b) => b.code !== code));
    if (confirmed?.code === code) setConfirmed(null);
  };

  const sel: Partial<Booking> = {
    code: confirmed?.code,
    serviceName: service?.nombre,
    modalityName: barber ? barber.nombre : undefined,
    dayLabel: day ? longDate(day.date) : undefined,
    time: time ?? undefined,
    dur: service?.dur,
    precio: service?.precio,
    nombre: nombre.trim() || undefined,
  };

  return (
    <section id="agenda" className="pinstripe relative border-t border-fern/40 bg-ink py-16 sm:py-20 lg:py-28 xl:py-32">
      <div className="pole-stripes absolute inset-x-0 top-0 h-2" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          kicker="Reserva online"
          title={
            <>
              Agenda tu <span className="text-blood">hora</span>
            </>
          }
          note="Eliges servicio, modalidad y horario; José te guarda el sillón. En la barbería de Aldunate 363, La Calera — o en tu propia casa."
        />

        <div className="grid items-start gap-8 lg:grid-cols-[1fr_360px] lg:gap-10 xl:grid-cols-[1fr_400px] xl:gap-14">
          {/* -------- asistente -------- */}
          <Reveal>
            <div className="border border-fern/70 bg-pine/90 p-4 sm:p-7 md:p-9">
              {/* indicador de pasos */}
              <ol className="mb-6 flex items-center gap-1.5 sm:mb-9 sm:gap-3">
                {STEPS.map((s, i) => {
                  const done = i < step || confirmed !== null;
                  const active = i === step && !confirmed;
                  return (
                    <li key={s} className="flex flex-1 items-center gap-1.5 last:flex-none sm:gap-3">
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center border-2 font-mono text-xs font-bold transition-all duration-300 sm:h-9 sm:w-9 ${
                          done
                            ? "border-brass bg-brass text-ink"
                            : active
                              ? "border-blood text-flour"
                              : "border-fern text-sage"
                        }`}
                      >
                        {done ? <Check className="w-3.5 sm:w-4" /> : i + 1}
                      </span>
                      <span
                        className={`hidden font-mono text-[10px] tracking-[0.18em] uppercase md:block ${
                          active ? "text-flour" : "text-sage"
                        }`}
                      >
                        {s}
                      </span>
                      {i < 3 && <span className={`h-px flex-1 ${done ? "bg-brass" : "bg-fern/60"}`} />}
                    </li>
                  );
                })}
              </ol>

              {confirmed ? (
                /* -------- éxito -------- */
                <div className="py-6 text-center">
                  <span className="mx-auto grid h-20 w-20 place-items-center rounded-full border-2 border-brass text-brass">
                    <Check className="w-9" />
                  </span>
                  <h3 className="font-display mt-6 text-4xl tracking-wide text-flour uppercase">
                    ¡Listo, {confirmed.nombre.split(" ")[0]}!
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-sage">
                    Tu hora está guardada en la libreta:{" "}
                    <strong className="text-flour">{confirmed.serviceName}</strong> el{" "}
                    <strong className="text-flour">{confirmed.dayLabel}</strong> a las{" "}
                    <strong className="text-brass">{confirmed.time}</strong>.{" "}
                    {confirmed.modalityId === "domicilio"
                      ? "José irá a tu casa — te escribimos por WhatsApp para coordinar la dirección."
                      : "Te esperamos en la barbería: Aldunate 363, La Calera."}
                  </p>
                  <p className="mt-4 font-mono text-xs tracking-[0.2em] text-blood uppercase">
                    Código de reserva: {confirmed.code}
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <button
                      onClick={reset}
                      className="flex items-center gap-2 border-2 border-blood bg-blood px-6 py-3.5 font-mono text-xs font-bold tracking-[0.18em] text-flour uppercase transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(206,58,40,0.35)]"
                    >
                      <Scissors className="w-4" /> Agendar otra hora
                    </button>
                    <button
                      onClick={() => cancel(confirmed.code)}
                      className="px-4 py-3.5 font-mono text-xs tracking-[0.18em] text-sage uppercase underline decoration-sage/40 underline-offset-4 transition-colors hover:text-blood hover:decoration-blood/50"
                    >
                      Mejor no, cancelar
                    </button>
                  </div>
                </div>
              ) : step === 0 ? (
                /* -------- servicio -------- */
                <div className="space-y-6">
                  {CATEGORIES.map((cat) => (
                    <div key={cat.id}>
                      <p className="mb-2.5 font-mono text-[10px] tracking-[0.28em] text-brass uppercase">
                        {cat.titulo}
                      </p>
                      <div className="grid gap-2.5 sm:grid-cols-2">
                        {cat.services.map((s) => {
                          const on = service?.id === s.id;
                          return (
                            <button
                              key={s.id}
                              onClick={() => setService(s)}
                              className={`group relative border p-4 text-left transition-all duration-200 ${
                                on
                                  ? "border-brass bg-moss shadow-[0_10px_25px_rgba(0,0,0,0.35)]"
                                  : "border-fern/60 hover:border-brass/60 hover:bg-moss/50"
                              }`}
                            >
                              {on && (
                                <span className="absolute top-3 right-3 grid h-5 w-5 place-items-center bg-brass text-ink">
                                  <Check className="w-3" />
                                </span>
                              )}
                              <p className="pr-6 font-semibold text-flour">{s.nombre}</p>
                              <p className="mt-1 font-mono text-[11px] tracking-wide text-sage">
                                {s.dur} min · <span className="text-brass">{formatCLP(s.precio)}</span>
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : step === 1 ? (
                /* -------- barbero -------- */
                <div className="space-y-3">
                  {MODALITIES.map((b: Modality) => {
                    const on = barber?.id === b.id;
                    return (
                      <button
                        key={b.id}
                        onClick={() => {
                          setBarber(b);
                          setTime(null);
                        }}
                        className={`flex w-full items-center gap-5 border p-5 text-left transition-all duration-200 ${
                          on
                            ? "border-brass bg-moss shadow-[0_10px_25px_rgba(0,0,0,0.35)]"
                            : "border-fern/60 hover:border-brass/60 hover:bg-moss/50"
                        }`}
                      >
                        <span
                          className={`font-display grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 text-lg transition-colors ${
                            on ? "border-brass bg-brass text-ink" : "border-fern text-bone"
                          }`}
                        >
                          {b.iniciales}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-baseline gap-x-3">
                            <span className="font-semibold text-flour">{b.nombre}</span>
                            <span className="font-mono text-[10px] tracking-[0.2em] text-brass uppercase">
                              “{b.alias}”
                            </span>
                          </span>
                          <span className="mt-1 block text-[13px] text-sage">{b.desc}</span>
                        </span>
                        {on && (
                          <span className="grid h-6 w-6 shrink-0 place-items-center bg-brass text-ink">
                            <Check className="w-3.5" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : step === 2 ? (
                /* -------- día y hora -------- */
                <div>
                  <p className="mb-3 font-mono text-[10px] tracking-[0.28em] text-brass uppercase">
                    Elige el día
                  </p>
                  <div className="grid grid-cols-4 gap-2 sm:flex sm:flex-wrap sm:gap-2.5">
                    {days.map((d) => {
                      const on = day?.iso === d.iso;
                      return (
                        <button
                          key={d.iso}
                          onClick={() => pickDay(d)}
                          className={`w-full border py-2.5 text-center transition-all duration-200 sm:w-[78px] ${
                            on
                              ? "border-blood bg-blood text-flour shadow-[0_10px_25px_rgba(206,58,40,0.3)]"
                              : "border-fern/60 hover:border-brass/70 hover:bg-moss/50"
                          }`}
                        >
                          <span className={`block font-mono text-[10px] tracking-[0.16em] uppercase ${on ? "text-flour/80" : "text-sage"}`}>
                            {d.isToday ? "Hoy" : d.weekday}
                          </span>
                          <span className="font-display block text-xl leading-tight sm:text-2xl">{d.dayNum}</span>
                          <span className={`block font-mono text-[10px] uppercase ${on ? "text-flour/80" : "text-sage"}`}>
                            {d.month}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <p className="mt-6 mb-3 font-mono text-[10px] tracking-[0.28em] text-brass uppercase sm:mt-8">
                    Y la hora {day && <span className="text-sage normal-case">· {longDate(day.date)}</span>}
                  </p>
                  {day ? (
                    <>
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
                        {slots.map((s) => {
                          const on = time === s.time;
                          const dead = s.taken || s.past;
                          return (
                            <button
                              key={s.time}
                              disabled={dead}
                              onClick={() => setTime(s.time)}
                              className={`border py-2.5 font-mono text-xs sm:text-[13px] transition-all duration-150 ${
                                on
                                  ? "border-brass bg-brass font-bold text-ink"
                                  : dead
                                    ? "cursor-not-allowed border-fern/40 text-sage/40 line-through"
                                    : "border-fern/60 text-bone hover:-translate-y-0.5 hover:border-brass/70 hover:bg-moss/60"
                              }`}
                            >
                              {s.time}
                            </button>
                          );
                        })}
                      </div>
                      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] tracking-[0.16em] text-sage uppercase">
                        <span className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 border border-fern bg-transparent" /> Libre
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 bg-brass" /> Tuyo
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 bg-fern/40" /> Ocupado
                        </span>
                        {barber?.id === "domicilio" && (
                          <span className="text-brass normal-case">A domicilio: José va a tu casa y coordina la dirección contigo.</span>
                        )}
                      </div>
                    </>
                  ) : (
                    <p className="border border-dashed border-fern/60 py-8 text-center font-mono text-xs tracking-[0.16em] text-sage uppercase">
                      Primero el día, después la hora
                    </p>
                  )}
                </div>
              ) : (
                /* -------- datos -------- */
                <div className="space-y-5">
                  <div>
                    <label htmlFor="bk-nombre" className="mb-2 block font-mono text-[10px] tracking-[0.24em] text-brass uppercase">
                      Nombre completo *
                    </label>
                    <input
                      id="bk-nombre"
                      className="field"
                      placeholder="Ej: Pedro Pablo Rojas"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                    {errors.nombre && <p className="mt-1.5 text-xs text-blood">{errors.nombre}</p>}
                  </div>
                  <div>
                    <label htmlFor="bk-tel" className="mb-2 block font-mono text-[10px] tracking-[0.24em] text-brass uppercase">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      id="bk-tel"
                      className="field"
                      type="tel"
                      placeholder="+56 9 1234 5678"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                    />
                    {errors.telefono && <p className="mt-1.5 text-xs text-blood">{errors.telefono}</p>}
                  </div>
                  <div>
                    <label htmlFor="bk-nota" className="mb-2 block font-mono text-[10px] tracking-[0.24em] text-brass uppercase">
                      Nota pa’l barbero (opcional)
                    </label>
                    <textarea
                      id="bk-nota"
                      className="field min-h-20 resize-y"
                      placeholder="Ej: fade alto, poca máquina arriba, tengo remolino…"
                      value={nota}
                      onChange={(e) => setNota(e.target.value)}
                    />
                  </div>

                  <div className="border border-dashed border-brass/40 bg-moss/40 p-5 font-mono text-xs">
                    <p className="mb-3 tracking-[0.24em] text-brass uppercase">Resumen</p>
                    <ul className="space-y-1.5 text-bone/85">
                      <li className="flex justify-between gap-4">
                        <span className="text-sage">Servicio</span>
                        <span className="text-right font-bold">{service?.nombre}</span>
                      </li>
                      <li className="flex justify-between gap-4">
                        <span className="text-sage">Modalidad</span>
                        <span className="text-right font-bold">
                          {barber ? barber.nombre : ""}
                        </span>
                      </li>
                      <li className="flex justify-between gap-4">
                        <span className="text-sage">Cuándo</span>
                        <span className="text-right font-bold">
                          {day ? longDate(day.date) : ""} · {time}
                        </span>
                      </li>
                      <li className="flex justify-between gap-4 border-t border-fern/50 pt-2">
                        <span className="text-sage">Total</span>
                        <span className="font-display text-lg text-brass">
                          {service ? formatCLP(service.precio) : ""}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* navegación del asistente */}
              {!confirmed && (
                <div className="mt-9 flex items-center justify-between gap-4 border-t border-fern/50 pt-6">
                  <button
                    onClick={() => setStep(Math.max(0, step - 1))}
                    className={`font-mono text-xs tracking-[0.18em] uppercase transition-colors ${
                      step === 0 ? "invisible" : "text-sage hover:text-flour"
                    }`}
                  >
                    ← Atrás
                  </button>
                  <button
                    onClick={next}
                    disabled={!stepValid}
                    className={`group flex items-center gap-3 border-2 px-7 py-3.5 font-mono text-xs font-bold tracking-[0.18em] uppercase transition-all duration-200 ${
                      stepValid
                        ? step === 3
                          ? "border-blood bg-blood text-flour hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(206,58,40,0.4)]"
                          : "border-brass bg-brass text-ink hover:-translate-y-0.5"
                        : "cursor-not-allowed border-fern text-sage/50"
                    }`}
                  >
                    {step === 3 ? "Confirmar mi hora" : "Siguiente"}
                    <ArrowRight className="w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              )}
            </div>
          </Reveal>

          {/* -------- ticket + horas guardadas -------- */}
          <Reveal delay={150} className="space-y-8 lg:sticky lg:top-28">
            <Ticket sel={sel} confirmed={confirmed} />

            <div className="border border-fern/60 bg-pine/80 p-6">
              <p className="mb-4 font-mono text-[10px] tracking-[0.28em] text-brass uppercase">
                Tus horas agendadas ({saved.length})
              </p>
              {saved.length === 0 ? (
                <p className="flex items-center gap-3 text-sm text-sage">
                  <Scissors className="w-5 shrink-0 text-blood" />
                  Todavía sin horas. El sillón te espera.
                </p>
              ) : (
                <ul className="space-y-3">
                  {saved.map((b) => (
                    <li
                      key={b.code}
                      className="group flex items-center justify-between gap-3 border border-fern/40 bg-moss/40 px-4 py-3 transition-colors hover:border-blood/50"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-flour">{b.serviceName}</p>
                        <p className="mt-0.5 font-mono text-[11px] text-sage">
                          {b.dayLabel} · <span className="text-brass">{b.time}</span> · {b.modalityName}
                        </p>
                      </div>
                      <button
                        onClick={() => cancel(b.code)}
                        aria-label={`Cancelar reserva ${b.code}`}
                        className="grid h-8 w-8 shrink-0 place-items-center border border-fern text-sage transition-all hover:border-blood hover:text-blood"
                      >
                        <XMark className="w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
