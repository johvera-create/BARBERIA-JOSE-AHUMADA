import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
}

export function TiltCard({
  children,
  className = "",
  maxTilt = 10,
  glare = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useSpring(0, { stiffness: 300, damping: 25 });
  const y = useSpring(0, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const posX = e.clientX - rect.left;
    const posY = e.clientY - rect.top;

    const normX = posX / rect.width - 0.5;
    const normY = posY / rect.height - 0.5;

    x.set(normX);
    y.set(normY);

    if (glare) {
      setGlarePos({
        x: (posX / rect.width) * 100,
        y: (posY / rect.height) * 100,
      });
    }
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={"relative transition-shadow duration-300 " + className}
    >
      {children}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-30"
          style={{
            opacity: isHovered ? 0.25 : 0,
            background: `radial-gradient(circle 260px at ${glarePos.x}% ${glarePos.y}%, rgba(246, 239, 220, 0.35), transparent 70%)`,
          }}
          aria-hidden
        />
      )}
    </motion.div>
  );
}
