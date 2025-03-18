
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import RoommateJourney from './RoommateJourney';
import ModernLogo from '@/components/ModernLogo';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const { t } = useTranslation();

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
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-700">{t('index.title')}</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                {t('index.subtitle')}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#how-it-works" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-full transition-all shadow-md hover:shadow-lg">
                  {t('common.getStarted')}
                </a>
                <a href="/about" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-cyan-600 border border-cyan-600 bg-white hover:bg-cyan-50 rounded-full transition-all">
                  {t('common.learnMore')}
                </a>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img 
                src="/public/lovable-uploads/f6a689e5-9dc4-44c7-a958-19de3d72db76.png" 
                alt={t('common.logoAlt')} 
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
          <h2 className="text-3xl font-bold mb-6">{t('index.ready')}</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('index.joinThousands')}
          </p>
          <a 
            href="/register" 
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full transition-all shadow-md hover:shadow-lg"
          >
            {t('common.signUpNow')}
          </a>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
