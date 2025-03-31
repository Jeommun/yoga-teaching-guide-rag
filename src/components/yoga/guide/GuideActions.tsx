
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, ArrowRight, Loader2 } from "lucide-react";

interface GuideActionsProps {
  isGenerating: boolean;
  guideContent: string | null;
  onGenerateGuide: () => Promise<void>;
  onDownloadPDF: () => void;
  disabled?: boolean;
}

const GuideActions: React.FC<GuideActionsProps> = ({
  isGenerating,
  guideContent,
  onGenerateGuide,
  onDownloadPDF,
  disabled = false
}) => {
  return (
    <div className="flex justify-center">
      {!guideContent ? (
        <Button
          onClick={onGenerateGuide}
          disabled={isGenerating || disabled}
          className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-all hover:shadow-lg animate-scale-up flex items-center gap-2"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating your guide...
            </>
          ) : (
            <>
              <ArrowRight className="h-4 w-4" />
              Create My Teaching Guide
            </>
          )}
        </Button>
      ) : (
        <Button
          onClick={onDownloadPDF}
          className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-lg font-medium transition-all hover:shadow-lg animate-scale-up flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Download PDF Guide
        </Button>
      )}
    </div>
  );
};

export default GuideActions;
