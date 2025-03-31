
import React from 'react';
import { AsanaType } from '../AsanaCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface AsanaDetailDialogProps {
  asana: AsanaType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToSequence: () => void;
}

const AsanaDetailDialog: React.FC<AsanaDetailDialogProps> = ({ asana, open, onOpenChange, onAddToSequence }) => {
  if (!asana) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg glass border-none">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium text-center">{asana.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="rounded-lg overflow-hidden">
            <img 
              src={asana.imageUrl} 
              alt={asana.name} 
              className="w-full h-auto object-cover"
            />
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">Cueing Instructions</h3>
            <p className="text-sm text-muted-foreground">{asana.cues}</p>
            
            <button
              onClick={onAddToSequence}
              className="mt-4 w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg transition-colors hover:bg-primary/90"
            >
              Add to Sequence
            </button>
            
            {asana.url && (
              <a 
                href={asana.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-2 block text-center text-primary hover:underline text-sm"
              >
                Learn More
              </a>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AsanaDetailDialog;
