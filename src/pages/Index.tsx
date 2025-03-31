import React, { useState, useEffect } from 'react';
import YogaHeader from '@/components/YogaHeader';
import AsanaGallery from '@/components/AsanaGallery';
import SequenceBuilder from '@/components/SequenceBuilder';
import TeachingGuideGenerator from '@/components/yoga/TeachingGuideGenerator';
import { AsanaType } from '@/components/AsanaCard';
import { toast } from "sonner";

const Index: React.FC = () => {
  const [selectedAsanas, setSelectedAsanas] = useState<AsanaType[]>([]);
  const [activeTab, setActiveTab] = useState<string>("opening");
  
  const handleSelectAsana = (asana: AsanaType) => {
    const asanaWithSection = { 
      ...asana, 
      isPeakPose: false,
      section: activeTab 
    };
    
    setSelectedAsanas([...selectedAsanas, asanaWithSection]);
    
    toast.success("Yoga pose added to sequence", {
      description: `${asana.name} has been added to your ${activeTab} sequence.`,
      duration: 2000,
    });
  };
  
  const handleRemoveAsana = (index: number) => {
    const newSequence = [...selectedAsanas];
    const removed = newSequence.splice(index, 1)[0];
    setSelectedAsanas(newSequence);
    
    toast.info("Yoga pose removed from sequence", {
      description: `${removed.name} has been removed from your sequence.`,
      duration: 2000,
    });
  };
  
  const handleMoveAsana = (fromIndex: number, toIndex: number) => {
    const newSequence = [...selectedAsanas];
    const [moved] = newSequence.splice(fromIndex, 1);
    newSequence.splice(toIndex, 0, moved);
    setSelectedAsanas(newSequence);
  };
  
  const handleTogglePeakPose = (index: number) => {
    const newSequence = [...selectedAsanas];
    newSequence[index] = { 
      ...newSequence[index], 
      isPeakPose: !newSequence[index].isPeakPose 
    };
    setSelectedAsanas(newSequence);
    
    const asana = newSequence[index];
    if (asana.isPeakPose) {
      toast.success("Peak pose set", {
        description: `${asana.name} is now marked as a peak pose.`,
        duration: 2000,
      });
    } else {
      toast.info("Peak pose removed", {
        description: `${asana.name} is no longer marked as a peak pose.`,
        duration: 2000,
      });
    }
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  useEffect(() => {
    const handleAsanaDropped = (e: Event) => {
      const customEvent = e as CustomEvent<AsanaType>;
      
      const asanaWithSection = {
        ...customEvent.detail
      };
      
      setSelectedAsanas(prev => [...prev, asanaWithSection]);
      
      toast.success("Yoga pose added to sequence", {
        description: `${customEvent.detail.name} has been added to your ${customEvent.detail.section} sequence.`,
        duration: 2000,
      });
    };
    
    document.addEventListener('asana-dropped', handleAsanaDropped as EventListener);
    
    return () => {
      document.removeEventListener('asana-dropped', handleAsanaDropped as EventListener);
    };
  }, []); // Remove activeTab from dependencies to avoid issues
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-yogaTeal-light to-yogaSage-light">
      <YogaHeader />
      
      <main className="container mx-auto px-4 pb-16 animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <h2 className="text-xl font-semibold mb-4 text-center">Yoga Asana Gallery</h2>
            <div className="glass rounded-xl p-6">
              <AsanaGallery onSelectAsana={handleSelectAsana} />
            </div>
          </div>
          
          <div className="md:w-2/3">
            <h2 className="text-xl font-semibold mb-4 text-center">Yoga Sequence</h2>
            <div className="glass rounded-xl p-6">
              <SequenceBuilder 
                selectedAsanas={selectedAsanas} 
                onRemoveAsana={handleRemoveAsana}
                onMoveAsana={handleMoveAsana}
                onTogglePeakPose={handleTogglePeakPose}
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
            </div>
            
            <div className="glass rounded-xl p-6 mt-6 w-full">
              <TeachingGuideGenerator selectedAsanas={selectedAsanas} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
