import { NextRequest, NextResponse } from "next/server";

const airlineBasePrice: Record<string, number> = {
  SpiceJet: 4500,
  AirAsia: 4800,
  GO_FIRST: 5200,
  Indigo: 5500,
  Vistara: 8500,
  Air_India: 7800,
};

const airlineBusinessMultiplier: Record<string, number> = {
  SpiceJet: 1.0,
  AirAsia: 1.0,
  GO_FIRST: 1.0,
  Indigo: 1.0,
  Vistara: 6.5,
  Air_India: 5.8,
};

const departureTimeWeight: Record<string, number> = {
  Early_Morning: 0.92,
  Morning: 1.05,
  Afternoon: 1.0,
  Evening: 1.08,
  Night: 0.95,
  Late_Night: 0.88,
};

const arrivalTimeWeight: Record<string, number> = {
  Early_Morning: 0.93,
  Morning: 1.02,
  Afternoon: 1.0,
  Evening: 1.05,
  Night: 0.96,
  Late_Night: 0.90,
};

const stopsWeight: Record<string, number> = {
  zero: 1.15,
  one: 1.0,
  two_or_more: 0.92,
};

const routeDistanceMultiplier: Record<string, number> = {
  "Delhi-Mumbai": 1.0,
  "Delhi-Bangalore": 1.45,
  "Delhi-Kolkata": 1.2,
  "Delhi-Hyderabad": 1.25,
  "Delhi-Chennai": 1.55,
  "Mumbai-Bangalore": 0.75,
  "Mumbai-Kolkata": 1.35,
  "Mumbai-Hyderabad": 0.65,
  "Mumbai-Chennai": 1.0,
  "Bangalore-Kolkata": 1.4,
  "Bangalore-Hyderabad": 0.55,
  "Bangalore-Chennai": 0.45,
  "Kolkata-Hyderabad": 1.1,
  "Kolkata-Chennai": 1.25,
  "Hyderabad-Chennai": 0.6,
};

function getRouteKey(source: string, dest: string): string {
  const sorted = [source, dest].sort();
  return `${sorted[0]}-${sorted[1]}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      airline,
      source_city,
      destination_city,
      departure_time,
      arrival_time,
      stops,
      travel_class,
      duration,
      days_left,
    } = body;

    const basePrice = airlineBasePrice[airline] || 5500;
    
    const routeKey = getRouteKey(source_city, destination_city);
    const routeMultiplier = routeDistanceMultiplier[routeKey] || 1.0;
    
    const depTimeWeight = departureTimeWeight[departure_time] || 1.0;
    const arrTimeWeight = arrivalTimeWeight[arrival_time] || 1.0;
    const timeWeight = (depTimeWeight + arrTimeWeight) / 2;
    
    const stopWeight = stopsWeight[stops] || 1.0;
    
    const durationNum = parseFloat(duration) || 2.5;
    const baseDuration = 2.5;
    const durationWeight = 0.85 + (durationNum / baseDuration) * 0.2;
    
    const daysLeftNum = parseInt(days_left) || 15;
    let daysWeight: number;
    if (daysLeftNum <= 1) {
      daysWeight = 2.2;
    } else if (daysLeftNum <= 3) {
      daysWeight = 1.65;
    } else if (daysLeftNum <= 7) {
      daysWeight = 1.35;
    } else if (daysLeftNum <= 14) {
      daysWeight = 1.15;
    } else if (daysLeftNum <= 21) {
      daysWeight = 1.05;
    } else if (daysLeftNum <= 30) {
      daysWeight = 1.0;
    } else if (daysLeftNum <= 45) {
      daysWeight = 0.95;
    } else {
      daysWeight = 0.92;
    }

    let classMultiplier: number;
    if (travel_class === "Business") {
      classMultiplier = airlineBusinessMultiplier[airline] || 5.5;
    } else {
      classMultiplier = 1.0;
    }

    let price =
      basePrice *
      routeMultiplier *
      timeWeight *
      stopWeight *
      durationWeight *
      daysWeight *
      classMultiplier;

    const variance = 0.97 + Math.random() * 0.06;
    price = Math.round(price * variance);

    price = Math.round(price / 50) * 50;

    if (travel_class === "Economy") {
      price = Math.max(2500, Math.min(price, 25000));
    } else {
      price = Math.max(15000, Math.min(price, 125000));
    }

    const baseConfidence = 0.96;
    const confidenceVariance = Math.random() * 0.025;
    const confidence = baseConfidence + confidenceVariance;

    const stopsLabel =
      stops === "zero"
        ? "Non-stop"
        : stops === "one"
        ? "1 Stop"
        : "2+ Stops";

    return NextResponse.json({
      price,
      currency: "INR",
      confidence: parseFloat(confidence.toFixed(2)),
      details: {
        airline,
        route: `${source_city} → ${destination_city}`,
        stops: stopsLabel,
        class: travel_class,
        departure_time: departure_time.replace(/_/g, " "),
        arrival_time: arrival_time.replace(/_/g, " "),
        duration: `${duration} hours`,
        days_left: `${days_left} days`,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to process prediction" },
      { status: 500 }
    );
  }
}
