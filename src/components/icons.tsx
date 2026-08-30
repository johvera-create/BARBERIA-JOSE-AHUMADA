/* Iconos dibujados a mano para la peluquería — trazo 1.7, estilo cartel */

interface P {
  className?: string;
}

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const Scissors = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
    <circle cx="6" cy="6.2" r="2.4" />
    <circle cx="6" cy="17.8" r="2.4" />
    <path d="M8.2 7.4 20.5 18.6M8.2 16.6 20.5 5.4" />
    <circle cx="12.6" cy="12" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

export const Razor = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
    <path d="M3.2 8.4 8.4 3.2l7.2 7.2-3.6 3.6-6.4-1.2z" />
    <path d="m12 14 7.6 6.8" />
    <path d="m17.8 5.6 2.6 2.6" />
  </svg>
);

export const Comb = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
    <rect x="4" y="5.5" width="16" height="4.5" rx="1.4" />
    <path d="M6.5 10v6.5M9.4 10v8M12.3 10v6.5M15.2 10v8M18 10v5.5" />
  </svg>
);

export const Mustache = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M12 12.6c-1.4-1.9-3.9-2.9-5.9-1.9-1.6.8-2.5 2.6-4 2.4.9 2.6 3.5 4 6.1 3.4 2-.5 3.2-2 3.8-3.9.6 1.9 1.8 3.4 3.8 3.9 2.6.6 5.2-.8 6.1-3.4-1.5.2-2.4-1.6-4-2.4-2-1-4.5 0-5.9 1.9z" />
  </svg>
);

export const Pomade = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
    <rect x="4.5" y="10" width="15" height="9" rx="2.2" />
    <rect x="7" y="5.5" width="10" height="4.5" rx="1.2" />
    <path d="M8 14.5h8" />
  </svg>
);

export const Towel = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
    <rect x="3.5" y="7" width="17" height="10" rx="3" />
    <path d="M8.5 7v10M13 7c1.8 1.6 1.8 8.4 0 10" />
  </svg>
);

export const Clock = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
    <circle cx="12" cy="12" r="8.4" />
    <path d="M12 7.5V12l3 2.2" />
  </svg>
);

export const Pin = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
    <path d="M12 21s-6.5-5.5-6.5-10.2A6.5 6.5 0 0 1 12 4.3a6.5 6.5 0 0 1 6.5 6.5C18.5 15.5 12 21 12 21z" />
    <circle cx="12" cy="10.8" r="2.1" />
  </svg>
);

export const Phone = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
    <path d="M5.5 4.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5C10.5 19.6 4.4 13.5 4 6.1A1.5 1.5 0 0 1 5.5 4.5z" />
  </svg>
);

export const Star = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="m12 3.6 2.5 5.2 5.7.7-4.2 4 1.1 5.6L12 16.3l-5.1 2.8 1.1-5.6-4.2-4 5.7-.7z" />
  </svg>
);

export const Check = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
);

export const ArrowRight = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
    <path d="M4 12h15M13.5 6l6 6-6 6" />
  </svg>
);

export const XMark = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const Calendar = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
    <rect x="4" y="5.5" width="16" height="14.5" rx="2" />
    <path d="M4 10h16M8.5 3.5v3.5M15.5 3.5v3.5" />
  </svg>
);

export const Chat = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
    <path d="M12 4.5c-4.7 0-8.5 3.2-8.5 7.2 0 1.5.5 2.8 1.4 3.9L4 20l4.4-1.6c1.1.4 2.3.6 3.6.6 4.7 0 8.5-3.2 8.5-7.2S16.7 4.5 12 4.5z" />
    <path d="M9.2 12.8c.3 1.4 1.9 2.6 3.6 2.4" />
  </svg>
);

export const Chair = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
    <path d="M8 3.5v9M8 6.5h7.5a2 2 0 0 1 2 2V12" />
    <rect x="5.5" y="12.5" width="13" height="3" rx="1.2" />
    <path d="M12 15.5v3.5M7.5 21c1.5-1.3 7.5-1.3 9 0" />
  </svg>
);

export const Spray = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
    <rect x="8" y="9" width="8" height="11.5" rx="2" />
    <path d="M10.5 9V6.5h3V9M12 6.5V4.5h3" />
    <path d="M17.8 3.5h.01M19.8 5.5h.01M19.3 2.8h.01" />
  </svg>
);

export const Diamond = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M12 4.5 19.5 12 12 19.5 4.5 12z" />
  </svg>
);
