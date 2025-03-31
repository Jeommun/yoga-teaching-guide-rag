
import React from 'react';

export interface AsanaType {
  id: string;
  name: string;
  imageUrl: string;
  cues: string;
  url: string;
  category?: string;
  isPeakPose?: boolean;
  section?: string; // Add section property to track which tab the asana belongs to
}

interface AsanaCardProps extends AsanaType {
  onSelect: (asana: AsanaType) => void;
  compact?: boolean;
}

const AsanaCard: React.FC<AsanaCardProps> = ({ 
  id, 
  name, 
  imageUrl, 
  cues, 
  url,
  category,
  isPeakPose,
  section,
  onSelect,
  compact = false
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    // Make sure to include all properties including isPeakPose and section
    const asanaData = { id, name, imageUrl, cues, url, category, isPeakPose, section };
    e.dataTransfer.setData('application/json', JSON.stringify(asanaData));
    e.dataTransfer.effectAllowed = 'copy';
  };
  
  const handleClick = () => {
    onSelect({ id, name, imageUrl, cues, url, category, isPeakPose, section });
  };
  
  return (
    <div 
      className={`asana-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all relative drag-item cursor-pointer ${compact ? 'text-xs' : 'text-sm'}`}
      onClick={handleClick}
      draggable
      onDragStart={handleDragStart}
    >
      <div className={`aspect-square ${compact ? 'max-h-16' : ''}`}>
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover"
          loading="lazy"
          onLoad={(e) => e.currentTarget.classList.add('loaded')}
        />
      </div>
      
      <div className={`p-2 text-center bg-white bg-opacity-90 ${compact ? 'p-1' : ''}`}>
        <h3 className={`font-medium ${compact ? 'text-xs truncate' : 'text-sm'}`}>{name}</h3>
        {category && !compact && (
          <span className="text-xs text-muted-foreground">
            {category}
          </span>
        )}
      </div>
    </div>
  );
};

export default AsanaCard;
