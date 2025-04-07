
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { useTranslation } from 'react-i18next';
import { Home, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import BackButton from '@/components/BackButton';
import ModernLogo from '@/components/ModernLogo';

const PathSelection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  
  // Check if path is already stored in localStorage
  useEffect(() => {
    const savedPath = localStorage.getItem('userPath');
    if (savedPath) {
      setSelectedPath(savedPath);
    }
  }, []);

  const handleContinue = () => {
    if (!selectedPath) {
      toast.error(t('pathSelection.selectionRequired'), {
        description: t('pathSelection.pleaseSelect')
      });
      return;
    }
    
    // Save path to localStorage
    localStorage.setItem('userPath', selectedPath);
    
    // Navigate to next step with path in state
    navigate('/profile-creation', { state: { path: selectedPath } });
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="flex justify-center mb-8">
        <ModernLogo size="large" />
      </div>
      
      <div className="mb-6">
        <BackButton />
        <p className="text-sm text-muted-foreground mt-6">{t('pathSelection.step')}</p>
        <h1 className="text-2xl font-bold mt-2 mb-2">{t('pathSelection.title')}</h1>
        <p className="text-muted-foreground">{t('pathSelection.subtitle')}</p>
      </div>
      
      <div className="space-y-4 my-6">
        <Card className={`cursor-pointer transition-all hover:shadow-md ${selectedPath === 'host' ? 'border-airbnb-red ring-2 ring-airbnb-red/20' : 'border'}`} onClick={() => setSelectedPath('host')}>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-airbnb-light p-3 rounded-full">
                <Home className="h-6 w-6 text-airbnb-red" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{t('pathSelection.hostSpace')}</h3>
                <p className="text-muted-foreground">{t('pathSelection.hostSpaceDesc')}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 px-6 py-3">
            {selectedPath === 'host' ? (
              <span className="text-airbnb-red font-medium text-sm flex items-center">
                {t('pathSelection.selected')}
              </span>
            ) : (
              <span className="text-muted-foreground text-sm">{t('pathSelection.select')}</span>
            )}
          </CardFooter>
        </Card>
        
        <Card className={`cursor-pointer transition-all hover:shadow-md ${selectedPath === 'seek' ? 'border-airbnb-red ring-2 ring-airbnb-red/20' : 'border'}`} onClick={() => setSelectedPath('seek')}>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-airbnb-light p-3 rounded-full">
                <Users className="h-6 w-6 text-airbnb-red" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{t('pathSelection.seekSettle')}</h3>
                <p className="text-muted-foreground">{t('pathSelection.seekSettleDesc')}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 px-6 py-3">
            {selectedPath === 'seek' ? (
              <span className="text-airbnb-red font-medium text-sm flex items-center">
                {t('pathSelection.selected')}
              </span>
            ) : (
              <span className="text-muted-foreground text-sm">{t('pathSelection.select')}</span>
            )}
          </CardFooter>
        </Card>
      </div>
      
      <Button 
        variant="airbnb" 
        className="w-full" 
        onClick={handleContinue}
      >
        {t('pathSelection.continue')}
      </Button>
    </div>
  );
};

export default PathSelection;
