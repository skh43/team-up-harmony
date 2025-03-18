
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from '@/lib/utils';

interface LanguageSelectorProps {
  className?: string;
}

const LanguageSelector = ({ className }: LanguageSelectorProps) => {
  const { i18n, t } = useTranslation();
  
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
  };

  return (
    <div className={cn("flex items-center", className)}>
      <Select defaultValue={i18n.language} onValueChange={changeLanguage}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Select Language" />
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
