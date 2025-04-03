'use client';

import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  BarChart,
  Car,
  Factory,
  Leaf,
  LightbulbOff,
  Recycle,
  TreePine,
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="container py-8">
      <h1 className="mb-8 text-4xl font-bold">Carbon Footprint Dashboard</h1>

      {/* Overview Cards */}
      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Carbon Footprint</p>
              <h3 className="mt-2 text-2xl font-bold">4.2 tons CO₂e</h3>
            </div>
            <Factory className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="mt-4">
            <p className="mb-2 text-sm text-muted-foreground">Monthly Target</p>
            <Progress value={65} className="h-2" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Carbon Credits</p>
              <h3 className="mt-2 text-2xl font-bold">245 points</h3>
            </div>
            <Leaf className="h-8 w-8 text-green-600" />
          </div>
          <div className="mt-4">
            <p className="mb-2 text-sm text-muted-foreground">Level Progress</p>
            <Progress value={45} className="h-2" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Trees Planted</p>
              <h3 className="mt-2 text-2xl font-bold">12 trees</h3>
            </div>
            <TreePine className="h-8 w-8 text-green-600" />
          </div>
          <div className="mt-4">
            <p className="mb-2 text-sm text-muted-foreground">Monthly Goal</p>
            <Progress value={80} className="h-2" />
          </div>
        </Card>
      </div>

      {/* Emission Sources */}
      <h2 className="mb-4 text-2xl font-bold">Emission Sources</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Car className="h-8 w-8 text-muted-foreground" />
            <div className="flex-1">
              <h4 className="font-semibold">Transportation</h4>
              <p className="text-sm text-muted-foreground">1.8 tons CO₂e</p>
            </div>
            <span className="text-destructive">+12%</span>
          </div>
          <Progress value={42} className="mt-4 h-2" />
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <LightbulbOff className="h-8 w-8 text-muted-foreground" />
            <div className="flex-1">
              <h4 className="font-semibold">Energy Usage</h4>
              <p className="text-sm text-muted-foreground">1.4 tons CO₂e</p>
            </div>
            <span className="text-green-600">-8%</span>
          </div>
          <Progress value={35} className="mt-4 h-2" />
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Recycle className="h-8 w-8 text-muted-foreground" />
            <div className="flex-1">
              <h4 className="font-semibold">Waste</h4>
              <p className="text-sm text-muted-foreground">0.6 tons CO₂e</p>
            </div>
            <span className="text-green-600">-15%</span>
          </div>
          <Progress value={15} className="mt-4 h-2" />
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <BarChart className="h-8 w-8 text-muted-foreground" />
            <div className="flex-1">
              <h4 className="font-semibold">Digital Usage</h4>
              <p className="text-sm text-muted-foreground">0.4 tons CO₂e</p>
            </div>
            <span className="text-destructive">+5%</span>
          </div>
          <Progress value={8} className="mt-4 h-2" />
        </Card>
      </div>
    </div>
  );
}