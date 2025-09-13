import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, Heart, Brain, Sparkles, Coffee } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'wellness' | 'study' | 'life';
}

const aiPersonalities = {
  marvel: {
    name: "StudyBot",
    emoji: "🦸‍♂️",
    greeting: "Hey there, future superhero! I'm here to help you unlock your learning powers. What would you like to master today?",
    color: "text-red-600"
  },
  barbie: {
    name: "DreamBot",
    emoji: "💖",
    greeting: "Hi gorgeous! I'm here to help you achieve all your study dreams. Remember, you can be anything you want to be!",
    color: "text-pink-600"
  },
  anime: {
    name: "SenseiBot",
    emoji: "⭐",
    greeting: "Konnichiwa! Your learning adventure starts now. I'm here to guide you through every challenge!",
    color: "text-blue-600"
  },
  sports: {
    name: "CoachBot",
    emoji: "🏆",
    greeting: "Hey champion! Ready to train that amazing brain of yours? Let's crush those learning goals together!",
    color: "text-green-600"
  }
};

const wellnessPrompts = [
  "Take a deep breath with me! 🌬️",
  "You're doing amazing! 💪",
  "Time for a quick stretch? 🤸‍♀️",
  "Remember to hydrate! 💧",
  "You've got this! ⭐"
];

const studyTips = [
  "Break big topics into smaller chunks! 📚",
  "Try teaching what you learned to someone else! 🗣️",
  "Use colorful notes and diagrams! 🎨",
  "Take regular breaks to stay fresh! ⏰",
  "Connect new info to what you already know! 🔗"
];

interface AIChatProps {
  theme: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function AIChat({ theme, isOpen, onClose }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const personality = aiPersonalities[theme as keyof typeof aiPersonalities] || aiPersonalities.marvel;

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add initial greeting
      const greeting: Message = {
        id: Date.now().toString(),
        content: personality.greeting,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages([greeting]);
    }
  }, [isOpen, personality.greeting, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage, theme);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const generateAIResponse = (userInput: string, currentTheme: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('stress') || input.includes('anxious') || input.includes('worried')) {
      return `${personality.emoji} I understand you're feeling stressed. Remember, it's completely normal! Let's take this one step at a time. ${wellnessPrompts[Math.floor(Math.random() * wellnessPrompts.length)]} Would you like to talk about what's bothering you or try a quick mindfulness exercise?`;
    }
    
    if (input.includes('study') || input.includes('learn') || input.includes('homework')) {
      return `${personality.emoji} Great question about studying! ${studyTips[Math.floor(Math.random() * studyTips.length)]} What specific subject or topic are you working on? I'd love to help you create a personalized study plan!`;
    }
    
    if (input.includes('motivation') || input.includes('lazy') || input.includes('procrastination')) {
      return `${personality.emoji} We all have those days! The key is to start small. Pick just ONE tiny task and do it now. Then celebrate that win! 🎉 Remember, progress over perfection. What's one small thing you could do in the next 5 minutes?`;
    }
    
    return `${personality.emoji} That's a great point! I'm here to support you in any way I can. Whether it's studying, dealing with stress, or just chatting about life - I'm your friendly AI companion. What would you like to explore together?`;
  };

  const handleWellnessBreak = () => {
    const wellnessMessage: Message = {
      id: Date.now().toString(),
      content: `${personality.emoji} Time for a wellness break! Let's do a quick 30-second breathing exercise. Breathe in for 4 counts, hold for 4, breathe out for 4. Ready? 🌸✨`,
      sender: 'ai',
      timestamp: new Date(),
      type: 'wellness'
    };
    setMessages(prev => [...prev, wellnessMessage]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl h-[600px] flex flex-col card-glass">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 bg-gradient-primary">
              <AvatarFallback className="text-white font-bold">
                {personality.emoji}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-fredoka font-bold text-lg">{personality.name}</h3>
              <p className="text-sm text-muted-foreground">Your friendly AI study companion</p>
            </div>
          </div>
          <Button variant="ghost" onClick={onClose}>✕</Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-scale-in`}
            >
              {message.sender === 'ai' && (
                <Avatar className="w-8 h-8 bg-gradient-primary">
                  <AvatarFallback className="text-white text-sm">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-gradient-primary text-white'
                    : message.type === 'wellness'
                    ? 'bg-gradient-success text-white'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' || message.type === 'wellness' ? 'text-white/70' : 'text-muted-foreground'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              {message.sender === 'user' && (
                <Avatar className="w-8 h-8 bg-secondary">
                  <AvatarFallback className="text-white text-sm">
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3 justify-start animate-scale-in">
              <Avatar className="w-8 h-8 bg-gradient-primary">
                <AvatarFallback className="text-white text-sm">
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted p-3 rounded-2xl">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t space-y-3">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleWellnessBreak}
              className="btn-hover-lift"
            >
              <Heart className="w-4 h-4 mr-1" />
              Wellness Break
            </Button>
            <Button size="sm" variant="outline" className="btn-hover-lift">
              <Brain className="w-4 h-4 mr-1" />
              Study Tip
            </Button>
            <Button size="sm" variant="outline" className="btn-hover-lift">
              <Coffee className="w-4 h-4 mr-1" />
              Life Chat
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me anything! I'm here to help with studies, stress, or just life..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!inputMessage.trim()} className="btn-hover-lift">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}