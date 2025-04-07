
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  return (
    <MainLayout className="py-20 bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16 mt-12">
          <div className="inline-block mb-4 animate-float">
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              <h1 className="text-5xl font-bold mb-6">{t('about.title')}</h1>
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-subtle">
            {t('about.mission')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="glass-card p-8 rounded-2xl shadow-elegant">
            <h2 className="text-2xl font-bold mb-4 text-gradient-primary">{t('about.platformTitle')}</h2>
            <p className="text-lg mb-6">
              {t('about.platformDesc1')}
            </p>
            <p className="text-lg">
              {t('about.platformDesc2')}
            </p>
            <div className="mt-6">
              <Button asChild variant="outline" className="rounded-full border-blue-300 hover:bg-blue-100/50 hover:text-blue-700">
                <Link to="/register">{t('about.joinToday')}</Link>
              </Button>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 flex items-center justify-center shadow-neon">
            <div className="glass-panel rounded-xl p-8 max-w-md border border-white/20 shadow-elegant">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-500" /> 
                {t('about.whyChooseUs')}
              </h3>
              <ul className="space-y-3">
                {t('about.features', { returnObjects: true }).map((item, index) => (
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
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">{t('about.plans')}</h2>
          <TabsList className="grid grid-cols-3 w-full max-w-2xl mx-auto bg-blue-100/70 p-1 rounded-xl">
            <TabsTrigger value="basic" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg transition-all">{t('properties.basic')}</TabsTrigger>
            <TabsTrigger value="comfort" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all">{t('properties.comfort')}</TabsTrigger>
            <TabsTrigger value="elite" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-lg transition-all">{t('properties.elite')}</TabsTrigger>
          </TabsList>
          <TabsContent value="basic" className="mt-8 animate-scale-in">
            <Card className="overflow-hidden border-0 shadow-elegant">
              <CardHeader className="text-center bg-gradient-to-r from-blue-400/20 to-blue-500/20 rounded-t-lg">
                <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">{t('about.basicPlan')}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 bg-white">
                <div className="grid gap-4">
                  <p className="text-center text-muted-foreground mb-4">
                    {t('about.basicPlanDesc')}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {t('about.basicFeatures', { returnObjects: true }).map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3">
                          <Check className="h-3.5 w-3.5" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-subtle" size="lg">
                    <Link to="/living-plan-selection">{t('about.selectBasicPlan')}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="comfort" className="mt-8 animate-scale-in">
            <Card className="overflow-hidden border-0 shadow-elegant">
              <CardHeader className="text-center bg-gradient-to-r from-purple-400/20 to-purple-500/20 rounded-t-lg">
                <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-purple-800 text-transparent bg-clip-text">{t('about.comfortPlan')}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 bg-white">
                <div className="grid gap-4">
                  <p className="text-center text-muted-foreground mb-4">
                    {t('about.comfortPlanDesc')}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {t('about.comfortFeatures', { returnObjects: true }).map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600 mr-3">
                          <Check className="h-3.5 w-3.5" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-subtle" size="lg">
                    <Link to="/living-plan-selection">{t('about.selectComfortPlan')}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="elite" className="mt-8 animate-scale-in">
            <Card className="overflow-hidden border-0 shadow-elegant">
              <CardHeader className="text-center bg-gradient-to-r from-pink-400/20 to-pink-500/20 rounded-t-lg">
                <CardTitle className="text-2xl bg-gradient-to-r from-pink-600 to-pink-800 text-transparent bg-clip-text">{t('about.elitePlan')}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 bg-white">
                <div className="grid gap-4">
                  <p className="text-center text-muted-foreground mb-4">
                    {t('about.elitePlanDesc')}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {t('about.eliteFeatures', { returnObjects: true }).map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-600 mr-3">
                          <Check className="h-3.5 w-3.5" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white shadow-subtle" size="lg">
                    <Link to="/living-plan-selection">{t('about.selectElitePlan')}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12 mb-8">
          <div className="max-w-xl mx-auto p-8 bg-gradient-to-r from-blue-100/50 to-purple-100/50 rounded-2xl shadow-elegant">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">{t('about.readyToFind')}</h2>
            <p className="mb-6 text-lg">{t('about.joinThousands')}</p>
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-8 shadow-neon">
              <Link to="/register">{t('about.getStartedToday')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
