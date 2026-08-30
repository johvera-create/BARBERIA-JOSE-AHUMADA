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
    id: "clasicos",
    titulo: "Los clásicos",
    nota: "Tijera, máquina y conversación",
    services: [
      { id: "clasico", nombre: "Corte clásico", desc: "Tijera y máquina, peinado incluido", dur: 30, precio: 9000 },
      { id: "fade", nombre: "Degradado / fade", desc: "Al gusto: bajo, medio o a la piel", dur: 40, precio: 11000, hot: true },
      { id: "nino", nombre: "Corte cabro chico", desc: "Hasta 12 años, con paciencia de abuelo", dur: 25, precio: 7000 },
      { id: "lavado", nombre: "Lavado y peinado", desc: "Masaje capilar de propina", dur: 15, precio: 4000 },
    ],
  },
  {
    id: "barba",
    titulo: "Barba & navaja",
    nota: "Toalla caliente, aceite y precisión",
    services: [
      { id: "perfilado", nombre: "Perfilado de barba", desc: "Contornos a navaja y aceite", dur: 20, precio: 6000 },
      { id: "afeitado", nombre: "Afeitado clásico a navaja", desc: "Ritual completo con toalla caliente", dur: 35, precio: 10000, hot: true },
      { id: "cortebarba", nombre: "Corte + barba completa", desc: "El dúo que nunca falla", dur: 60, precio: 16000 },
    ],
  },
  {
    id: "extras",
    titulo: "Las otras cositas",
    nota: "Detalles que se notan",
    services: [
      { id: "cejas", nombre: "Cejas a navaja", desc: "Sin pincha y sin drama", dur: 10, precio: 2000 },
      { id: "canas", nombre: "Camuflaje de canas", desc: "Nadie se va a dar cuenta. Nadie.", dur: 25, precio: 8000 },
      { id: "tratamiento", nombre: "Tratamiento capilar", desc: "Exfoliación + masaje craneal", dur: 20, precio: 7000 },
      { id: "cera", nombre: "Depilación facial con cera", desc: "Nariz, orejas o mejillas", dur: 10, precio: 3000 },
    ],
  },
  {
    id: "packs",
    titulo: "Packs de la casa",
    nota: "Salga como nuevo, pagando menos",
    services: [
      { id: "completo", nombre: "El Completo", desc: "Corte + barba + cejas + lavado", dur: 75, precio: 19000, hot: true },
      { id: "padrehijo", nombre: "Padre e hijo", desc: "Dos cortes, una foto pal recuerdo", dur: 55, precio: 15000 },
      { id: "novio", nombre: "El Novio", desc: "Corte + afeitado ritual + retoque día B", dur: 90, precio: 28000 },
    ],
  },
];

export const ALL_SERVICES: Service[] = CATEGORIES.flatMap((c) => c.services);

/* ---------------- barberos ---------------- */

export interface Barber {
  id: string;
  nombre: string;
  alias: string;
  desc: string;
  iniciales: string;
}

export const BARBERS: Barber[] = [
  { id: "jose", nombre: "José Ahumada", alias: "El Patrón", desc: "26 años de oficio. Tijera clásica y afeitado ritual.", iniciales: "JA" },
  { id: "nico", nombre: "Nicolás Reyes", alias: "Manos Finas", desc: "El rey del fade. Degradados al milímetro.", iniciales: "NR" },
  { id: "any", nombre: "Sin preferencia", alias: "El primero libre", desc: "Te atiende quien esté disponible antes.", iniciales: "··" },
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

export const ADDRESS = "Av. Providencia 1438, local 3 · Providencia, Santiago";
export const PHONE = "+56 9 8765 4321";
export const PHONE_WA = "56987654321";

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
    detalle: "Cliente desde 2009",
    texto:
      "Llegué por un corte apurado antes de una entrevista y salí con fade, barba perfilada y una clase magistral de fútbol chileno. La entrevista la pasé igual, pero el corte ayudó harto.",
    servicio: "El Completo",
    stars: 5,
    big: true,
  },
  {
    nombre: "Matías Fuentes",
    detalle: "Cada 3 semanas, sagrado",
    texto: "El Nico te deja el fade tan limpio que da pena mojarse el pelo. Reserva con tiempo porque se llena.",
    servicio: "Degradado / fade",
    stars: 5,
  },
  {
    nombre: "Hernán Contreras",
    detalle: "Vecino del barrio",
    texto: "El afeitado a navaja con toalla caliente es lo más cercano a un spa que va a conocer este huaso. Salí como nuevo.",
    servicio: "Afeitado clásico",
    stars: 5,
  },
  {
    nombre: "Camila Órdenes",
    detalle: "Llevó a su papá",
    texto: "Llevé a mi papá por su cumpleaños y lo atendieron como rey. Café, conversación y un camuflaje de canas que quedó invisible.",
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
  { value: 26, suffix: "", label: "años de oficio" },
  { value: 84500, suffix: "+", label: "cortes y contando" },
  { value: 3, suffix: "", label: "sillones de cuero" },
  { value: 4.9, suffix: "★", label: "promedio en Google", decimal: true },
];
