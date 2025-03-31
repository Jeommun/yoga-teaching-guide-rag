
import React from 'react';
import { AsanaType } from '../AsanaCard';
import { TabsContent } from "@/components/ui/tabs";
import SequenceTab from './SequenceTab';

interface SequenceGroupsProps {
  selectedAsanas: AsanaType[];
  onRemoveAsana: (index: number) => void;
  onMoveAsana: (fromIndex: number, toIndex: number) => void;
  onTogglePeakPose: (index: number) => void;
}

const SequenceGroups: React.FC<SequenceGroupsProps> = ({ 
  selectedAsanas, 
  onRemoveAsana,
  onMoveAsana,
  onTogglePeakPose
}) => {
  // Group asanas into three sections
  const openingAsanas = selectedAsanas.slice(0, Math.ceil(selectedAsanas.length / 3));
  const buildingAsanas = selectedAsanas.slice(
    Math.ceil(selectedAsanas.length / 3), 
    Math.ceil(selectedAsanas.length / 3) * 2
  );
  const cooldownAsanas = selectedAsanas.slice(Math.ceil(selectedAsanas.length / 3) * 2);
  
  return (
    <>
      <TabsContent value="opening">
        <SequenceTab
          asanas={openingAsanas}
          startIndex={0}
          emptyMessage={selectedAsanas.length === 0 
            ? "Drag yoga poses here to create your opening sequence" 
            : "Add more poses to start your opening sequence"}
          noAsanasMessage="Drag yoga poses here to create your opening sequence"
          onMoveAsana={onMoveAsana}
          onRemoveAsana={onRemoveAsana}
          onTogglePeakPose={onTogglePeakPose}
          section="opening"
        />
      </TabsContent>
      
      <TabsContent value="building">
        <SequenceTab
          asanas={buildingAsanas}
          startIndex={openingAsanas.length}
          emptyMessage={selectedAsanas.length === 0 
            ? "Drag yoga poses here to create your building sequence" 
            : "Add more poses to create your building sequence"}
          noAsanasMessage="Drag yoga poses here to create your building sequence"
          onMoveAsana={onMoveAsana}
          onRemoveAsana={onRemoveAsana}
          onTogglePeakPose={onTogglePeakPose}
          section="building"
        />
      </TabsContent>
      
      <TabsContent value="cooldown">
        <SequenceTab
          asanas={cooldownAsanas}
          startIndex={openingAsanas.length + buildingAsanas.length}
          emptyMessage={selectedAsanas.length === 0 
            ? "Drag yoga poses here to create your cooldown sequence" 
            : "Add more poses to create your cooldown sequence"}
          noAsanasMessage="Drag yoga poses here to create your cooldown sequence"
          onMoveAsana={onMoveAsana}
          onRemoveAsana={onRemoveAsana}
          onTogglePeakPose={onTogglePeakPose}
          section="cooldown"
        />
      </TabsContent>
    </>
  );
};

export default SequenceGroups;
