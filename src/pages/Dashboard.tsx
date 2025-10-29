import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { mockDietPlan, mockWorkoutPlan, mockProgressData } from "@/data/mockData";
import { Flame, Drumstick, Apple, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Your personalized fitness overview
          </p>
        </div>

        {/* Stats Overview */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Calories</p>
                  <p className="text-3xl font-bold">{mockDietPlan.calories}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-neon flex items-center justify-center">
                  <Flame className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Protein</p>
                  <p className="text-3xl font-bold">{mockDietPlan.protein}g</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <Drumstick className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Carbs</p>
                  <p className="text-3xl font-bold">{mockDietPlan.carbs}g</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                  <Apple className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Water</p>
                  <p className="text-3xl font-bold">2.5L</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <Droplet className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Diet Plan */}
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Today's Meal Plan</span>
                <Button size="sm" className="bg-gradient-neon">
                  Regenerate
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockDietPlan.meals.map((meal, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl glass hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{meal.name}</h4>
                    <span className="text-sm text-muted-foreground">{meal.time}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {meal.items.map((item, i) => (
                      <span
                        key={i}
                        className="text-sm px-2 py-1 rounded-lg bg-white/5"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>{meal.calories} cal</span>
                    <span>P: {meal.protein}g</span>
                    <span>C: {meal.carbs}g</span>
                    <span>F: {meal.fats}g</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Workout Plan */}
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Workout Plan</span>
                <Button size="sm" className="bg-gradient-neon">
                  Regenerate
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  {mockWorkoutPlan.name}
                </p>
                <p className="text-lg font-semibold">{mockWorkoutPlan.duration}</p>
              </div>
              {mockWorkoutPlan.exercises.map((exercise, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl glass hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{exercise.name}</h4>
                    <span className="text-xs px-2 py-1 rounded-lg bg-gradient-neon">
                      {exercise.muscleGroup}
                    </span>
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>{exercise.sets} sets</span>
                    <span>{exercise.reps} reps</span>
                    <span>Rest: {exercise.rest}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Weekly Calories Chart */}
          <Card className="glass-card border-0 lg:col-span-2">
            <CardHeader>
              <CardTitle>Weekly Calorie Intake</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockProgressData.calories}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="value" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(217, 91%, 60%)" />
                      <stop offset="100%" stopColor="hsl(270, 80%, 65%)" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
