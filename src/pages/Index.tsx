import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import RoommateJourney from './RoommateJourney';
import ModernLogo from '@/components/ModernLogo';

const Index = () => {
  return (
    <MainLayout className="min-h-screen">
      <section className="py-16 bg-gradient-to-b from-white via-blue-50 to-white">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2">
              <div className="mb-6">
                <ModernLogo size="xlarge" className="mx-auto lg:mx-0" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Find Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-700">Perfect</span> Roommate Match
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Connect with compatible roommates based on lifestyle, habits, and preferences. Say goodbye to roommate nightmares!
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#how-it-works" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-full transition-all shadow-md hover:shadow-lg">
                  Get Started
                </a>
                <a href="/about" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-cyan-600 border border-cyan-600 bg-white hover:bg-cyan-50 rounded-full transition-all">
                  Learn More
                </a>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img 
                src="/public/lovable-uploads/f6a689e5-9dc4-44c7-a958-19de3d72db76.png" 
                alt="Roommate matchmaking app" 
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      <div id="how-it-works">
        <RoommateJourney />
      </div>
      
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to find your ideal roommate?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of people who have found their perfect match.
          </p>
          <a 
            href="/register" 
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full transition-all shadow-md hover:shadow-lg"
          >
            Sign Up Now
          </a>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
