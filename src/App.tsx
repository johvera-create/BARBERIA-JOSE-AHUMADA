import { Footer, Marquee, Nav, Noise } from "./components/Chrome";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { About, Gallery } from "./components/About";
import { Booking } from "./components/Booking";
import { Testimonials, Visit } from "./components/Closing";

const MARQUEE_ITEMS = [
  "Corte clásico",
  "Degradados al milímetro",
  "Afeitado a navaja",
  "Toalla caliente",
  "Perfilado de barba",
  "Cejas a navaja",
  "Camuflaje de canas",
  "Café de la casa",
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
