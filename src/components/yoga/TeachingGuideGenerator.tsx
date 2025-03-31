
import React from 'react';
import { Sparkles } from "lucide-react";
import { AsanaType } from '../AsanaCard';

import TeachingGuideForm, { CLASS_THEMES, TIME_OPTIONS } from './guide/TeachingGuideForm';
import GuideActions from './guide/GuideActions';
import PreviewContent from './guide/PreviewContent';
import { useTeachingGuide } from '@/hooks/useTeachingGuide';

interface TeachingGuideGeneratorProps {
  selectedAsanas: AsanaType[];
}

const TeachingGuideGenerator: React.FC<TeachingGuideGeneratorProps> = ({ selectedAsanas }) => {
  const {
    theme,
    setTheme,
    classLength, 
    setClassLength,
    isGenerating,
    guideContent,
    handleGenerateGuide,
    handleDownloadPDF
  } = useTeachingGuide();
  
  const onGenerateGuide = () => handleGenerateGuide(selectedAsanas);
  const hasEnoughAsanas = selectedAsanas.length >= 3;
  
  return (
    <div className="w-full">
      <div className="text-center space-y-3 mb-4">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5 text-secondary" />
          <h2 className="text-lg font-medium text-primary">Sequence Complete! Ready to bring it to life?</h2>
          <Sparkles className="h-5 w-5 text-secondary" />
        </div>
        
        <p className="text-muted-foreground text-sm max-w-xl mx-auto">
          {hasEnoughAsanas 
            ? "Select your class Theme and set your Time. Then click below to generate your PDF teaching guide."
            : "Add at least 3 poses to your sequence to create a teaching guide."}
        </p>
      </div>
      
      <TeachingGuideForm 
        theme={theme}
        setTheme={setTheme}
        classLength={classLength}
        setClassLength={setClassLength}
      />
      
      <GuideActions 
        isGenerating={isGenerating}
        guideContent={guideContent}
        onGenerateGuide={onGenerateGuide}
        onDownloadPDF={handleDownloadPDF}
        disabled={!hasEnoughAsanas}
      />
      
      <PreviewContent guideContent={guideContent} />
      
      <div className="text-center mt-3">
        <p className="text-xs text-muted-foreground italic">
          This will create simple, clear teaching language using Universal Principles of Alignment and your chosen theme.
        </p>
      </div>
    </div>
  );
};

export default TeachingGuideGenerator;
