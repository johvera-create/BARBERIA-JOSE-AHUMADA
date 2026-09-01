import { Footer, Marquee, Nav, Noise } from "./components/Chrome";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { About, Gallery } from "./components/About";
import { Booking } from "./components/Booking";
import { Testimonials, Visit } from "./components/Closing";

const MARQUEE_ITEMS = [
  "Corte clásico adulto",
  "Degradados al milímetro",
  "Corte solo tijeras",
  "Afeitado tradicional a navaja",
  "Perfilado de barba",
  "Toalla caliente & aceites",
  "Corte + Barba combos",
  "Atención en Barbería, Studio y Domicilio",
];

export default function App() {
  return (
    <div className="min-h-screen bg-ink font-body text-bone">
      <Noise />
      <Nav />
      <main>
        <Hero />
        <Marquee items={MARQUEE_ITEMS} />
        <Services />
        <About />
        <Gallery />
        <Booking />
        <Visit />
      </main>
      <Footer />
    </div>
  );
}
