
import React, { useState } from 'react';
import { AsanaType } from '../AsanaCard';
import { cn } from "@/lib/utils";
import SequenceItem from './SequenceItem';

interface SequenceTabProps {
  asanas: AsanaType[];
  startIndex: number;
  emptyMessage: string;
  noAsanasMessage: string;
  onMoveAsana: (fromIndex: number, toIndex: number) => void;
  onRemoveAsana: (index: number) => void;
  onTogglePeakPose: (index: number) => void;
  compact?: boolean;
  section: string; // Add section property to indicate which section this tab represents
}

const SequenceTab: React.FC<SequenceTabProps> = ({
  asanas,
  startIndex,
  emptyMessage,
  noAsanasMessage,
  onMoveAsana,
  onRemoveAsana,
  onTogglePeakPose,
  compact = false,
  section // The section this tab represents (opening, building, cooldown)
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  
  const handleDragLeave = () => {
    setIsDragOver(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    try {
      const asanaData = JSON.parse(e.dataTransfer.getData('application/json')) as AsanaType;
      
      // Create a new custom event with the section information
      const customEvent = new CustomEvent('asana-dropped', { 
        detail: {
          ...asanaData,
          section: section // Set the section to this tab's section
        },
        bubbles: true
      });
      e.currentTarget.dispatchEvent(customEvent);
    } catch (error) {
      console.error('Error parsing dropped data:', error);
    }
  };
  
  const moveUp = (index: number) => {
    if (index > 0) {
      onMoveAsana(startIndex + index, startIndex + index - 1);
    }
  };
  
  const moveDown = (index: number) => {
    if (index < asanas.length - 1) {
      onMoveAsana(startIndex + index, startIndex + index + 1);
    }
  };
  
  const removeAsana = (index: number) => {
    onRemoveAsana(startIndex + index);
  };
  
  const togglePeakPose = (index: number) => {
    onTogglePeakPose(startIndex + index);
  };
  
  const gridClasses = compact 
    ? "grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2"
    : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3";
  
  return (
    <div 
      className={cn(
        "min-h-[80px] rounded-xl transition-colors duration-200",
        "drop-target",
        isDragOver ? "active" : ""
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      data-section={section} // Add data attribute for section identification
    >
      {asanas.length === 0 ? (
        <div className="h-full flex items-center justify-center py-2">
          <p className="text-muted-foreground text-center text-sm italic">
            {emptyMessage}
          </p>
        </div>
      ) : (
        <div className={gridClasses}>
          {asanas.map((asana, index) => (
            <SequenceItem
              key={`${asana.id}-${startIndex + index}`}
              asana={asana}
              index={index}
              totalItems={asanas.length}
              onMoveUp={moveUp}
              onMoveDown={moveDown}
              onRemove={removeAsana}
              onTogglePeakPose={togglePeakPose}
              compact={compact}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SequenceTab;
