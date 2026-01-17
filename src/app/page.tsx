"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Zap, Target, Clock, Route } from "lucide-react";

function AnimatedPlane() {
  return (
    <motion.svg
      width="320"
      height="320"
      viewBox="0 0 100 100"
      className="animate-float"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <defs>
        <linearGradient id="planeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#ff6b35" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#glow)">
        <path
          d="M50 15 L55 35 L85 45 L55 48 L55 70 L65 80 L55 75 L50 85 L45 75 L35 80 L45 70 L45 48 L15 45 L45 35 Z"
          fill="url(#planeGradient)"
          stroke="#00d4ff"
          strokeWidth="0.5"
        />
        <circle cx="50" cy="30" r="3" fill="#00d4ff" opacity="0.8" />
        <line x1="45" y1="50" x2="20" y2="55" stroke="#00d4ff" strokeWidth="0.3" opacity="0.5" />
        <line x1="55" y1="50" x2="80" y2="55" stroke="#ff6b35" strokeWidth="0.3" opacity="0.5" />
      </g>
    </motion.svg>
  );
}

const features = [
  {
    icon: Zap,
    title: "Instant Predictions",
    description: "Get fare estimates in milliseconds using our advanced AI model",
    color: "#00d4ff",
  },
  {
    icon: Target,
    title: "98% Accuracy",
    description: "Industry-leading prediction accuracy for Indian domestic flights",
    color: "#ff6b35",
  },
  {
    icon: Clock,
    title: "Travel History",
    description: "Track all your predictions and compare historical trends",
    color: "#00d4ff",
  },
  {
    icon: Route,
    title: "Smart Routing",
    description: "Intelligent route analysis for optimal pricing insights",
    color: "#ff6b35",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00d4ff]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff6b35]/5 rounded-full blur-3xl" />
      </div>

      <section className="relative min-h-[90vh] flex items-center justify-center px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex gap-4 flex-wrap">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border-cyan"
                >
                  <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
                  <span className="text-xs uppercase tracking-widest font-mono text-[#00d4ff]">
                    AI Model: Active
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border-orange"
                >
                  <span className="text-xs uppercase tracking-widest font-mono text-[#ff6b35]">
                    Accuracy: 98.2%
                  </span>
                </motion.div>
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-white">Predict Flight Fares</span>
                <br />
                <span className="text-[#00d4ff] text-glow-cyan">With AI</span>{" "}
                <span className="text-[#ff6b35] text-glow-orange">Precision</span>
              </h1>

              <p className="text-lg text-white/60 max-w-lg">
                Leverage cutting-edge machine learning to forecast Indian domestic flight prices. 
                Make smarter travel decisions with data-driven predictions.
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/predict"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#00d4ff] text-[#0c0a1d] font-display font-bold uppercase tracking-wider transition-all box-glow-cyan hover:bg-[#00d4ff]/90"
                  >
                    Start Predicting
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl glass glass-hover font-display font-bold uppercase tracking-wider text-white"
                  >
                    Learn More
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center"
            >
              <AnimatedPlane />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose <span className="text-[#00d4ff]">SkyFare AI</span>?
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Our AI-powered platform delivers the most accurate flight fare predictions 
              for the Indian aviation market.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group p-6 rounded-3xl glass glass-hover transition-all duration-300"
                style={{
                  boxShadow: `0 0 0 1px ${feature.color}20`,
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                  style={{
                    background: `${feature.color}15`,
                    boxShadow: `0 0 20px ${feature.color}20`,
                  }}
                >
                  <feature.icon
                    className="w-7 h-7"
                    style={{ color: feature.color }}
                  />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative p-12 rounded-3xl glass overflow-hidden text-center"
            style={{
              boxShadow: "0 0 60px rgba(0, 212, 255, 0.1)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/10 to-[#ff6b35]/10" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Predict?
              </h2>
              <p className="text-white/60 mb-8 max-w-lg mx-auto">
                Start using our AI model to get accurate fare predictions for your next trip.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/predict"
                  className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-gradient-to-r from-[#00d4ff] to-[#ff6b35] text-white font-display font-bold uppercase tracking-wider"
                >
                  Get Started Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="relative py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/40 text-sm">
            © 2024 SkyFare AI. Built with advanced machine learning for Indian aviation.
          </p>
        </div>
      </footer>
    </div>
  );
}
