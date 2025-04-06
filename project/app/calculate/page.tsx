'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import {
  Car,
  Factory,
  Home,
  Plane,
  ShoppingBag,
  Trash2,
} from 'lucide-react';
import axios from 'axios';
 // for notifications

export default function CalculatePage() {
  const [transportation, setTransportation] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [waste, setWaste] = useState(0);
  const [shopping, setShopping] = useState(0);
  const [flights, setFlights] = useState(0);

  const totalEmissions = transportation + energy + waste + shopping + flights;

  // ✅ Save handler function
  const handleSave = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/calculate', {
        transportation,
        energy,
        waste,
        shopping,
        flights,
        totalEmissions,
      });

      if (response.status === 200) {
        console.log('Calculation saved successfully:', response.data);
     
      } else {
        console.warn('Unexpected server response:', response);
      
      }
    } catch (error: any) {
      console.error('Error saving calculation:', error);
      
    }
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Calculate Your Carbon Footprint</h1>
        <p className="mt-2 text-muted-foreground">
          Track your environmental impact by entering your consumption data below.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* --- Transportation Card --- */}
        <Card className="p-6">
          <div className="mb-6 flex items-center gap-4">
            <Car className="h-8 w-8 text-green-600" />
            <div>
              <h3 className="text-lg font-semibold">Transportation</h3>
              <p className="text-sm text-muted-foreground">
                Daily commute distance (km)
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <Slider
              value={[transportation]}
              onValueChange={(value) => setTransportation(value[0])}
              max={100}
              step={1}
            />
            <div className="flex justify-between text-sm">
              <span>{transportation} km/day</span>
              <span>{(transportation * 0.2).toFixed(1)} kg CO₂e/day</span>
            </div>
          </div>
        </Card>

        {/* --- Energy Usage Card --- */}
        <Card className="p-6">
          <div className="mb-6 flex items-center gap-4">
            <Home className="h-8 w-8 text-green-600" />
            <div>
              <h3 className="text-lg font-semibold">Energy Usage</h3>
              <p className="text-sm text-muted-foreground">
                Monthly electricity consumption (kWh)
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <Slider
              value={[energy]}
              onValueChange={(value) => setEnergy(value[0])}
              max={1000}
              step={10}
            />
            <div className="flex justify-between text-sm">
              <span>{energy} kWh/month</span>
              <span>{(energy * 0.5).toFixed(1)} kg CO₂e/month</span>
            </div>
          </div>
        </Card>

        {/* --- Waste Card --- */}
        <Card className="p-6">
          <div className="mb-6 flex items-center gap-4">
            <Trash2 className="h-8 w-8 text-green-600" />
            <div>
              <h3 className="text-lg font-semibold">Waste</h3>
              <p className="text-sm text-muted-foreground">
                Weekly waste production (kg)
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <Slider
              value={[waste]}
              onValueChange={(value) => setWaste(value[0])}
              max={50}
              step={0.5}
            />
            <div className="flex justify-between text-sm">
              <span>{waste} kg/week</span>
              <span>{(waste * 0.7).toFixed(1)} kg CO₂e/week</span>
            </div>
          </div>
        </Card>

        {/* --- Shopping Card --- */}
        <Card className="p-6">
          <div className="mb-6 flex items-center gap-4">
            <ShoppingBag className="h-8 w-8 text-green-600" />
            <div>
              <h3 className="text-lg font-semibold">Shopping</h3>
              <p className="text-sm text-muted-foreground">
                Monthly spending on new items ($)
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <Slider
              value={[shopping]}
              onValueChange={(value) => setShopping(value[0])}
              max={1000}
              step={10}
            />
            <div className="flex justify-between text-sm">
              <span>${shopping}/month</span>
              <span>{(shopping * 0.1).toFixed(1)} kg CO₂e/month</span>
            </div>
          </div>
        </Card>

        {/* --- Air Travel Card --- */}
        <Card className="p-6">
          <div className="mb-6 flex items-center gap-4">
            <Plane className="h-8 w-8 text-green-600" />
            <div>
              <h3 className="text-lg font-semibold">Air Travel</h3>
              <p className="text-sm text-muted-foreground">
                Flight hours per year
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <Slider
              value={[flights]}
              onValueChange={(value) => setFlights(value[0])}
              max={100}
              step={1}
            />
            <div className="flex justify-between text-sm">
              <span>{flights} hours/year</span>
              <span>{(flights * 90).toFixed(1)} kg CO₂e/year</span>
            </div>
          </div>
        </Card>
      </div>

      {/* --- Total Carbon Emissions Card --- */}
      <Card className="mt-8 p-6">
        <div className="mb-6 flex items-center gap-4">
          <Factory className="h-8 w-8 text-green-600" />
          <div>
            <h3 className="text-lg font-semibold">Total Carbon Footprint</h3>
            <p className="text-sm text-muted-foreground">
              Estimated annual emissions
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <Progress value={Math.min((totalEmissions / 1000) * 100, 100)} />
          <div className="flex justify-between text-sm">
            <span>Annual Total</span>
            <span className="font-semibold">{totalEmissions.toFixed(1)} kg CO₂e</span>
          </div>
        </div>
        <Button className="mt-6 w-full" onClick={handleSave}>
          Save Calculation
        </Button>
      </Card>
    </div>
  );
}
