"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plane, Trash2, Clock, ArrowRight, History } from "lucide-react";
import Link from "next/link";

interface PredictionHistory {
  id: string;
  date: string;
  airline: string;
  route: string;
  stops: string;
  travelClass: string;
  departureTime: string;
  price: number;
}

export default function HistoryPage() {
  const [predictions, setPredictions] = useState<PredictionHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("predictions");
    if (stored) {
      setPredictions(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const deletePrediction = (id: string) => {
    const updated = predictions.filter((p) => p.id !== id);
    setPredictions(updated);
    localStorage.setItem("predictions", JSON.stringify(updated));
    toast.success("Prediction deleted");
  };

  const clearAll = () => {
    setPredictions([]);
    localStorage.removeItem("predictions");
    toast.success("All predictions cleared");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00d4ff]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12"
        >
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-2">
              Prediction <span className="text-[#00d4ff]">History</span>
            </h1>
            <p className="text-white/60">
              {predictions.length > 0
                ? `${predictions.length} prediction${predictions.length > 1 ? "s" : ""} saved`
                : "No predictions yet"}
            </p>
          </div>

          {predictions.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearAll}
              className="px-6 py-3 rounded-xl glass text-[#ff6b35] font-medium uppercase tracking-wider text-sm hover:bg-[#ff6b35]/10 transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </motion.button>
          )}
        </motion.div>

        <AnimatePresence mode="popLayout">
          {predictions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass rounded-3xl p-16 text-center"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <History className="w-20 h-20 text-white/20 mx-auto mb-6" />
              </motion.div>
              <h2 className="font-display text-2xl font-bold text-white/40 mb-4">
                No Predictions Yet
              </h2>
              <p className="text-white/30 mb-8 max-w-md mx-auto">
                Your prediction history will appear here once you start predicting flight fares.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/predict"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#00d4ff] text-[#0c0a1d] font-display font-bold uppercase tracking-wider"
                >
                  Start Predicting
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {predictions.map((prediction, index) => (
                <motion.div
                  key={prediction.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass rounded-2xl p-6 group hover:bg-white/10 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#00d4ff]/10 flex items-center justify-center flex-shrink-0">
                        <Plane className="w-6 h-6 text-[#00d4ff]" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="font-display font-bold text-white">
                            {prediction.airline.replace(/_/g, " ")}
                          </span>
                          <span className="text-white/40">•</span>
                          <span className="text-white/80">{prediction.route}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-white/50">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {prediction.departureTime}
                          </span>
                          <span>{prediction.stops}</span>
                          <span className="text-[#00d4ff]">{prediction.travelClass}</span>
                        </div>
                        <div className="text-xs text-white/30 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(prediction.date)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-xs uppercase tracking-wider text-white/40 mb-1">
                          Predicted Fare
                        </div>
                        <div className="font-display text-2xl font-bold text-white">
                          <span className="text-[#ff6b35]">₹</span>
                          {prediction.price.toLocaleString("en-IN")}
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deletePrediction(prediction.id)}
                        className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/40 hover:text-[#ff6b35] hover:bg-[#ff6b35]/10 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
