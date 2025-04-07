
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Users, CheckCircle, Star, Crown, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';

const About = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Ensure features arrays are properly typed as string[]
  const generalFeatures: string[] = t('about.features', { returnObjects: true }) as string[];
  
  const basicFeatures: string[] = t('about.basicFeatures', { returnObjects: true }) as string[];
  
  const comfortFeatures: string[] = t('about.comfortFeatures', { returnObjects: true }) as string[];
  
  const eliteFeatures: string[] = t('about.eliteFeatures', { returnObjects: true }) as string[];

  return (
    <MainLayout>
      <div className="py-12 bg-gradient-to-r from-airbnb-light/30 to-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-6">{t('about.title')}</h1>
            <p className="text-lg text-gray-700 mb-10">{t('about.mission')}</p>
            <div className="flex justify-center">
              <Button 
                variant="airbnb" 
                size="lg" 
                className="px-8"
                onClick={() => navigate('/living-plan-selection')}
              >
                {t('about.joinToday')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold font-playfair mb-6">{t('about.platformTitle')}</h2>
              <p className="text-gray-700 mb-4">{t('about.platformDesc1')}</p>
              <p className="text-gray-700 mb-8">{t('about.platformDesc2')}</p>
              
              <h3 className="text-xl font-bold mb-4">{t('about.whyChooseUs')}</h3>
              <ul className="space-y-2 mb-8">
                {generalFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-airbnb-red mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-airbnb-light/30 rounded-xl p-8 shadow-subtle">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex justify-center mb-4">
                  <Users className="h-12 w-12 text-airbnb-red" />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">{t('roommate.title')}</h3>
                <p className="text-gray-600 text-center mb-6">{t('roommate.subtitle')}</p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-airbnb-light rounded-full h-8 w-8 flex items-center justify-center text-airbnb-red font-bold mr-3 flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-bold text-airbnb-navy">{t('roommate.step1Title')}</h4>
                      <p className="text-sm text-gray-600">{t('roommate.step1Description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-airbnb-light rounded-full h-8 w-8 flex items-center justify-center text-airbnb-red font-bold mr-3 flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-bold text-airbnb-navy">{t('roommate.step2Title')}</h4>
                      <p className="text-sm text-gray-600">{t('roommate.step2Description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-airbnb-light rounded-full h-8 w-8 flex items-center justify-center text-airbnb-red font-bold mr-3 flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-bold text-airbnb-navy">{t('roommate.step3Title')}</h4>
                      <p className="text-sm text-gray-600">{t('roommate.step3Description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-airbnb-light rounded-full h-8 w-8 flex items-center justify-center text-airbnb-red font-bold mr-3 flex-shrink-0">4</div>
                    <div>
                      <h4 className="font-bold text-airbnb-navy">{t('roommate.step4Title')}</h4>
                      <p className="text-sm text-gray-600">{t('roommate.step4Description')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-airbnb-light/30">
        <div className="container px-4 mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center font-playfair mb-12">{t('about.plans')}</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="bg-white rounded-xl shadow-subtle p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-airbnb-light flex items-center justify-center">
                  <Star className="h-8 w-8 text-airbnb-red" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-2">{t('about.basicPlan')}</h3>
              <p className="text-gray-600 text-center mb-6">{t('about.basicPlanDesc')}</p>
              
              <ul className="space-y-2 mb-8">
                {basicFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-airbnb-red mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/living-plan-selection')}
              >
                {t('about.selectBasicPlan')}
              </Button>
            </div>
            
            {/* Comfort Plan */}
            <div className="bg-white rounded-xl shadow-subtle p-6 border border-airbnb-red/30 hover:shadow-md transition-shadow relative transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-airbnb-red text-white px-4 py-1 rounded-full text-sm font-medium">
                {t('common.recommended')}
              </div>
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-airbnb-light flex items-center justify-center">
                  <Heart className="h-8 w-8 text-airbnb-red" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-2">{t('about.comfortPlan')}</h3>
              <p className="text-gray-600 text-center mb-6">{t('about.comfortPlanDesc')}</p>
              
              <ul className="space-y-2 mb-8">
                {comfortFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-airbnb-red mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                variant="airbnb" 
                className="w-full"
                onClick={() => navigate('/living-plan-selection')}
              >
                {t('about.selectComfortPlan')}
              </Button>
            </div>
            
            {/* Elite Plan */}
            <div className="bg-white rounded-xl shadow-subtle p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-airbnb-light flex items-center justify-center">
                  <Crown className="h-8 w-8 text-airbnb-red" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-2">{t('about.elitePlan')}</h3>
              <p className="text-gray-600 text-center mb-6">{t('about.elitePlanDesc')}</p>
              
              <ul className="space-y-2 mb-8">
                {eliteFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-airbnb-red mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/living-plan-selection')}
              >
                {t('about.selectElitePlan')}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="py-16 bg-white">
        <div className="container px-4 mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6 font-playfair">{t('about.readyToFind')}</h2>
          <p className="text-lg text-gray-600 mb-8">{t('about.joinThousands')}</p>
          
          <Button 
            variant="airbnb" 
            size="lg"
            className="px-8 inline-flex items-center"
            onClick={() => navigate('/register')}
          >
            {t('about.getStartedToday')} <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
