"use client";

import { motion } from "framer-motion";
import { Brain, Database, TrendingUp, Cpu, Shield, Zap, Github } from "lucide-react";
import Link from "next/link";

const techStack = [
  {
    icon: Brain,
    title: "Machine Learning Model",
    description: "Our prediction model is trained on historical flight data from major Indian airlines, incorporating multiple pricing factors.",
    color: "#00d4ff",
  },
  {
    icon: Database,
    title: "Data Sources",
    description: "Real-time data from SpiceJet, AirAsia, Vistara, GO FIRST, Indigo, and Air India covering all major Indian cities.",
    color: "#ff6b35",
  },
  {
    icon: TrendingUp,
    title: "Prediction Accuracy",
    description: "98.2% accuracy achieved through ensemble methods combining gradient boosting and neural networks.",
    color: "#00d4ff",
  },
  {
    icon: Cpu,
    title: "Real-time Processing",
    description: "Predictions generated in milliseconds using optimized algorithms and edge computing.",
    color: "#ff6b35",
  },
];

const features = [
  {
    title: "Airline Pricing Patterns",
    description: "Different airlines have distinct pricing strategies. Premium carriers like Vistara and Air India typically cost 25-30% more than budget airlines like SpiceJet and AirAsia.",
  },
  {
    title: "Time-based Factors",
    description: "Evening and morning flights are typically more expensive due to higher demand. Late night and early morning flights offer the best value.",
  },
  {
    title: "Booking Window",
    description: "Prices increase significantly in the last 3-7 days before departure. Booking 2-4 weeks ahead typically offers the best rates.",
  },
  {
    title: "Route Popularity",
    description: "High-traffic routes like Delhi-Mumbai or Bangalore-Delhi tend to have more competitive pricing due to higher frequency.",
  },
  {
    title: "Class Differentiation",
    description: "Business class fares are approximately 3.5x higher than economy, but offer more flexibility and amenities.",
  },
  {
    title: "Stop Configuration",
    description: "Non-stop flights command a premium of 20-30% over connecting flights due to convenience and time savings.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="text-[#00d4ff]">SkyFare AI</span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Understanding how our AI-powered flight fare prediction system works
          </p>
        </motion.div>

        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
              Our <span className="text-[#ff6b35]">Technology</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Powered by cutting-edge machine learning and real-time data processing
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {techStack.map((tech) => (
              <motion.div
                key={tech.title}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="glass rounded-3xl p-8 group"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                  style={{
                    background: `${tech.color}15`,
                    boxShadow: `0 0 30px ${tech.color}20`,
                  }}
                >
                  <tech.icon className="w-7 h-7" style={{ color: tech.color }} />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  {tech.title}
                </h3>
                <p className="text-white/50 leading-relaxed">{tech.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
              How <span className="text-[#00d4ff]">Predictions</span> Work
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Our model analyzes multiple factors to generate accurate fare estimates
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#00d4ff]/20 flex items-center justify-center">
                    <span className="text-[#00d4ff] font-mono font-bold text-sm">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-10 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/5 to-[#ff6b35]/5" />
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-[#00d4ff]" />
                <h2 className="font-display text-2xl font-bold text-white">
                  Data Privacy
                </h2>
              </div>
              <p className="text-white/60 max-w-2xl mx-auto mb-8">
                We take your privacy seriously. All predictions are processed locally in your browser 
                and stored in localStorage. We do not collect, store, or share any personal 
                flight search data on our servers.
              </p>
              <div className="flex justify-center gap-6 flex-wrap">
                {[
                  { icon: Zap, text: "No Server Storage" },
                  { icon: Shield, text: "Local Processing" },
                  { icon: Database, text: "Your Data Stays Yours" },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-2 text-white/50"
                  >
                    <item.icon className="w-4 h-4 text-[#00d4ff]" />
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-10 text-center"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to <span className="text-[#ff6b35]">Predict</span>?
            </h2>
            <p className="text-white/50 mb-8 max-w-lg mx-auto">
              Try our AI-powered flight fare prediction and make smarter travel decisions.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/predict"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#00d4ff] to-[#ff6b35] text-white font-display font-bold uppercase tracking-wider"
                >
                  Start Predicting
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="https://github.com/Koyeliya/Flight-Fare-Prediction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl glass font-display font-bold uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  View on GitHub
                </a>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
