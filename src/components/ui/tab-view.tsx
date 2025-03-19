
import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type TabViewProps = {
  defaultValue?: string;
  tabs: {
    value: string;
    label: string;
    icon?: React.ReactNode;
    color?: string;
  }[];
  children: React.ReactNode;
  onValueChange?: (value: string) => void;
  className?: string;
};

const TabView = ({ 
  defaultValue, 
  tabs, 
  children, 
  onValueChange,
  className 
}: TabViewProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (onValueChange) {
      onValueChange(value);
    }
  };
  
  useEffect(() => {
    if (defaultValue && defaultValue !== activeTab) {
      setActiveTab(defaultValue);
    }
  }, [defaultValue]);

  const getTabColor = (tab: string) => {
    const tabObj = tabs.find(t => t.value === tab);
    if (!tabObj?.color) return '';
    
    return tabObj.color === 'blue' ? 'bg-blue-500 hover:bg-blue-600 text-white' : 
           tabObj.color === 'purple' ? 'bg-purple-500 hover:bg-purple-600 text-white' : 
           tabObj.color === 'amber' ? 'bg-amber-500 hover:bg-amber-600 text-white' : '';
  };
  
  return (
    <Tabs 
      value={activeTab} 
      onValueChange={handleTabChange}
      className={cn("w-full font-montserrat", className)}
    >
      <TabsList className="w-full p-1 bg-muted rounded-full flex justify-between">
        {tabs.map((tab) => (
          <motion.div
            key={tab.value}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <TabsTrigger 
              value={tab.value}
              className={cn(
                "w-full rounded-full gap-2 transition-all duration-300 data-[state=active]:shadow-md",
                activeTab === tab.value ? getTabColor(tab.value) : ""
              )}
            >
              {tab.icon}
              {tab.label}
            </TabsTrigger>
          </motion.div>
        ))}
      </TabsList>
      
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            key: child.props.value
          });
        }
        return child;
      })}
    </Tabs>
  );
};

export { TabView, TabsContent };
