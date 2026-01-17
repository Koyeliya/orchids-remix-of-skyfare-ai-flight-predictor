"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import {
  Plane,
  ArrowLeftRight,
  Clock,
  Calendar,
  Loader2,
  TrendingUp,
  Check,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const airlines = [
  "SpiceJet",
  "AirAsia",
  "Vistara",
  "GO_FIRST",
  "Indigo",
  "Air_India",
];

const cities = ["Delhi", "Mumbai", "Bangalore", "Kolkata", "Hyderabad", "Chennai"];

const departureTimes = [
  { value: "Early_Morning", label: "Early Morning" },
  { value: "Morning", label: "Morning" },
  { value: "Afternoon", label: "Afternoon" },
  { value: "Evening", label: "Evening" },
  { value: "Night", label: "Night" },
  { value: "Late_Night", label: "Late Night" },
];

const stops = [
  { value: "zero", label: "Non-stop" },
  { value: "one", label: "1 Stop" },
  { value: "two_or_more", label: "2+ Stops" },
];

const travelClasses = [
  { value: "Economy", label: "Economy" },
  { value: "Business", label: "Business" },
];

interface PredictionResult {
  price: number;
  currency: string;
  confidence: number;
  details: {
    airline: string;
    route: string;
    stops: string;
    class: string;
    departure_time: string;
    arrival_time: string;
    duration: string;
    days_left: string;
  };
}

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

export default function PredictPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  
  const [airline, setAirline] = useState("");
  const [sourceCity, setSourceCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [stopsValue, setStopsValue] = useState("");
  const [travelClass, setTravelClass] = useState("");
  const [duration, setDuration] = useState("");
  const [daysLeft, setDaysLeft] = useState("");

  const swapCities = () => {
    const temp = sourceCity;
    setSourceCity(destinationCity);
    setDestinationCity(temp);
  };

  const savePrediction = (prediction: PredictionResult) => {
    const history: PredictionHistory[] = JSON.parse(
      localStorage.getItem("predictions") || "[]"
    );
    
    const newEntry: PredictionHistory = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      airline: prediction.details.airline,
      route: prediction.details.route,
      stops: prediction.details.stops,
      travelClass: prediction.details.class,
      departureTime: prediction.details.departure_time,
      price: prediction.price,
    };
    
    history.unshift(newEntry);
    localStorage.setItem("predictions", JSON.stringify(history.slice(0, 50)));
  };

  const handleSubmit = async () => {
    if (!airline || !sourceCity || !destinationCity || !departureTime || !arrivalTime || !stopsValue || !travelClass || !duration || !daysLeft) {
      toast.error("Please fill in all fields");
      return;
    }

    if (sourceCity === destinationCity) {
      toast.error("Source and destination cities must be different");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          airline,
          source_city: sourceCity,
          destination_city: destinationCity,
          departure_time: departureTime,
          arrival_time: arrivalTime,
          stops: stopsValue,
          travel_class: travelClass,
          duration,
          days_left: daysLeft,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult(data);
        savePrediction(data);
        toast.success("Prediction generated successfully!");
      } else {
        toast.error(data.error || "Failed to generate prediction");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Predict Your <span className="text-[#00d4ff]">Flight Fare</span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Enter your flight details below to get an AI-powered price prediction
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-3xl p-8 space-y-6"
          >
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest text-white/60">
                Airline
              </Label>
              <Select value={airline} onValueChange={setAirline}>
                <SelectTrigger className="glass border-white/10 text-white h-12 rounded-xl">
                  <SelectValue placeholder="Select airline" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1730] border-white/10">
                  {airlines.map((a) => (
                    <SelectItem key={a} value={a} className="text-white hover:bg-white/10">
                      {a.replace(/_/g, " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end gap-3">
              <div className="flex-1 space-y-2">
                <Label className="text-xs uppercase tracking-widest text-white/60">
                  Source City
                </Label>
                <Select value={sourceCity} onValueChange={setSourceCity}>
                  <SelectTrigger className="glass border-white/10 text-white h-12 rounded-xl">
                    <SelectValue placeholder="From" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1730] border-white/10">
                    {cities.map((c) => (
                      <SelectItem key={c} value={c} className="text-white hover:bg-white/10">
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={swapCities}
                className="w-12 h-12 rounded-full glass flex items-center justify-center text-[#00d4ff] hover:bg-[#00d4ff]/20 transition-colors flex-shrink-0"
              >
                <ArrowLeftRight className="w-5 h-5" />
              </motion.button>

              <div className="flex-1 space-y-2">
                <Label className="text-xs uppercase tracking-widest text-white/60">
                  Destination City
                </Label>
                <Select value={destinationCity} onValueChange={setDestinationCity}>
                  <SelectTrigger className="glass border-white/10 text-white h-12 rounded-xl">
                    <SelectValue placeholder="To" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1730] border-white/10">
                    {cities.map((c) => (
                      <SelectItem key={c} value={c} className="text-white hover:bg-white/10">
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-widest text-white/60 flex items-center gap-2">
                  <Clock className="w-3 h-3" /> Departure Time
                </Label>
                <Select value={departureTime} onValueChange={setDepartureTime}>
                  <SelectTrigger className="glass border-white/10 text-white h-12 rounded-xl">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1730] border-white/10">
                    {departureTimes.map((t) => (
                      <SelectItem key={t.value} value={t.value} className="text-white hover:bg-white/10">
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-widest text-white/60 flex items-center gap-2">
                  <Clock className="w-3 h-3" /> Arrival Time
                </Label>
                <Select value={arrivalTime} onValueChange={setArrivalTime}>
                  <SelectTrigger className="glass border-white/10 text-white h-12 rounded-xl">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1730] border-white/10">
                    {departureTimes.map((t) => (
                      <SelectItem key={t.value} value={t.value} className="text-white hover:bg-white/10">
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-widest text-white/60">
                  Stops
                </Label>
                <Select value={stopsValue} onValueChange={setStopsValue}>
                  <SelectTrigger className="glass border-white/10 text-white h-12 rounded-xl">
                    <SelectValue placeholder="Select stops" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1730] border-white/10">
                    {stops.map((s) => (
                      <SelectItem key={s.value} value={s.value} className="text-white hover:bg-white/10">
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-widest text-white/60">
                  Class
                </Label>
                <Select value={travelClass} onValueChange={setTravelClass}>
                  <SelectTrigger className="glass border-white/10 text-white h-12 rounded-xl">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1730] border-white/10">
                    {travelClasses.map((c) => (
                      <SelectItem key={c.value} value={c.value} className="text-white hover:bg-white/10">
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-widest text-white/60">
                  Duration (hours)
                </Label>
                <Input
                  type="number"
                  step="0.5"
                  min="0.5"
                  placeholder="e.g., 2.5"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="glass border-white/10 text-white h-12 rounded-xl placeholder:text-white/30"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-widest text-white/60 flex items-center gap-2">
                  <Calendar className="w-3 h-3" /> Days Left
                </Label>
                <Input
                  type="number"
                  min="1"
                  placeholder="e.g., 15"
                  value={daysLeft}
                  onChange={(e) => setDaysLeft(e.target.value)}
                  className="glass border-white/10 text-white h-12 rounded-xl placeholder:text-white/30"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#00d4ff] to-[#ff6b35] text-white font-display font-bold uppercase tracking-wider flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <TrendingUp className="w-5 h-5" />
                  Predict Fare Price
                </>
              )}
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass rounded-3xl p-8 neon-border-cyan"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-xl font-bold text-white">
                      Prediction Result
                    </h2>
                    <div className="flex items-center gap-2 text-[#00d4ff]">
                      <Check className="w-5 h-5" />
                      <span className="text-sm font-mono">
                        {(result.confidence * 100).toFixed(0)}% confident
                      </span>
                    </div>
                  </div>

                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 mb-2">
                      <Plane className="w-6 h-6 text-[#00d4ff]" />
                      <span className="text-white/60 text-sm uppercase tracking-wider">
                        Estimated Fare
                      </span>
                    </div>
                    <div className="font-display text-5xl md:text-6xl font-bold text-white">
                      <span className="text-[#ff6b35]">₹</span>
                      {result.price.toLocaleString("en-IN")}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Airline", value: result.details.airline.replace(/_/g, " ") },
                      { label: "Route", value: result.details.route },
                      { label: "Stops", value: result.details.stops },
                      { label: "Class", value: result.details.class },
                      { label: "Departure", value: result.details.departure_time },
                      { label: "Arrival", value: result.details.arrival_time },
                      { label: "Duration", value: result.details.duration },
                      { label: "Days Left", value: result.details.days_left },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="bg-white/5 rounded-xl p-3"
                      >
                        <div className="text-xs uppercase tracking-wider text-white/40 mb-1">
                          {item.label}
                        </div>
                        <div className="text-white font-medium text-sm">
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass rounded-3xl p-8 h-full min-h-[400px] flex flex-col items-center justify-center"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Plane className="w-16 h-16 text-white/20 mb-4" />
                  </motion.div>
                  <h3 className="font-display text-xl font-bold text-white/40 mb-2">
                    Ready to Predict
                  </h3>
                  <p className="text-white/30 text-center text-sm max-w-xs">
                    Fill in your flight details and click predict to get an estimated fare
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="glass rounded-3xl p-6">
              <h3 className="font-display text-sm font-bold text-white/60 uppercase tracking-wider mb-3">
                Pricing Factors
              </h3>
              <div className="space-y-2 text-sm text-white/50">
                <p>• Premium airlines (Vistara, Air India) have higher base fares</p>
                <p>• Non-stop flights cost more than connecting flights</p>
                <p>• Business class is approximately 5-6x economy</p>
                <p>• Last-minute bookings have surge pricing</p>
                <p>• Peak departure times (evening) cost more</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
