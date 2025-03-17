import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';

const About = () => {
  return (
    <MainLayout className="py-20 bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16 mt-12">
          <div className="inline-block mb-4 animate-float">
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              <h1 className="text-5xl font-bold mb-6">About Team Up</h1>
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-subtle">
            Our mission is to simplify the roommate discovery process in Saudi Arabia,
            making shared living accessible, safe, and enjoyable for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="glass-card p-8 rounded-2xl shadow-elegant">
            <h2 className="text-2xl font-bold mb-4 text-gradient-primary">Our Platform</h2>
            <p className="text-lg mb-6">
              Team Up is Saudi Arabia's premier roommate matching platform, designed to connect
              compatible people looking for shared living arrangements. Whether you're a student,
              young professional, or relocating to a new city, we help you find the perfect living situation.
            </p>
            <p className="text-lg">
              Using advanced matching algorithms and detailed preference settings, we take the guesswork
              out of finding a compatible roommate. Our platform focuses on safety, compatibility, and
              creating lasting living arrangements.
            </p>
            <div className="mt-6">
              <Button asChild variant="outline" className="rounded-full border-blue-300 hover:bg-blue-100/50 hover:text-blue-700">
                <Link to="/register">Join Today</Link>
              </Button>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 flex items-center justify-center shadow-neon">
            <div className="glass-panel rounded-xl p-8 max-w-md border border-white/20 shadow-elegant">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-500" /> 
                Why Choose Team Up?
              </h3>
              <ul className="space-y-3">
                {[
                  "Verified profiles for safety and trust",
                  "Detailed preference matching",
                  "Wide selection of properties",
                  "Flexible living plans for every budget",
                  "User-friendly interface",
                  "Dedicated support team"
                ].map((item, index) => (
                  <li key={index} className="flex items-start animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mr-3">
                      <Check className="h-3.5 w-3.5 text-white" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Tabs defaultValue="basic" className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">Our Living Plans</h2>
          <TabsList className="grid grid-cols-3 w-full max-w-2xl mx-auto bg-blue-100/70 p-1 rounded-xl">
            <TabsTrigger value="basic" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg transition-all">Basic Living</TabsTrigger>
            <TabsTrigger value="comfort" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all">Comfort Living</TabsTrigger>
            <TabsTrigger value="elite" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-lg transition-all">Elite Living</TabsTrigger>
          </TabsList>
          <TabsContent value="basic" className="mt-8 animate-scale-in">
            <Card className="overflow-hidden border-0 shadow-elegant">
              <CardHeader className="text-center bg-gradient-to-r from-blue-400/20 to-blue-500/20 rounded-t-lg">
                <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">Basic Living (Free)</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 bg-white">
                <div className="grid gap-4">
                  <p className="text-center text-muted-foreground mb-4">
                    Perfect for students and budget-conscious individuals looking for affordable shared living options.
                  </p>
                  <ul className="space-y-3 mb-6">
                    {[
                      "Access to basic roommate matching",
                      "Limited property listings",
                      "Standard profile creation",
                      "Basic preference matching"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3">
                          <Check className="h-3.5 w-3.5" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-subtle" size="lg">
                    <Link to="/living-plan-selection">Select Basic Plan</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="comfort" className="mt-8 animate-scale-in">
            <Card className="overflow-hidden border-0 shadow-elegant">
              <CardHeader className="text-center bg-gradient-to-r from-purple-400/20 to-purple-500/20 rounded-t-lg">
                <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-purple-800 text-transparent bg-clip-text">Comfort Living (Subscription)</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 bg-white">
                <div className="grid gap-4">
                  <p className="text-center text-muted-foreground mb-4">
                    For young professionals seeking quality shared accommodations with added comfort and convenience.
                  </p>
                  <ul className="space-y-3 mb-6">
                    {[
                      "Enhanced roommate matching algorithm",
                      "Access to premium property listings",
                      "Advanced preference settings",
                      "Priority customer support",
                      "Monthly virtual events with potential roommates"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600 mr-3">
                          <Check className="h-3.5 w-3.5" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-subtle" size="lg">
                    <Link to="/living-plan-selection">Select Comfort Plan</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="elite" className="mt-8 animate-scale-in">
            <Card className="overflow-hidden border-0 shadow-elegant">
              <CardHeader className="text-center bg-gradient-to-r from-pink-400/20 to-pink-500/20 rounded-t-lg">
                <CardTitle className="text-2xl bg-gradient-to-r from-pink-600 to-pink-800 text-transparent bg-clip-text">Elite Living (Subscription)</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 bg-white">
                <div className="grid gap-4">
                  <p className="text-center text-muted-foreground mb-4">
                    Exclusive access to luxury shared living spaces and premium roommate matching services.
                  </p>
                  <ul className="space-y-3 mb-6">
                    {[
                      "Priority access to luxury property listings",
                      "Personalized roommate matching concierge",
                      "VIP verification and safety checks",
                      "Exclusive networking events",
                      "Premium moving and relocation assistance",
                      "24/7 dedicated support"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-600 mr-3">
                          <Check className="h-3.5 w-3.5" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white shadow-subtle" size="lg">
                    <Link to="/living-plan-selection">Select Elite Plan</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12 mb-8">
          <div className="max-w-xl mx-auto p-8 bg-gradient-to-r from-blue-100/50 to-purple-100/50 rounded-2xl shadow-elegant">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">Ready to Find Your Perfect Roommate?</h2>
            <p className="mb-6 text-lg">Join thousands of users who found their ideal living situation through Team Up.</p>
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-8 shadow-neon">
              <Link to="/register">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;




