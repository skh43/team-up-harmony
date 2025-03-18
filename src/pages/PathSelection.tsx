
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, Users, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import MainLayout from '@/layouts/MainLayout';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

type UserPath = 'has-room' | 'needs-roommate' | null;

const PathSelection = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedPath, setSelectedPath] = useState<UserPath>(null);
  const { t } = useTranslation();
  
  const handlePathChange = (path: UserPath) => {
    setSelectedPath(path);
  };
  
  const handleContinue = () => {
    if (!selectedPath) {
      toast({
        title: t('pathSelection.selectionRequired'),
        description: t('pathSelection.pleaseSelect'),
        variant: "destructive",
      });
      return;
    }
    
    // Store selection in state management or localStorage if needed
    localStorage.setItem('userPath', selectedPath);
    
    // Navigate to profile creation after path selection
    navigate('/profile-creation');
  };
  
  return (
    <MainLayout className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-5xl">
        <div className="mb-10 text-center">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium bg-primary/10 text-primary rounded-full">
            {t('pathSelection.step')}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('pathSelection.title')}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('pathSelection.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-10 max-w-4xl mx-auto">
          <PathCard
            icon={<Home className="h-10 w-10" />}
            title={t('pathSelection.hostSpace')}
            description={t('pathSelection.hostSpaceDesc')}
            selected={selectedPath === 'has-room'}
            onClick={() => handlePathChange('has-room')}
          />
          
          <PathCard
            icon={<Users className="h-10 w-10" />}
            title={t('pathSelection.seekSettle')}
            description={t('pathSelection.seekSettleDesc')}
            selected={selectedPath === 'needs-roommate'}
            onClick={() => handlePathChange('needs-roommate')}
          />
        </div>
        
        <div className="text-center">
          <Button 
            size="lg" 
            onClick={handleContinue}
            className="rounded-full px-8 py-6 text-base shadow-subtle"
          >
            {t('pathSelection.continue')} <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

interface PathCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

const PathCard = ({ icon, title, description, selected, onClick }: PathCardProps) => {
  const { t } = useTranslation();
  
  return (
    <Card 
      className={cn(
        "cursor-pointer overflow-hidden transition-all duration-300 border hover:border-primary/50 relative",
        selected ? "border-primary ring-2 ring-primary/20 shadow-elegant" : "shadow-subtle"
      )}
      onClick={onClick}
    >
      {selected && (
        <div className="absolute top-3 right-3">
          <CheckCircle2 className="h-6 w-6 text-primary" />
        </div>
      )}
      <CardHeader>
        <div className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors",
          selected ? "bg-primary/10 text-primary" : "bg-secondary text-foreground/80"
        )}>
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          variant={selected ? "default" : "outline"} 
          className="w-full rounded-md" 
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          {selected ? t('pathSelection.selected') : t('pathSelection.select')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PathSelection;
