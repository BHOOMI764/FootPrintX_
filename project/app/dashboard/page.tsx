'use client';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');

export default function DashboardPage() {
  interface DataItem {
    id: string;
    total_emissions: number;
    transportation: number;
    energy: number;
    waste: number;
    shopping: number;
    flights: number;
  }

  const [data, setData] = useState<DataItem[]>([]);

  const fetchData = async () => {
    const res = await axios.get('http://localhost:5000/api/calculate');
    setData(res.data);
  };

  useEffect(() => {
    fetchData();

    socket.on('newCalculation', (newEntry) => {
      setData((prev) => [newEntry, ...prev]);
    });

    return () => {
      socket.off('newCalculation');
    };
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Live Carbon Footprint Dashboard</h2>
      <ul className="space-y-2">
        {data.map((item) => (
          <li key={item.id} className="p-4 border rounded-md">
            <p><strong>Total Emissions:</strong> {item.total_emissions} kg CO₂e</p>
            <p>Transportation: {item.transportation} km/day</p>
            <p>Energy: {item.energy} kWh/month</p>
            <p>Waste: {item.waste} kg/week</p>
            <p>Shopping: ${item.shopping}/month</p>
            <p>Flights: {item.flights} hours/year</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
