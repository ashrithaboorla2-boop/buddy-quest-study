import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Target, 
  BookOpen, 
  Heart, 
  Zap, 
  Calendar,
  TrendingUp,
  Award,
  Clock,
  Star,
  Brain,
  Coffee
} from "lucide-react";

interface DashboardProps {
  theme: string;
  userLevel: 'kid' | 'student';
}

const achievements = [
  { id: 1, name: "First Upload", icon: "📚", unlocked: true, description: "Uploaded your first study material" },
  { id: 2, name: "Quiz Master", icon: "🧠", unlocked: true, description: "Completed 5 quizzes with 80%+ score" },
  { id: 3, name: "Streak Keeper", icon: "🔥", unlocked: false, description: "Study for 7 days in a row" },
  { id: 4, name: "Wellness Warrior", icon: "💚", unlocked: true, description: "Took 10 wellness breaks" },
  { id: 5, name: "Knowledge Seeker", icon: "⭐", unlocked: false, description: "Ask AI buddy 50 questions" },
  { id: 6, name: "Time Manager", icon: "⏰", unlocked: false, description: "Complete study session under target time" }
];

const studyStats = {
  totalStudyTime: 24.5,
  completedQuizzes: 12,
  averageScore: 87,
  currentStreak: 3,
  wellnessBreaks: 8,
  aiInteractions: 23
};

const recentActivities = [
  { type: 'quiz', subject: 'Mathematics', score: 92, time: '2 hours ago' },
  { type: 'wellness', activity: 'Breathing Exercise', time: '3 hours ago' },
  { type: 'upload', subject: 'Physics Notes', time: '1 day ago' },
  { type: 'chat', subject: 'Study Tips Discussion', time: '1 day ago' }
];

export default function Dashboard({ theme, userLevel }: DashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'all'>('week');

  const getThemeColors = () => {
    switch (theme) {
      case 'marvel': return { primary: 'text-red-600', bg: 'bg-red-50' };
      case 'barbie': return { primary: 'text-pink-600', bg: 'bg-pink-50' };
      case 'anime': return { primary: 'text-blue-600', bg: 'bg-blue-50' };
      case 'sports': return { primary: 'text-green-600', bg: 'bg-green-50' };
      default: return { primary: 'text-purple-600', bg: 'bg-purple-50' };
    }
  };

  const colors = getThemeColors();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-fredoka font-bold">
            Your Learning Journey
          </h1>
          <p className="text-xl text-muted-foreground">
            {userLevel === 'kid' ? 'Keep up the amazing work, superstar!' : 'Track your progress and achieve your goals!'}
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 card-glass animate-scale-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Study Time</p>
                <p className="text-3xl font-bold">{studyStats.totalStudyTime}h</p>
              </div>
              <div className="p-3 bg-gradient-primary rounded-full">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 card-glass animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Quizzes Done</p>
                <p className="text-3xl font-bold">{studyStats.completedQuizzes}</p>
              </div>
              <div className="p-3 bg-gradient-secondary rounded-full">
                <Brain className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 card-glass animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                <p className="text-3xl font-bold">{studyStats.averageScore}%</p>
              </div>
              <div className="p-3 bg-gradient-success rounded-full">
                <Target className="w-6 h-6 text-white" />  
              </div>
            </div>
          </Card>

          <Card className="p-6 card-glass animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Study Streak</p>
                <p className="text-3xl font-bold">{studyStats.currentStreak} days</p>
              </div>
              <div className="p-3 bg-orange-500 rounded-full">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Progress Chart */}
          <div className="lg:col-span-2">
            <Card className="p-6 card-glass">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-fredoka font-bold">Weekly Progress</h3>
                <div className="flex gap-2">
                  {(['week', 'month', 'all'] as const).map((period) => (
                    <Button
                      key={period}
                      variant={selectedPeriod === period ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedPeriod(period)}
                      className="capitalize"
                    >
                      {period}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Mathematics</span>
                  <span className="text-sm text-muted-foreground">85%</span>
                </div>
                <Progress value={85} className="h-3" />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Science</span>
                  <span className="text-sm text-muted-foreground">92%</span>
                </div>
                <Progress value={92} className="h-3" />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">English</span>
                  <span className="text-sm text-muted-foreground">78%</span>
                </div>
                <Progress value={78} className="h-3" />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">History</span>
                  <span className="text-sm text-muted-foreground">94%</span>
                </div>
                <Progress value={94} className="h-3" />
              </div>

              <div className="mt-6 p-4 bg-gradient-primary/10 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-primary">Trending Up!</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your performance improved by 12% this week. Keep up the excellent work!
                </p>
              </div>
            </Card>
          </div>

          {/* Achievements */}
          <Card className="p-6 card-glass">
            <h3 className="text-2xl font-fredoka font-bold mb-6 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              Achievements
            </h3>
            
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-3 rounded-lg border transition-all duration-300 ${
                    achievement.unlocked
                      ? 'bg-gradient-primary/10 border-primary/20 shadow-sm'
                      : 'bg-muted/30 border-muted opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-sm">{achievement.name}</h4>
                        {achievement.unlocked && (
                          <Badge variant="secondary" className="text-xs">
                            Unlocked!
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                {achievements.filter(a => a.unlocked).length} of {achievements.length} unlocked
              </p>
              <Progress 
                value={(achievements.filter(a => a.unlocked).length / achievements.length) * 100} 
                className="h-2"
              />
            </div>
          </Card>
        </div>

        {/* Recent Activities & Wellness */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-6 card-glass">
            <h3 className="text-2xl font-fredoka font-bold mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              Recent Activities
            </h3>
            
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                  <div className="p-2 bg-gradient-primary rounded-full">
                    {activity.type === 'quiz' && <Brain className="w-4 h-4 text-white" />}
                    {activity.type === 'wellness' && <Heart className="w-4 h-4 text-white" />}
                    {activity.type === 'upload' && <BookOpen className="w-4 h-4 text-white" />}
                    {activity.type === 'chat' && <Star className="w-4 h-4 text-white" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.subject}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  {activity.type === 'quiz' && (
                    <Badge variant="secondary">{(activity as any).score}%</Badge>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 card-glass">
            <h3 className="text-2xl font-fredoka font-bold mb-6 flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500" />
              Wellness Dashboard
            </h3>
            
            <div className="space-y-6">
              <div className="text-center p-4 bg-gradient-success/10 rounded-lg">
                <div className="text-3xl mb-2">🧘‍♀️</div>
                <p className="font-semibold">Wellness Score</p>
                <p className="text-2xl font-bold text-success">85%</p>
                <p className="text-sm text-muted-foreground">Excellent balance!</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Daily Breaks</span>
                  <span className="text-sm text-muted-foreground">3/5</span>
                </div>
                <Progress value={60} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Hydration</span>
                  <span className="text-sm text-muted-foreground">6/8 glasses</span>
                </div>
                <Progress value={75} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Sleep Quality</span>
                  <span className="text-sm text-muted-foreground">8/10</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>

              <Button className="w-full btn-hover-lift bg-gradient-success">
                <Coffee className="w-4 h-4 mr-2" />
                Take a Wellness Break
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}