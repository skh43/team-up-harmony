import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, Settings, MessageSquare, User, Home, Heart, LogOut, 
  Edit, ChevronRight, CalendarClock, CreditCard
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import MainLayout from '@/layouts/MainLayout';

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock data for the dashboard
  const userData = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=1976&ixlib=rb-4.0.3",
    profileCompletion: 85,
    matchCount: 3,
    propertyViews: 12,
    joinDate: "October 2023",
    plan: "Comfort Plan",
    upcomingRent: "SAR 2,500",
    paymentDue: "November 10, 2023"
  };

  const recentMatches = [
    { 
      id: 1, 
      name: "Mohammed", 
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3",
      time: "2 days ago",
      unreadMessages: 1
    },
    { 
      id: 2, 
      name: "Fatima", 
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3",
      time: "5 days ago",
      unreadMessages: 0
    }
  ];

  const savedProperties = [
    {
      id: 1,
      title: "Modern Apartment with Balcony",
      location: "Al Olaya, Riyadh",
      price: "SAR 3,500/month",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3"
    },
    {
      id: 2,
      title: "Spacious Room for Rent",
      location: "Al Rawdah, Jeddah",
      price: "SAR 1,800/month",
      image: "https://images.unsplash.com/photo-1598928636135-d146006ff4be?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3"
    }
  ];

  const notifications = [
    { 
      id: 1, 
      type: "match", 
      content: "You matched with Nora! Start a conversation now.", 
      time: "2 hours ago", 
      read: false 
    },
    { 
      id: 2, 
      type: "property", 
      content: "New property matching your criteria is available in Riyadh.", 
      time: "1 day ago", 
      read: true 
    },
    { 
      id: 3, 
      type: "system", 
      content: "Your subscription will renew in 7 days.", 
      time: "2 days ago", 
      read: true 
    }
  ];

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    
    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  const markAllNotificationsAsRead = () => {
    toast({
      title: "Notifications marked as read",
      description: "All notifications have been marked as read.",
    });
  };

  return (
    <MainLayout className="pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="space-y-6">
              <div className="text-center md:text-left">
                <Avatar className="h-20 w-20 mx-auto md:mx-0 mb-3">
                  <AvatarImage src={userData.avatar} alt={userData.name} />
                  <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{userData.name}</h2>
                <p className="text-sm text-muted-foreground">{userData.email}</p>
                <p className="text-xs text-muted-foreground mt-1">Member since {userData.joinDate}</p>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3 gap-1"
                  onClick={() => navigate('/profile-edit')}
                >
                  <Edit className="h-3.5 w-3.5" />
                  Edit Profile
                </Button>
              </div>
              
              <div className="space-y-1 bg-secondary/20 p-3 rounded-lg">
                <p className="text-sm font-medium mb-2">Profile Completion</p>
                <Progress value={userData.profileCompletion} className="h-2" />
                <p className="text-xs text-right mt-1">
                  {userData.profileCompletion}% Complete
                </p>
              </div>
              
              <div className="space-y-1">
                <Button
                  variant={activeTab === "overview" ? "secondary" : "ghost"}
                  className="w-full justify-start gap-3"
                  onClick={() => setActiveTab("overview")}
                >
                  <User className="h-4 w-4" />
                  Overview
                </Button>
                
                <Button
                  variant={activeTab === "matches" ? "secondary" : "ghost"}
                  className="w-full justify-start gap-3"
                  onClick={() => setActiveTab("matches")}
                >
                  <MessageSquare className="h-4 w-4" />
                  Matches
                  <Badge className="ml-auto bg-primary text-white">{recentMatches.length}</Badge>
                </Button>
                
                <Button
                  variant={activeTab === "properties" ? "secondary" : "ghost"}
                  className="w-full justify-start gap-3"
                  onClick={() => setActiveTab("properties")}
                >
                  <Home className="h-4 w-4" />
                  Saved Properties
                  <Badge className="ml-auto bg-primary text-white">{savedProperties.length}</Badge>
                </Button>
                
                <Button
                  variant={activeTab === "notifications" ? "secondary" : "ghost"}
                  className="w-full justify-start gap-3"
                  onClick={() => setActiveTab("notifications")}
                >
                  <Bell className="h-4 w-4" />
                  Notifications
                  <Badge className="ml-auto bg-primary text-white">
                    {notifications.filter(n => !n.read).length}
                  </Badge>
                </Button>
                
                <Button
                  variant={activeTab === "settings" ? "secondary" : "ghost"}
                  className="w-full justify-start gap-3"
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
                
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Dashboard Overview</h1>
                
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Matches</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{userData.matchCount}</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        +1 new match this week
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Property Views</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{userData.propertyViews}</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        +5 views this week
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Current Plan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{userData.plan}</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Renews in 28 days
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        Recent Matches
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setActiveTab("matches")}
                        >
                          View All
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {recentMatches.length > 0 ? (
                        <div className="space-y-4">
                          {recentMatches.map(match => (
                            <div key={match.id} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={match.image} alt={match.name} />
                                  <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{match.name}</p>
                                  <p className="text-xs text-muted-foreground">Matched {match.time}</p>
                                </div>
                              </div>
                              <Button size="sm" variant="outline">
                                Message
                                {match.unreadMessages > 0 && (
                                  <Badge className="ml-2 bg-primary text-white h-5 w-5 p-0 flex items-center justify-center rounded-full">
                                    {match.unreadMessages}
                                  </Badge>
                                )}
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-center py-4">
                          No matches yet. Start browsing to find roommates!
                        </p>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        Saved Properties
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setActiveTab("properties")}
                        >
                          View All
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {savedProperties.length > 0 ? (
                        <div className="space-y-4">
                          {savedProperties.map(property => (
                            <div key={property.id} className="flex items-center gap-3">
                              <img
                                src={property.image}
                                alt={property.title}
                                className="h-14 w-20 rounded-md object-cover"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{property.title}</p>
                                <p className="text-xs text-muted-foreground">{property.location}</p>
                                <p className="text-sm font-medium text-primary">{property.price}</p>
                              </div>
                              <Button size="sm" variant="outline">
                                View
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-center py-4">
                          No saved properties yet. Browse listings and save your favorites!
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            
            {activeTab === "matches" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Your Matches</h1>
                
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="w-full grid grid-cols-3">
                    <TabsTrigger value="all">All Matches</TabsTrigger>
                    <TabsTrigger value="new">New Matches</TabsTrigger>
                    <TabsTrigger value="messages">Conversations</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="mt-6">
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                      {recentMatches.map(match => (
                        <Card key={match.id} className="overflow-hidden">
                          <div className="aspect-square relative">
                            <img 
                              src={match.image} 
                              alt={match.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-bold text-lg">{match.name}</h3>
                              <Badge variant="outline">
                                {match.time}
                              </Badge>
                            </div>
                            <div className="flex gap-2 mt-4">
                              <Button className="flex-1">View Profile</Button>
                              <Button variant="outline" className="flex-1">Message</Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <div className="text-center mt-8">
                      <Button 
                        onClick={() => navigate('/matching')}
                        variant="outline" 
                        className="gap-2"
                      >
                        Find More Matches
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="new" className="mt-6">
                    <p className="text-center text-muted-foreground py-8">
                      No new matches at the moment. Keep browsing!
                    </p>
                    
                    <div className="text-center">
                      <Button 
                        onClick={() => navigate('/matching')}
                        variant="default" 
                        className="gap-2"
                      >
                        Find More Matches
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="messages" className="mt-6">
                    <div className="space-y-4">
                      {recentMatches.map(match => (
                        <Card key={match.id} className="overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={match.image} alt={match.name} />
                                <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <p className="font-medium">{match.name}</p>
                                  <span className="text-xs text-muted-foreground">{match.time}</span>
                                </div>
                                <p className="text-sm text-muted-foreground truncate">
                                  {match.unreadMessages > 0 
                                    ? <Badge variant="outline" className="text-primary border-primary">New messages</Badge>
                                    : "No new messages"}
                                </p>
                              </div>
                              <Button variant="outline" size="sm">
                                Chat
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
            
            {activeTab === "properties" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Saved Properties</h1>
                
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                  {savedProperties.map(property => (
                    <Card key={property.id} className="overflow-hidden">
                      <div className="aspect-video relative">
                        <img 
                          src={property.image} 
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 text-white text-sm rounded">
                          {property.price}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute top-2 right-2 bg-black/30 text-white hover:bg-black/50 hover:text-white rounded-full"
                        >
                          <Heart className="h-5 w-5 fill-current" />
                        </Button>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-1">{property.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{property.location}</p>
                        <div className="flex gap-2">
                          <Button className="flex-1">View Details</Button>
                          <Button variant="outline" className="flex-1">Contact</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="text-center mt-8">
                  <Button 
                    onClick={() => navigate('/properties')}
                    variant="outline" 
                    className="gap-2"
                  >
                    Browse More Properties
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold">Notifications</h1>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={markAllNotificationsAsRead}
                  >
                    Mark all as read
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {notifications.map(notification => (
                    <Card 
                      key={notification.id} 
                      className={`overflow-hidden ${!notification.read ? 'border-l-4 border-l-primary' : ''}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            notification.type === 'match' 
                              ? 'bg-green-100 text-green-600' 
                              : notification.type === 'property' 
                                ? 'bg-blue-100 text-blue-600' 
                                : 'bg-gray-100 text-gray-600'
                          }`}>
                            {notification.type === 'match' ? (
                              <Heart className="h-5 w-5" />
                            ) : notification.type === 'property' ? (
                              <Home className="h-5 w-5" />
                            ) : (
                              <Bell className="h-5 w-5" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p>{notification.content}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {notifications.length === 0 && (
                  <div className="text-center py-8">
                    <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">You have no notifications</p>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === "settings" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Account Settings</h1>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your account details and profile</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Personal Details</p>
                        <p className="text-sm text-muted-foreground">Update your name and contact information</p>
                      </div>
                      <Button variant="outline">Edit</Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Avatar & Photos</p>
                        <p className="text-sm text-muted-foreground">Change your profile picture and gallery photos</p>
                      </div>
                      <Button variant="outline">Edit</Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Password</p>
                        <p className="text-sm text-muted-foreground">Change your password</p>
                      </div>
                      <Button variant="outline">Change</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>Manage your matching and notification preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Matching Preferences</p>
                        <p className="text-sm text-muted-foreground">Update your roommate matching criteria</p>
                      </div>
                      <Button variant="outline">Edit</Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Property Preferences</p>
                        <p className="text-sm text-muted-foreground">Update your property search filters</p>
                      </div>
                      <Button variant="outline">Edit</Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Notification Settings</p>
                        <p className="text-sm text-muted-foreground">Control when and how you receive notifications</p>
                      </div>
                      <Button variant="outline">Manage</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Subscription & Billing</CardTitle>
                    <CardDescription>Manage your subscription and payment methods</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Current Plan: {userData.plan}</p>
                        <p className="text-sm text-muted-foreground">Your plan renews on November 15, 2023</p>
                      </div>
                      <Button variant="outline">Change Plan</Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Payment Methods</p>
                        <p className="text-sm text-muted-foreground">Add or update your payment methods</p>
                      </div>
                      <Button variant="outline">Manage</Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Billing History</p>
                        <p className="text-sm text-muted-foreground">View and download your payment receipts</p>
                      </div>
                      <Button variant="outline">View</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-destructive/50">
                  <CardHeader>
                    <CardTitle className="text-destructive">Danger Zone</CardTitle>
                    <CardDescription>Irreversible account actions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="destructive" className="w-full">Deactivate Account</Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
