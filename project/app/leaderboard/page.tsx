'use client';

import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Medal, Award, Users } from 'lucide-react';

const leaderboardData = [
  {
    rank: 1,
    name: 'Sarah Johnson',
    points: 2840,
    reduction: 45.2,
    badge: 'Eco Warrior',
  },
  {
    rank: 2,
    name: 'Michael Chen',
    points: 2560,
    reduction: 42.8,
    badge: 'Climate Champion',
  },
  {
    rank: 3,
    name: 'Emma Davis',
    points: 2340,
    reduction: 38.5,
    badge: 'Green Guardian',
  },
  {
    rank: 4,
    name: 'James Wilson',
    points: 2120,
    reduction: 35.2,
    badge: 'Earth Defender',
  },
  {
    rank: 5,
    name: 'Lisa Anderson',
    points: 1980,
    reduction: 32.6,
    badge: 'Sustainability Star',
  },
];

export default function LeaderboardPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Carbon Champions Leaderboard</h1>
        <p className="mt-2 text-muted-foreground">
          Celebrating our top contributors in the fight against climate change
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-4">
        <Card className="col-span-3 divide-y">
          {leaderboardData.map((user) => (
            <div key={user.rank} className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-600/10 text-green-600">
                {user.rank === 1 && <Trophy className="h-6 w-6" />}
                {user.rank === 2 && <Medal className="h-6 w-6" />}
                {user.rank === 3 && <Award className="h-6 w-6" />}
                {user.rank > 3 && <span className="text-lg font-bold">{user.rank}</span>}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{user.name}</h3>
                  <span className="text-sm font-medium">{user.points} points</span>
                </div>
                <div className="mt-2">
                  <Progress value={user.reduction} className="h-2" />
                  <div className="mt-1 flex justify-between text-sm text-muted-foreground">
                    <span>{user.badge}</span>
                    <span>{user.reduction}% reduction</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Card>

        <Card className="p-6">
          <div className="mb-6 flex items-center gap-4">
            <Users className="h-8 w-8 text-green-600" />
            <div>
              <h3 className="text-lg font-semibold">Your Stats</h3>
              <p className="text-sm text-muted-foreground">Current ranking</p>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground">Your Rank</p>
              <p className="text-2xl font-bold">#12</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Points</p>
              <p className="text-2xl font-bold">1,450</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">CO₂ Reduction</p>
              <p className="text-2xl font-bold">28.5%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Badge</p>
              <p className="text-2xl font-bold">Rising Star</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}