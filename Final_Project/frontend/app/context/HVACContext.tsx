"use client";
import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import sampleBuilding from "../../data/sampleBuilding";
import api from "../../services/api";

interface HVACContextType {
  status: string;
  confidence: string;
  timestamp: string;
  ticket: string;
  energy: string;
  sensorData: any;
  isMonitoringActive: boolean;
  startMonitoring: () => Promise<void>;
}

const HVACContext = createContext<HVACContextType | undefined>(undefined);

export const HVACProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState("Not Monitoring");
  const [confidence, setConfidence] = useState("--");
  const [timestamp, setTimestamp] = useState("--");
  const [ticket, setTicket] = useState("No Ticket");
  const [energy, setEnergy] = useState("--");
  const [sensorData, setSensorData] = useState<any>(null);
  const [isMonitoringActive, setIsMonitoringActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startMonitoring = async () => {
    if (intervalRef.current) return;
    setIsMonitoringActive(true);
    try {
      const energyResponse = await api.post("/predict/energy", sampleBuilding);
      setEnergy(`${Number(energyResponse.data.predicted_energy).toFixed(2)} kWh`);
    } catch (err) {
      console.error("Error predicting initial energy:", err);
    }
    intervalRef.current = setInterval(async () => {
      try {
        const response = await api.get("/simulate/next");
        const data = response.data;
        const prediction = data.prediction;

        setStatus(prediction);
        setConfidence(`${data.confidence}%`);
        setTimestamp(data.timestamp);
        setSensorData(data.sensor_data);

        if (prediction === "Healthy") {
          setTicket("No Maintenance Required");
        } else {
          setTicket("Maintenance Ticket Generated");
        }
      } catch (err) {
        console.error("Simulation poll error:", err);
      }
    }, 2000);
  };

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <HVACContext.Provider
      value={{
        status,
        confidence,
        timestamp,
        ticket,
        energy,
        sensorData,
        isMonitoringActive,
        startMonitoring,
      }}
    >
      {children}
    </HVACContext.Provider>
  );
};

export const useHVAC = () => {
  const context = useContext(HVACContext);
  if (!context) {
    throw new Error("useHVAC must be used within a HVACProvider");
  }
  return context;
};
