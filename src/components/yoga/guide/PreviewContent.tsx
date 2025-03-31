
import React from 'react';

interface PreviewContentProps {
  guideContent: string | null;
}

const PreviewContent: React.FC<PreviewContentProps> = ({ guideContent }) => {
  if (!guideContent) {
    return null;
  }
  
  return (
    <div className="mt-8 p-4 max-h-80 overflow-y-auto bg-white/80 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-3">Preview:</h3>
      <div className="whitespace-pre-line text-sm">
        {guideContent}
      </div>
    </div>
  );
};

export default PreviewContent;
