
import React from 'react';
import { AsanaType } from './AsanaCard';
import SequenceTab from './yoga/SequenceTab';

interface SequenceBuilderProps {
  selectedAsanas: AsanaType[];
  onRemoveAsana: (index: number) => void;
  onMoveAsana: (fromIndex: number, toIndex: number) => void;
  onTogglePeakPose: (index: number) => void;
  activeTab: string;
  onTabChange: (value: string) => void;
}

const SequenceBuilder: React.FC<SequenceBuilderProps> = ({ 
  selectedAsanas, 
  onRemoveAsana,
  onMoveAsana,
  onTogglePeakPose,
  activeTab,
  onTabChange
}) => {
  // Group asanas by their respective sections
  const openingAsanas = selectedAsanas.filter(asana => asana.section === 'opening');
  const buildingAsanas = selectedAsanas.filter(asana => asana.section === 'building');
  const cooldownAsanas = selectedAsanas.filter(asana => asana.section === 'cooldown');
  
  return (
    <div className="w-full animate-fade-in">
      {/* All sections are now displayed at once */}
      <div className="space-y-4">
        {/* Opening Section */}
        <div className="bg-white/30 rounded-xl p-4">
          <h3 className="text-lg font-medium mb-3 text-primary">Opening & Warm-up</h3>
          <SequenceTab
            asanas={openingAsanas}
            startIndex={0}
            emptyMessage="Please drop more asanas to your sequence!"
            noAsanasMessage="Please drop more asanas to your sequence!"
            onMoveAsana={onMoveAsana}
            onRemoveAsana={onRemoveAsana}
            onTogglePeakPose={onTogglePeakPose}
            compact={true}
            section="opening"
          />
        </div>
        
        {/* Building Section */}
        <div className="bg-white/30 rounded-xl p-4">
          <h3 className="text-lg font-medium mb-3 text-primary">Building & Peak Poses</h3>
          <SequenceTab
            asanas={buildingAsanas}
            startIndex={openingAsanas.length}
            emptyMessage="Please drop more asanas to your sequence!"
            noAsanasMessage="Please drop more asanas to your sequence!"
            onMoveAsana={onMoveAsana}
            onRemoveAsana={onRemoveAsana}
            onTogglePeakPose={onTogglePeakPose}
            compact={true}
            section="building"
          />
        </div>
        
        {/* Cooldown Section */}
        <div className="bg-white/30 rounded-xl p-4">
          <h3 className="text-lg font-medium mb-3 text-primary">Cool Down & Closing</h3>
          <SequenceTab
            asanas={cooldownAsanas}
            startIndex={openingAsanas.length + buildingAsanas.length}
            emptyMessage="Please drop more asanas to your sequence!"
            noAsanasMessage="Please drop more asanas to your sequence!"
            onMoveAsana={onMoveAsana}
            onRemoveAsana={onRemoveAsana}
            onTogglePeakPose={onTogglePeakPose}
            compact={true}
            section="cooldown"
          />
        </div>
      </div>
    </div>
  );
};

export default SequenceBuilder;
