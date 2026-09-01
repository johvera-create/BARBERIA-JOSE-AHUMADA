/* ============================================================
   Peluquero José Ahumada — datos de la casa
   ============================================================ */

export interface Service {
  id: string;
  nombre: string;
  desc: string;
  dur: number; // minutos
  precio: number; // CLP
  hot?: boolean;
}

export interface Category {
  id: string;
  titulo: string;
  nota: string;
  services: Service[];
}

export const CATEGORIES: Category[] = [
  {
    id: "cortes",
    titulo: "Cortes de Cabello",
    nota: "Tijera, degradé y estilo clásico",
    services: [
      { id: "corte-clasico-adulto", nombre: "Corte Clásico Adulto", desc: "Corte de pelo realizado con máquina y tijeras, sin degradé, peinado final incluido.", dur: 30, precio: 10000, hot: true },
      { id: "corte-degradado", nombre: "Corte Degradado", desc: "Corte de pelo en degradé bajo, medio o alto, degradé clásico o a la piel.", dur: 60, precio: 12000, hot: true },
      { id: "corte-solo-tijeras", nombre: "Corte solo Tijeras", desc: "Corte con tijeras es un corte limpio y el pelo crecerá tal cual su forma.", dur: 60, precio: 12000 },
      { id: "lavado-pelo", nombre: "Lavado de Pelo", desc: "Lavado capilar profundo con masaje y productos de la casa.", dur: 10, precio: 5000 },
    ],
  },
  {
    id: "barba",
    titulo: "Barba & Navaja",
    nota: "Perfilado, toalla caliente y cuidado",
    services: [
      { id: "perfilado-barba", nombre: "Perfilado de Barba", desc: "Limpieza y perfilado de la barba con navaja y/o máquina, uso de aceites y toalla.", dur: 30, precio: 8000 },
      { id: "barba-perfilado-ritual", nombre: "Barba perfilado o afeitado completo", desc: "Ritual completo a navaja, aceites esenciales y toalla caliente para una piel perfecta.", dur: 45, precio: 10000, hot: true },
    ],
  },
  {
    id: "combos",
    titulo: "Combos & Dúos",
    nota: "Corte + Barba para salir renovado",
    services: [
      { id: "corte-clasico-barba", nombre: "Corte de Pelo Clásico + Perfilado de Barba", desc: "Corte de pelo clásico, sin degradé, más perfilado de barba con toalla caliente y navaja.", dur: 60, precio: 16000 },
      { id: "corte-degrade-barba", nombre: "Corte Degradé + Perfilado de Barba", desc: "Corte de pelo con degradado bajo, medio o alto con diferente acabado + perfilado de barba.", dur: 80, precio: 18000, hot: true },
      { id: "corte-clasico-toalla", nombre: "Corte de Pelo Clásico + Barba Toalla Caliente", desc: "Corte clásico más ritual de afeitado o perfilado con doble toalla caliente y masaje.", dur: 80, precio: 18000 },
      { id: "corte-degradado-completo", nombre: "Corte Degradado + Barba Completa Premium", desc: "El servicio completo definitivo: degradado al milímetro, barba completa con toalla y acabado pro.", dur: 90, precio: 20000, hot: true },
    ],
  },
];

export const ALL_SERVICES: Service[] = CATEGORIES.flatMap((c) => c.services);

/* ---------------- barberos ---------------- */

export interface Modality {
  id: string;
  nombre: string;
  alias: string;
  desc: string;
  iniciales: string;
}

export const MODALITIES: Modality[] = [
  { id: "barberia", nombre: "En la barbería", alias: "Aldunate 363", desc: "En el local de La Calera, Aldunate 363: sillón, buen café y cero apuro.", iniciales: "LC" },
  { id: "domicilio", nombre: "A domicilio", alias: "José va a ti", desc: "José va a tu casa por La Calera y alrededores. El traslado se coordina al agendar.", iniciales: "AD" },
];

/* ---------------- horarios ---------------- */

export interface DayHours {
  d: number; // 0 = domingo
  label: string;
  open: string | null;
  close: string | null;
}

export const HOURS: DayHours[] = [
  { d: 1, label: "Lunes", open: "10:00", close: "20:00" },
  { d: 2, label: "Martes", open: "10:00", close: "20:00" },
  { d: 3, label: "Miércoles", open: "10:00", close: "20:00" },
  { d: 4, label: "Jueves", open: "10:00", close: "20:00" },
  { d: 5, label: "Viernes", open: "10:00", close: "20:00" },
  { d: 6, label: "Sábado", open: "09:00", close: "18:00" },
  { d: 0, label: "Domingo", open: null, close: null },
];

export const ADDRESS = "Aldunate 363 · La Calera, Región de Valparaíso";
export const PHONE = "+56 9 8765 4321";
export const PHONE_WA = "56987654321";
export const WEIBOOK_URL = "https://book.weibook.co/profile/pos5yZHTs";

/* ---------------- helpers de fechas y horas ---------------- */

export function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
const toHHMM = (min: number) =>
  `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;

export interface DayInfo {
  iso: string;
  date: Date;
  weekday: string;
  dayNum: number;
  month: string;
  hours: DayHours;
  isToday: boolean;
}

export function getDays(n = 8): DayInfo[] {
  const fmtWeek = new Intl.DateTimeFormat("es-CL", { weekday: "short" });
  const fmtMonth = new Intl.DateTimeFormat("es-CL", { month: "short" });
  const out: DayInfo[] = [];
  const base = new Date();
  base.setHours(0, 0, 0, 0);
  for (let i = 0; i < n; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    const dow = d.getDay();
    const hours = HOURS.find((h) => h.d === dow)!;
    out.push({
      iso: d.toISOString().slice(0, 10),
      date: d,
      weekday: fmtWeek.format(d).replace(".", ""),
      dayNum: d.getDate(),
      month: fmtMonth.format(d).replace(".", ""),
      hours,
      isToday: i === 0,
    });
  }
  return out;
}

export interface Slot {
  time: string;
  taken: boolean;
  past: boolean;
}

export function getSlots(day: DayInfo, barberId: string): Slot[] {
  if (!day.hours.open || !day.hours.close) return [];
  const start = toMin(day.hours.open);
  const end = toMin(day.hours.close);
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const slots: Slot[] = [];
  for (let t = start; t <= end - 30; t += 30) {
    const time = toHHMM(t);
    const seed = hashStr(`${day.iso}|${time}|${barberId === "any" ? "casa" : barberId}`);
    const taken = seed % 10 < 4; // ~40 % ocupado, determinístico
    const past = day.isToday && t <= nowMin + 30;
    slots.push({ time, taken, past });
  }
  return slots;
}

export function nextAvailable(): string {
  const days = getDays(8);
  for (const d of days) {
    const free = getSlots(d, "any").find((s) => !s.taken && !s.past);
    if (free) {
      return d.isToday ? `Hoy · ${free.time}` : `${d.weekday} ${d.dayNum} · ${free.time}`;
    }
  }
  return "Consulta por WhatsApp";
}

export interface OpenState {
  open: boolean;
  msg: string;
}

export function getOpenState(now: Date): OpenState {
  const today = HOURS.find((h) => h.d === now.getDay())!;
  const nowMin = now.getHours() * 60 + now.getMinutes();
  if (today.open && today.close && nowMin >= toMin(today.open) && nowMin < toMin(today.close)) {
    return { open: true, msg: `Abierto ahora · cierra a las ${today.close}` };
  }
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    const h = HOURS.find((x) => x.d === d.getDay())!;
    if (h.open) {
      if (i === 0 && nowMin < toMin(h.open)) return { open: false, msg: `Cerrado · abre hoy a las ${h.open}` };
      if (i > 0) {
        const dayLabel = i === 1 ? "mañana" : h.label.toLowerCase();
        return { open: false, msg: `Cerrado · abre ${dayLabel} a las ${h.open}` };
      }
    }
  }
  return { open: false, msg: "Cerrado por hoy" };
}

export function formatCLP(n: number): string {
  return "$" + n.toLocaleString("es-CL");
}

export function makeCode(): string {
  const abc = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 4; i++) s += abc[Math.floor(Math.random() * abc.length)];
  return `JA-${s}`;
}

export function longDate(d: Date): string {
  return new Intl.DateTimeFormat("es-CL", { weekday: "long", day: "numeric", month: "long" }).format(d);
}

/* ---------------- la clientela ---------------- */

export interface Testimonial {
  nombre: string;
  detalle: string;
  texto: string;
  servicio: string;
  stars: number;
  big?: boolean;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    nombre: "Rodrigo Salinas",
    detalle: "Cliente desde el 2023",
    texto:
      "Llegué por un corte apurado antes de una entrevista y salí con fade, barba perfilada y una clase magistral de fútbol chileno. La entrevista la pasé igual, pero el corte ayudó harto.",
    servicio: "El Completo",
    stars: 5,
    big: true,
  },
  {
    nombre: "Matías Fuentes",
    detalle: "Cada 3 semanas, sagrado",
    texto: "José te deja el degradé tan limpio que da pena mojarse el pelo. Agenda con tiempo, que la libreta se llena.",
    servicio: "Degradado / fade",
    stars: 5,
  },
  {
    nombre: "Hernán Contreras",
    detalle: "Vecino de La Calera",
    texto: "El afeitado a navaja con toalla caliente es lo más cercano a un spa que va a conocer este huaso. Salí como nuevo.",
    servicio: "Afeitado clásico",
    stars: 5,
  },
  {
    nombre: "Camila Órdenes",
    detalle: "Llevó a su papá",
    texto: "Llevé a mi papá por su cumpleaños y José lo atendió como rey. Café, conversación y un camuflaje de canas que quedó invisible.",
    servicio: "Camuflaje de canas",
    stars: 5,
  },
  {
    nombre: "Felipe Arancibia",
    detalle: "Novio 2024",
    texto: "Tomé el pack Novio y el día del matrimonio pasó el propio José a retoquearme al hotel. Leyenda.",
    servicio: "El Novio",
    stars: 5,
  },
];

export const STATS = [
  { value: 2023, suffix: "", label: "nació la barbería", fixed: true },
  { value: 2100, suffix: "+", label: "cortes y contando" },
  { value: 2, suffix: "", label: "modalidades: barbería y a domicilio" },
  { value: 4.9, suffix: "★", label: "promedio en reseñas", decimal: true },
];
