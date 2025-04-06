
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    content: 'Hello! Welcome to Teemup. How can I help you today?',
    sender: 'bot',
    timestamp: new Date(),
  },
];

const BOT_RESPONSES: Record<string, string[]> = {
  default: [
    "I'm here to help with any questions about finding roommates or properties.",
    "Feel free to ask me about our roommate matching process or property listings.",
    "I can assist with any questions about our services. What would you like to know?"
  ],
  roommate: [
    "Our smart matching algorithm connects you with compatible roommates based on lifestyle preferences.",
    "We verify all profiles to ensure a safe and reliable matching experience.",
    "Getting started with roommate matching is easy! Just click on 'Find Roommates' in the navigation bar."
  ],
  property: [
    "We have a curated selection of properties that meet various budgets and preferences.",
    "All our property listings are verified for quality and accuracy.",
    "You can browse property listings by clicking on 'Property Listings' in the navigation bar."
  ],
  help: [
    "Need help? You can reach out to our support team via the Contact page.",
    "For common questions, check out our FAQ section on the About page.",
    "I'm happy to assist with any issues you're experiencing with our platform."
  ]
};

const getBotResponse = (userMessage: string): string => {
  const userMessageLower = userMessage.toLowerCase();
  
  if (userMessageLower.includes('roommate') || userMessageLower.includes('match')) {
    const randomIndex = Math.floor(Math.random() * BOT_RESPONSES.roommate.length);
    return BOT_RESPONSES.roommate[randomIndex];
  } else if (userMessageLower.includes('property') || userMessageLower.includes('house') || userMessageLower.includes('apartment')) {
    const randomIndex = Math.floor(Math.random() * BOT_RESPONSES.property.length);
    return BOT_RESPONSES.property[randomIndex];
  } else if (userMessageLower.includes('help') || userMessageLower.includes('support') || userMessageLower.includes('question')) {
    const randomIndex = Math.floor(Math.random() * BOT_RESPONSES.help.length);
    return BOT_RESPONSES.help[randomIndex];
  } else {
    const randomIndex = Math.floor(Math.random() * BOT_RESPONSES.default.length);
    return BOT_RESPONSES.default[randomIndex];
  }
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
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

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate bot response with typing delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(newMessage),
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating chat button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              variant="goldGradient"
              size="icon"
              className="h-14 w-14 rounded-full shadow-gold-md"
              aria-label="Open chat"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50 w-80 sm:w-96"
          >
            <Card variant="blackGold" className="flex flex-col shadow-gold-md h-[450px] border-gold-500/30">
              {/* Chat header */}
              <div className="flex items-center justify-between p-3 border-b border-gold-500/20">
                <div className="flex items-center space-x-2">
                  <Bot className="text-gold-500 h-5 w-5" />
                  <h3 className="font-semibold text-gold-500">Teemup Assistant</h3>
                  <Badge variant="goldGlass" animation="goldShimmer">Online</Badge>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 rounded-full text-gold-500 hover:bg-gold-500/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto p-3 space-y-4 bg-black-900/50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div className="flex items-start gap-2 max-w-[80%]">
                      {message.sender === 'bot' && (
                        <Avatar className="h-8 w-8 bg-gold-600 text-black-900">
                          <Bot className="h-4 w-4" />
                        </Avatar>
                      )}
                      <div
                        className={`px-3 py-2 rounded-xl text-sm ${
                          message.sender === 'user'
                            ? 'bg-gold-500 text-black-900 rounded-tr-none'
                            : 'bg-black-800 border border-gold-500/20 text-gold-300 rounded-tl-none'
                        }`}
                      >
                        {message.content}
                      </div>
                      {message.sender === 'user' && (
                        <Avatar className="h-8 w-8 bg-black-700 text-gold-500 border border-gold-500/20">
                          <User className="h-4 w-4" />
                        </Avatar>
                      )}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-2 max-w-[80%]">
                      <Avatar className="h-8 w-8 bg-gold-600 text-black-900">
                        <Bot className="h-4 w-4" />
                      </Avatar>
                      <div className="px-4 py-2 rounded-xl text-sm bg-black-800 border border-gold-500/20 text-gold-300 rounded-tl-none">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 bg-gold-500 rounded-full animate-pulse"></div>
                          <div className="h-2 w-2 bg-gold-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="h-2 w-2 bg-gold-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Chat input */}
              <div className="p-3 border-t border-gold-500/20 bg-black-800">
                <div className="flex space-x-2">
                  <Input
                    ref={inputRef}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="flex-1 bg-black-700 border-gold-500/30 text-gold-300 placeholder:text-gold-500/50 focus-visible:ring-gold-500/30"
                  />
                  <Button
                    onClick={handleSendMessage}
                    variant="gold"
                    size="icon"
                    className="h-10 w-10"
                    disabled={newMessage.trim() === ''}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
