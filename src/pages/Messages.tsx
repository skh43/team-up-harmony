
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Send, Phone, Video, Info, Image, Paperclip, 
  Smile, MoreVertical, ArrowLeft, User
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import MainLayout from '@/layouts/MainLayout';

const Messages = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [activeChatId, setActiveChatId] = useState<number | null>(1);
  const [mobileView, setMobileView] = useState<'list' | 'chat'>(window.innerWidth > 768 ? 'chat' : 'list');
  
  // Mock data for conversations
  const conversations = [
    {
      id: 1,
      user: {
        name: "Mohammed",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3",
        status: "online",
        lastSeen: "Now"
      },
      unread: 0,
      lastMessage: {
        text: "When can I see the apartment?",
        time: "10:35 AM",
        sender: "them"
      },
      messages: [
        { id: 1, text: "Hello! I saw your profile and I'm interested in being roommates.", time: "10:25 AM", sender: "them" },
        { id: 2, text: "Hi Mohammed! Nice to meet you. Tell me more about yourself.", time: "10:28 AM", sender: "me" },
        { id: 3, text: "I'm a software engineer working at a tech company. I'm clean, quiet, and looking for a place near downtown.", time: "10:30 AM", sender: "them" },
        { id: 4, text: "That sounds great! I have an apartment in mind that might suit us both.", time: "10:32 AM", sender: "me" },
        { id: 5, text: "When can I see the apartment?", time: "10:35 AM", sender: "them" },
      ]
    },
    {
      id: 2,
      user: {
        name: "Fatima",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3",
        status: "offline",
        lastSeen: "2 hours ago"
      },
      unread: 2,
      lastMessage: {
        text: "I'd prefer a place with a balcony or some outdoor space.",
        time: "Yesterday",
        sender: "them"
      },
      messages: [
        { id: 1, text: "Hi there! I noticed we matched as potential roommates.", time: "Yesterday, 3:15 PM", sender: "them" },
        { id: 2, text: "Hello Fatima! Yes, I think we might be compatible roommates based on our preferences.", time: "Yesterday, 3:20 PM", sender: "me" },
        { id: 3, text: "What kind of place are you looking for specifically?", time: "Yesterday, 3:22 PM", sender: "me" },
        { id: 4, text: "I'd prefer a place with a balcony or some outdoor space.", time: "Yesterday, 3:25 PM", sender: "them" },
      ]
    },
    {
      id: 3,
      user: {
        name: "Ahmed",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3",
        status: "online",
        lastSeen: "Now"
      },
      unread: 0,
      lastMessage: {
        text: "Looking forward to meeting you next week!",
        time: "Tuesday",
        sender: "me"
      },
      messages: [
        { id: 1, text: "Hi Ahmed, I'm interested in the shared apartment you listed.", time: "Tuesday, 2:15 PM", sender: "me" },
        { id: 2, text: "Hello! Yes, it's still available. Would you like to schedule a viewing?", time: "Tuesday, 2:30 PM", sender: "them" },
        { id: 3, text: "That would be great. How about next Monday at 6pm?", time: "Tuesday, 2:35 PM", sender: "me" },
        { id: 4, text: "Monday at 6pm works for me. See you then!", time: "Tuesday, 2:40 PM", sender: "them" },
        { id: 5, text: "Looking forward to meeting you next week!", time: "Tuesday, 2:42 PM", sender: "me" },
      ]
    }
  ];
  
  const activeChat = conversations.find(conv => conv.id === activeChatId);

  const handleSendMessage = () => {
    if (!message.trim() || !activeChat) return;
    
    toast({
      description: "Message sent successfully",
    });
    
    setMessage('');
  };

  const handleChatSelect = (chatId: number) => {
    setActiveChatId(chatId);
    if (window.innerWidth < 768) {
      setMobileView('chat');
    }
  };

  const handleBackToList = () => {
    setMobileView('list');
  };

  return (
    <MainLayout className="pb-0 h-screen flex flex-col">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="container mx-auto p-4 flex-1 flex flex-col">
          <div className="mb-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Messages</h1>
            <Button
              variant="outline"
              size="sm"
              className="md:hidden"
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </Button>
          </div>
          
          <div className="bg-card rounded-lg shadow-sm border flex-1 flex overflow-hidden">
            {/* Conversation List - Hidden on mobile when in chat view */}
            <div 
              className={`w-full md:w-1/3 border-r ${
                mobileView === 'chat' ? 'hidden md:block' : 'block'
              }`}
            >
              <div className="p-3 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    placeholder="Search conversations" 
                    className="pl-9"
                  />
                </div>
              </div>
              
              <ScrollArea className="h-[calc(100vh-13rem)]">
                {conversations.map(conversation => (
                  <div 
                    key={conversation.id}
                    className={`p-3 flex gap-3 cursor-pointer hover:bg-muted/40 ${
                      conversation.id === activeChatId ? 'bg-muted/60' : ''
                    }`}
                    onClick={() => handleChatSelect(conversation.id)}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                        <AvatarFallback>{conversation.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                        conversation.user.status === 'online' ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{conversation.user.name}</span>
                        <span className="text-xs text-muted-foreground">{conversation.lastMessage.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage.sender === 'me' ? 'You: ' : ''}
                        {conversation.lastMessage.text}
                      </p>
                    </div>
                    
                    {conversation.unread > 0 && (
                      <Badge className="bg-primary text-white h-5 min-w-5 flex items-center justify-center rounded-full">
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                ))}
              </ScrollArea>
            </div>
            
            {/* Chat View - Hidden on mobile when in list view */}
            <div 
              className={`w-full md:w-2/3 flex flex-col ${
                mobileView === 'list' ? 'hidden md:flex' : 'flex'
              }`}
            >
              {activeChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-3 border-b flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="md:hidden"
                        onClick={handleBackToList}
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </Button>
                      
                      <Avatar>
                        <AvatarImage src={activeChat.user.avatar} alt={activeChat.user.name} />
                        <AvatarFallback>{activeChat.user.name[0]}</AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <div className="font-medium">{activeChat.user.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {activeChat.user.status === 'online' ? 'Online' : `Last seen ${activeChat.user.lastSeen}`}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon">
                        <Phone className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Video className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Info className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Messages Area */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {activeChat.messages.map(msg => (
                        <div 
                          key={msg.id} 
                          className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                        >
                          {msg.sender !== 'me' && (
                            <Avatar className="h-8 w-8 mr-2 mt-1">
                              <AvatarImage src={activeChat.user.avatar} alt={activeChat.user.name} />
                              <AvatarFallback>{activeChat.user.name[0]}</AvatarFallback>
                            </Avatar>
                          )}
                          
                          <div className="max-w-[75%]">
                            <div 
                              className={`px-4 py-2 rounded-lg ${
                                msg.sender === 'me' 
                                  ? 'bg-primary text-primary-foreground' 
                                  : 'bg-muted'
                              }`}
                            >
                              <p>{msg.text}</p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {msg.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  {/* Message Input */}
                  <div className="p-3 border-t">
                    <div className="flex gap-2">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon">
                          <Paperclip className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Image className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Smile className="h-5 w-5" />
                        </Button>
                      </div>
                      
                      <Input 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleSendMessage();
                          }
                        }}
                      />
                      
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        size="icon"
                      >
                        <Send className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-4">
                  <User className="h-16 w-16 text-muted-foreground/40 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No conversation selected</h3>
                  <p className="text-muted-foreground text-center max-w-md">
                    Select a conversation from the list to start chatting or find new roommates to message.
                  </p>
                  <Button
                    onClick={() => navigate('/matching')}
                    className="mt-4"
                  >
                    Find Roommates
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Messages;
