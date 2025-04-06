import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Send, Bot, X, PlusCircle } from 'lucide-react';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const sampleMessages: Message[] = [
  {
    id: '1',
    content: "👋 Hi there! Welcome to Teemup! How can I help you find the perfect roommate or property today?",
    sender: 'bot',
    timestamp: new Date()
  }
];

const suggestedQuestions = [
  "How does roommate matching work?",
  "What verification processes do you use?",
  "How do I list my property?",
  "What pricing plans do you offer?",
  "Is my data secure?"
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isOpen, messages]);

  const handleSend = () => {
    if (input.trim() === '') return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    setTimeout(() => {
      const botResponse = getBotResponse(input);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    handleSend();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const getBotResponse = (message: string): string => {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
      return "Hello! How can I help you with finding roommates or properties today?";
    }
    
    if (lowerMsg.includes('how does') && lowerMsg.includes('matching')) {
      return "Our roommate matching uses advanced algorithms to connect you with compatible roommates based on lifestyle preferences, habits, schedules, and personal values. We use a compatibility score to show you the best matches!";
    }
    
    if (lowerMsg.includes('verification') || lowerMsg.includes('verify')) {
      return "We verify user identities through government ID verification, social media profile validation, and optional background checks for premium users. This creates a safer environment for all users.";
    }
    
    if (lowerMsg.includes('list') && (lowerMsg.includes('property') || lowerMsg.includes('apartment'))) {
      return "To list your property, go to the 'Property Listings' dropdown and select 'List Your Property'. You'll be able to add photos, details, and set your preferences for potential tenants.";
    }
    
    if (lowerMsg.includes('price') || lowerMsg.includes('pricing') || lowerMsg.includes('plan') || lowerMsg.includes('cost')) {
      return "We offer flexible pricing tiers: Basic (free), Comfort (SAR 29.99/month), and Elite (SAR 59.99/month). Each tier offers different features and matching capabilities. You can view details on our Living Plan Selection page.";
    }
    
    if (lowerMsg.includes('secure') || lowerMsg.includes('privacy') || lowerMsg.includes('data')) {
      return "We take data security seriously. All personal information is encrypted, and we never share your details with third parties without your explicit consent. Our privacy policy provides full details.";
    }
    
    return "Thanks for your message! Is there anything specific about roommate matching or property listings you'd like to know about? Feel free to ask any questions.";
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          variant="airbnb"
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg"
        >
          <Bot className="h-6 w-6" />
        </Button>
      </div>

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 sm:w-96 z-50">
          <Card className="shadow-airbnb border border-border/10 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between bg-background p-3 border-b border-border/10">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 bg-airbnb-red">
                  <AvatarImage src="/bot-avatar.png" />
                  <AvatarFallback className="bg-airbnb-red text-white">TA</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-sm">Teemup Assistant</h3>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-7 w-7"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <CardContent className="p-0">
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-3/4 px-4 py-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-airbnb-red text-white'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs text-right mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted px-4 py-2 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-airbnb-gray animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-airbnb-gray animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-airbnb-gray animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              {messages.length <= 2 && (
                <div className="px-4 py-2 border-t border-border/10">
                  <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs py-1 h-auto bg-muted/50 border-border/30"
                        onClick={() => handleSuggestedQuestion(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="p-3 border-t border-border/10 flex items-center gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  className="flex-1"
                />
                <Button 
                  onClick={handleSend} 
                  size="icon" 
                  disabled={!input.trim()}
                  variant="airbnb"
                  className="h-9 w-9 rounded-full"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default Chatbot;
