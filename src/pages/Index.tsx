import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Upload, BarChart3, Sparkles, Brain, Heart } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import AIChat from "@/components/AIChat";
import FileUpload from "@/components/FileUpload";
import Dashboard from "@/components/Dashboard";

type AppState = 'welcome' | 'upload' | 'dashboard' | 'chat';
type UserLevel = 'kid' | 'student';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
}

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('welcome');
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [userLevel, setUserLevel] = useState<UserLevel>('student');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleThemeSelect = (theme: string) => {
    setSelectedTheme(theme);
  };

  const handleStartLearning = () => {
    if (selectedTheme) {
      setCurrentState('upload');
    }
  };

  const handleFilesProcessed = (files: UploadedFile[]) => {
    setUploadedFiles(files);
    // Auto-transition to dashboard after files are processed
    setTimeout(() => {
      setCurrentState('dashboard');
    }, 2000);
  };

  const getNavigation = () => (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-fredoka font-bold text-xl">
            Gamify<span className="text-secondary">Ed</span>
          </span>
        </div>

        {currentState !== 'welcome' && (
          <div className="flex items-center gap-4">
            <Button
              variant={currentState === 'upload' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCurrentState('upload')}
              className="btn-hover-lift"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
            <Button
              variant={currentState === 'dashboard' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCurrentState('dashboard')}
              className="btn-hover-lift"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsChatOpen(true)}
              className="btn-hover-lift"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              AI Buddy
            </Button>
          </div>
        )}
      </div>
    </nav>
  );

  const getFloatingActionButton = () => (
    <>
      {currentState !== 'welcome' && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            size="lg"
            onClick={() => setIsChatOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-primary shadow-primary animate-pulse-glow btn-hover-lift"
          >
            <MessageCircle className="w-6 h-6 text-white" />
          </Button>
        </div>
      )}
    </>
  );

  const renderWelcomeScreen = () => (
    <div className="relative">
      <HeroSection 
        onThemeSelect={handleThemeSelect} 
        selectedTheme={selectedTheme} 
      />
      
      {selectedTheme && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-in">
          <Button
            size="lg"
            onClick={handleStartLearning}
            className="bg-white text-primary hover:bg-white/90 font-fredoka font-bold text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Start Learning Adventure
            <Sparkles className="ml-2 w-5 h-5" />
          </Button>
        </div>
      )}

      {/* User Level Selection */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-4 animate-fade-up">
        <Button
          variant={userLevel === 'kid' ? 'default' : 'outline'}
          onClick={() => setUserLevel('kid')}
          className="btn-hover-lift"
        >
          <Heart className="w-4 h-4 mr-2" />
          Kid Mode
        </Button>
        <Button
          variant={userLevel === 'student' ? 'default' : 'outline'}
          onClick={() => setUserLevel('student')}
          className="btn-hover-lift"
        >
          <Brain className="w-4 h-4 mr-2" />
          Student Mode
        </Button>
      </div>
    </div>
  );

  const renderUploadScreen = () => (
    <div className="min-h-screen pt-20 pb-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <FileUpload 
            theme={selectedTheme} 
            onFilesProcessed={handleFilesProcessed}
          />
          
          {uploadedFiles.length > 0 && (
            <div className="mt-8 text-center">
              <Button
                size="lg"
                onClick={() => setCurrentState('dashboard')}
                className="btn-hover-lift"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                View Progress Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderDashboardScreen = () => (
    <div className="pt-16">
      <Dashboard theme={selectedTheme} userLevel={userLevel} />
    </div>
  );

  return (
    <main className="min-h-screen bg-background">
      {/* SEO structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "GamifyEd",
          "description": "AI-powered personalized learning platform with gamification and wellness features",
          "applicationCategory": "EducationApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "AI tutoring chatbot",
            "Document processing and quiz generation",
            "Gamified learning progress",
            "Wellness and mindfulness features",
            "Personalized themes and experiences"
          ]
        })}
      </script>

      {getNavigation()}
      
      {currentState === 'welcome' && renderWelcomeScreen()}
      {currentState === 'upload' && renderUploadScreen()}
      {currentState === 'dashboard' && renderDashboardScreen()}
      
      {getFloatingActionButton()}

      {/* AI Chat Modal */}
      <AIChat 
        theme={selectedTheme} 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      {/* Quick Stats Overlay */}
      {currentState === 'dashboard' && (
        <div className="fixed bottom-20 left-6 animate-scale-in">
          <div className="bg-gradient-primary text-white p-4 rounded-xl shadow-lg">
            <div className="text-center">
              <div className="text-2xl font-bold">87%</div>
              <div className="text-sm opacity-90">Weekly Score</div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Index;