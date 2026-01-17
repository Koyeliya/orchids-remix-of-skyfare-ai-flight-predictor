"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Star({ delay, x, y, size }: { delay: number; x: number; y: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-white"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
      }}
      animate={{
        opacity: [0.2, 1, 0.2],
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration: 2 + Math.random() * 2,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut",
      }}
    />
  );
}

function Cloud({ delay, startX, y, speed }: { delay: number; startX: number; y: number; speed: number }) {
  return (
    <motion.div
      className="absolute opacity-5"
      style={{
        top: `${y}%`,
      }}
      initial={{ x: startX }}
      animate={{ x: startX + 2000 }}
      transition={{
        duration: speed,
        repeat: Infinity,
        delay: delay,
        ease: "linear",
      }}
    >
      <svg width="120" height="60" viewBox="0 0 120 60" fill="white">
        <ellipse cx="60" cy="35" rx="50" ry="20" />
        <ellipse cx="35" cy="30" rx="30" ry="18" />
        <ellipse cx="85" cy="30" rx="30" ry="18" />
        <ellipse cx="50" cy="20" rx="25" ry="15" />
        <ellipse cx="70" cy="22" rx="28" ry="16" />
      </svg>
    </motion.div>
  );
}

function FlyingPlane({ delay, startY, direction }: { delay: number; startY: number; direction: 1 | -1 }) {
  const startX = direction === 1 ? -100 : window?.innerWidth + 100 || 2000;
  const endX = direction === 1 ? (window?.innerWidth + 100 || 2000) : -100;
  
  return (
    <motion.div
      className="absolute text-2xl"
      style={{
        top: `${startY}%`,
      }}
      initial={{ x: startX, rotate: direction === 1 ? 0 : 180 }}
      animate={{ x: endX }}
      transition={{
        duration: 20 + Math.random() * 15,
        repeat: Infinity,
        delay: delay,
        ease: "linear",
      }}
    >
      ✈️
    </motion.div>
  );
}

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 4,
  }));

  const clouds = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    startX: -200 - i * 400,
    y: 10 + Math.random() * 60,
    speed: 80 + Math.random() * 40,
    delay: i * 8,
  }));

  const planes = Array.from({ length: 4 }, (_, i) => ({
    id: i,
    startY: 15 + Math.random() * 70,
    delay: i * 12,
    direction: (i % 2 === 0 ? 1 : -1) as 1 | -1,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0c0a1d] via-[#1a1035] to-[#0c0a1d]" />
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#00d4ff]/5 via-transparent to-[#ff6b35]/5" />
      
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(ellipse at 20% 30%, rgba(0, 212, 255, 0.08) 0%, transparent 50%)",
            "radial-gradient(ellipse at 80% 70%, rgba(255, 107, 53, 0.08) 0%, transparent 50%)",
            "radial-gradient(ellipse at 50% 50%, rgba(0, 212, 255, 0.06) 0%, transparent 50%)",
            "radial-gradient(ellipse at 20% 30%, rgba(0, 212, 255, 0.08) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {stars.map((star) => (
        <Star key={star.id} delay={star.delay} x={star.x} y={star.y} size={star.size} />
      ))}

      {clouds.map((cloud) => (
        <Cloud
          key={cloud.id}
          delay={cloud.delay}
          startX={cloud.startX}
          y={cloud.y}
          speed={cloud.speed}
        />
      ))}

      {planes.map((plane) => (
        <FlyingPlane
          key={plane.id}
          delay={plane.delay}
          startY={plane.startY}
          direction={plane.direction}
        />
      ))}

      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
