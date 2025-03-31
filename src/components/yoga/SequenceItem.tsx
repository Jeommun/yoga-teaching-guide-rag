
import React from 'react';
import { AsanaType } from '../AsanaCard';
import { MoveUp, MoveDown, Trash, Flame } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface SequenceItemProps {
  asana: AsanaType;
  index: number;
  totalItems: number;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onRemove: (index: number) => void;
  onTogglePeakPose: (index: number) => void;
  compact?: boolean;
}

const SequenceItem: React.FC<SequenceItemProps> = ({
  asana,
  index,
  totalItems,
  onMoveUp,
  onMoveDown,
  onRemove,
  onTogglePeakPose,
  compact = false
}) => {
  return (
    <div 
      key={`${asana.id}-${index}`}
      className={cn(
        "glass-dark rounded-lg overflow-hidden sequence-item relative group",
        asana.isPeakPose && "ring-2 ring-primary ring-offset-1 ring-offset-background",
        compact ? "text-xs" : "text-sm"
      )}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="aspect-square w-full">
        <img 
          src={asana.imageUrl} 
          alt={asana.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className={cn("p-2 text-center", compact && "p-1")}>
        <h4 className={cn("font-medium truncate", compact ? "text-xs" : "text-sm")}>{asana.name}</h4>
      </div>
      
      <div className="absolute top-1 right-1 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => onMoveUp(index)}
                className={cn(
                  "rounded-full bg-white/80 hover:bg-primary/80 transition-colors",
                  compact ? "p-0.5" : "p-1"
                )}
                disabled={index === 0}
              >
                <MoveUp size={compact ? 12 : 14} className={index === 0 ? "text-muted-foreground/40" : "text-primary"} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Move Up</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => onMoveDown(index)}
                className={cn(
                  "rounded-full bg-white/80 hover:bg-primary/80 transition-colors",
                  compact ? "p-0.5" : "p-1"
                )}
                disabled={index === totalItems - 1}
              >
                <MoveDown size={compact ? 12 : 14} className={index === totalItems - 1 ? "text-muted-foreground/40" : "text-primary"} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Move Down</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => onTogglePeakPose(index)}
                className={cn(
                  "rounded-full bg-white/80 transition-colors",
                  compact ? "p-0.5" : "p-1",
                  asana.isPeakPose 
                    ? "bg-primary/80 hover:bg-primary/60" 
                    : "hover:bg-primary/80"
                )}
              >
                <Flame size={compact ? 12 : 14} className={asana.isPeakPose ? "text-yellow-500" : "text-primary"} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{asana.isPeakPose ? "Remove Peak Pose" : "Set as Peak Pose"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => onRemove(index)}
                className={cn(
                  "rounded-full bg-white/80 hover:bg-destructive/80 transition-colors",
                  compact ? "p-0.5" : "p-1"
                )}
              >
                <Trash size={compact ? 12 : 14} className="text-destructive" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default SequenceItem;
