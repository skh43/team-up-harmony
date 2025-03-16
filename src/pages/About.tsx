
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const About = () => {
  return (
    <MainLayout className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">About Team Up</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our mission is to simplify the roommate discovery process in Saudi Arabia,
            making shared living accessible, safe, and enjoyable for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Platform</h2>
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
          </div>
          <div className="bg-gradient-to-r from-blue-100/30 to-purple-100/30 rounded-lg p-6 flex items-center justify-center">
            <div className="glass-panel rounded-lg p-8 max-w-md">
              <h3 className="text-xl font-semibold mb-4">Why Choose Team Up?</h3>
              <ul className="space-y-3">
                {[
                  "Verified profiles for safety and trust",
                  "Detailed preference matching",
                  "Wide selection of properties",
                  "Flexible living plans for every budget",
                  "User-friendly interface",
                  "Dedicated support team"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Tabs defaultValue="basic" className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Living Plans</h2>
          <TabsList className="grid grid-cols-3 w-full max-w-2xl mx-auto">
            <TabsTrigger value="basic">Basic Living</TabsTrigger>
            <TabsTrigger value="comfort">Comfort Living</TabsTrigger>
            <TabsTrigger value="elite">Elite Living</TabsTrigger>
          </TabsList>
          <TabsContent value="basic" className="mt-8">
            <Card>
              <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
                <CardTitle className="text-2xl">Basic Living (Free)</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid gap-4">
                  <p className="text-center text-muted-foreground mb-4">
                    Perfect for students and budget-conscious individuals looking for affordable shared living options.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Access to basic roommate matching</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Limited property listings</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Standard profile creation</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Basic preference matching</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full" size="lg">
                    <Link to="/living-plan-selection">Select Basic Plan</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="comfort" className="mt-8">
            <Card>
              <CardHeader className="text-center bg-gradient-to-r from-blue-100 to-blue-200 rounded-t-lg">
                <CardTitle className="text-2xl">Comfort Living (Subscription)</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid gap-4">
                  <p className="text-center text-muted-foreground mb-4">
                    For young professionals seeking quality shared accommodations with added comfort and convenience.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Enhanced roommate matching algorithm</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Access to premium property listings</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Advanced preference settings</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Priority customer support</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Monthly virtual events with potential roommates</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-gradient-to-r from-blue-500 to-blue-600" size="lg">
                    <Link to="/living-plan-selection">Select Comfort Plan</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="elite" className="mt-8">
            <Card>
              <CardHeader className="text-center bg-gradient-to-r from-blue-200 to-blue-300 rounded-t-lg">
                <CardTitle className="text-2xl">Elite Living (Luxury)</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid gap-4">
                  <p className="text-center text-muted-foreground mb-4">
                    Exclusive access to luxury shared living spaces and premium roommate matching services.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Priority access to luxury property listings</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Personalized roommate matching concierge</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>VIP verification and safety checks</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Exclusive networking events</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Premium moving and relocation assistance</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>24/7 dedicated support</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-blue-700" size="lg">
                    <Link to="/living-plan-selection">Select Elite Plan</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/register">Get Started</Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
