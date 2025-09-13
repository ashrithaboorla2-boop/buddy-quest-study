import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Star, Zap, Heart } from "lucide-react";

interface Theme {
  id: string;
  name: string;
  gradient: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const themes: Theme[] = [
  {
    id: "marvel",
    name: "Marvel Heroes",
    gradient: "bg-gradient-to-br from-red-500 to-red-700",
    icon: <Zap className="w-8 h-8" />,
    description: "Unleash your inner superhero!",
    color: "text-red-600"
  },
  {
    id: "barbie",
    name: "Barbie Dreams",
    gradient: "bg-gradient-to-br from-pink-400 to-pink-600",
    icon: <Heart className="w-8 h-8" />,
    description: "Dream big, learn bigger!",
    color: "text-pink-600"
  },
  {
    id: "anime",
    name: "Anime Adventure",
    gradient: "bg-gradient-to-br from-blue-500 to-purple-600",
    icon: <Star className="w-8 h-8" />,
    description: "Your learning adventure awaits!",
    color: "text-blue-600"
  },
  {
    id: "sports",
    name: "Sports Champion",
    gradient: "bg-gradient-to-br from-green-500 to-emerald-600",
    icon: <Sparkles className="w-8 h-8" />,
    description: "Train your brain like a champion!",
    color: "text-green-600"
  }
];

interface HeroSectionProps {
  onThemeSelect: (theme: string) => void;
  selectedTheme?: string;
}

export default function HeroSection({ onThemeSelect, selectedTheme }: HeroSectionProps) {
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);

  return (
    <section className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-secondary/10 blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16 animate-fade-up">
          <h1 className="text-6xl md:text-8xl font-fredoka font-bold text-white mb-4 drop-shadow-lg">
            Gamify
            <span className="text-secondary">Ed</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your learning journey with AI-powered study companions, 
            personalized themes, and gamified progress tracking!
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span>AI Study Buddy</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white">
              <Star className="w-5 h-5 text-yellow-300" />
              <span>Gamified Learning</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white">
              <Heart className="w-5 h-5 text-pink-300" />
              <span>Wellness Breaks</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-fredoka font-bold text-white text-center mb-12">
            Choose Your Learning Adventure
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {themes.map((theme, index) => (
              <Card
                key={theme.id}
                className={`relative overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                  selectedTheme === theme.id ? 'ring-4 ring-white shadow-2xl' : ''
                } animate-bounce-in card-glass`}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
                onMouseEnter={() => setHoveredTheme(theme.id)}
                onMouseLeave={() => setHoveredTheme(null)}
                onClick={() => onThemeSelect(theme.id)}
              >
                <div className={`${theme.gradient} p-8 text-center text-white relative overflow-hidden`}>
                  <div className="relative z-10">
                    <div className="mb-4 flex justify-center">
                      {theme.icon}
                    </div>
                    <h3 className="text-xl font-fredoka font-bold mb-2">{theme.name}</h3>
                    <p className="text-sm opacity-90">{theme.description}</p>
                  </div>
                  
                  {/* Animated overlay */}
                  <div className={`absolute inset-0 bg-white/10 transform transition-transform duration-300 ${
                    hoveredTheme === theme.id ? 'translate-y-0' : 'translate-y-full'
                  }`} />
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-fredoka font-bold text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              disabled={!selectedTheme}
            >
              Start Learning Adventure
              <Sparkles className="ml-2 w-5 h-5" />
            </Button>
            
            {selectedTheme && (
              <p className="mt-4 text-white/80 text-lg animate-scale-in">
                Great choice! Ready to explore the {themes.find(t => t.id === selectedTheme)?.name} world?
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}