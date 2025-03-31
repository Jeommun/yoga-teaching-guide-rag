
import React from 'react';
import AsanaCard, { AsanaType } from '../AsanaCard';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface AsanaGridProps {
  asanas: AsanaType[];
  isLoading: boolean;
  error: string | null;
  onSelectAsana: (asana: AsanaType) => void;
  layout?: 'compact' | 'full';
}

const AsanaGrid: React.FC<AsanaGridProps> = ({ 
  asanas, 
  isLoading, 
  error, 
  onSelectAsana,
  layout = 'full'
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-4">
        {/* Error message displayed in alert above */}
      </div>
    );
  }
  
  // Initial display of 6 poses (2x3 grid)
  const initialAsanas = asanas.slice(0, 6);
  // Remaining poses to show when expanded
  const remainingAsanas = asanas.slice(6);
  
  return (
    <Collapsible 
      open={isExpanded} 
      onOpenChange={setIsExpanded} 
      className="space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        {initialAsanas.length > 0 ? (
          initialAsanas.map((asana) => (
            <AsanaCard
              key={asana.id}
              id={asana.id}
              name={asana.name}
              imageUrl={asana.imageUrl}
              cues={asana.cues}
              url={asana.url}
              category={asana.category}
              onSelect={onSelectAsana}
              compact={layout === 'compact'}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No results found.
          </div>
        )}
      </div>
      
      {remainingAsanas.length > 0 && (
        <>
          <CollapsibleTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full mt-2 flex items-center justify-center gap-2 bg-yogaTeal-light hover:bg-yogaTeal text-foreground"
            >
              {isExpanded ? (
                <>Show Less <ChevronUp className="h-4 w-4" /></>
              ) : (
                <>Show More ({remainingAsanas.length}) <ChevronDown className="h-4 w-4" /></>
              )}
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div className="grid grid-cols-2 gap-4 pt-4">
              {remainingAsanas.map((asana) => (
                <AsanaCard
                  key={asana.id}
                  id={asana.id}
                  name={asana.name}
                  imageUrl={asana.imageUrl}
                  cues={asana.cues}
                  url={asana.url}
                  category={asana.category}
                  onSelect={onSelectAsana}
                  compact={layout === 'compact'}
                />
              ))}
            </div>
          </CollapsibleContent>
        </>
      )}
    </Collapsible>
  );
};

export default AsanaGrid;
