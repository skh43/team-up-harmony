
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

interface LanguageSelectorProps {
  className?: string;
}

const LanguageSelector = ({ className }: LanguageSelectorProps) => {
  const { i18n, t } = useTranslation();
  const { toast } = useToast();
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
    { code: 'zh', name: '中文' },
    { code: 'fil', name: 'Filipino' }
  ];
  
  const changeLanguage = (value: string) => {
    i18n.changeLanguage(value);
    
    // Set direction for RTL languages (like Arabic)
    document.documentElement.dir = value === 'ar' ? 'rtl' : 'ltr';
    
    // Store the selected language in localStorage
    localStorage.setItem('userLanguage', value);
    
    // Show a toast notification
    toast({
      title: t('common.language'),
      description: languages.find(lang => lang.code === value)?.name || value,
      duration: 2000,
    });
  };

  return (
    <div className={cn("flex items-center", className)}>
      <Select value={i18n.language} onValueChange={changeLanguage}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder={t('common.language')} />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
