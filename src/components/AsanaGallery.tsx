
import React, { useState, useEffect } from 'react';
import { AsanaType } from './AsanaCard';
import { supabase } from '@/lib/supabase';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import SearchBox from './yoga/SearchBox';
import AsanaGrid from './yoga/AsanaGrid';
import AsanaDetailDialog from './yoga/AsanaDetailDialog';
import CategoryFilter from './yoga/CategoryFilter';

interface AsanaGalleryProps {
  onSelectAsana: (asana: AsanaType) => void;
}

const AsanaGallery: React.FC<AsanaGalleryProps> = ({ onSelectAsana }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [asanas, setAsanas] = useState<AsanaType[]>([]);
  const [selectedAsana, setSelectedAsana] = useState<AsanaType | null>(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  
  // Fetch asanas from Supabase
  useEffect(() => {
    const fetchAsanas = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log('Fetching asanas with URL:', import.meta.env.VITE_SUPABASE_URL);
        
        // Using the yoga_poses table from your Supabase
        let query = supabase
          .from('yoga_poses')
          .select('id, name, image_url, description, url, category');
          
        if (searchTerm) {
          query = query.ilike('name', `%${searchTerm}%`);
        }
        
        if (selectedCategory) {
          query = query.eq('category', selectedCategory);
        }
        
        const { data, error } = await query;
          
        if (error) {
          console.error('Error fetching asanas:', error);
          setError('Failed to load asanas.');
          return;
        }
        
        if (data) {
          console.log('Fetched data:', data);
          // Map the data to match the AsanaType structure
          const formattedData = data.map(pose => ({
            id: pose.id.toString(),
            name: pose.name,
            imageUrl: pose.image_url,
            cues: pose.description,
            url: pose.url,
            category: pose.category
          }));
          
          setAsanas(formattedData);
          
          // Extract unique categories
          const uniqueCategories = Array.from(
            new Set(data.map(pose => pose.category).filter(Boolean))
          ) as string[];
          
          setCategories(uniqueCategories);
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Server connection issue. Please check your Supabase URL configuration.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAsanas();
  }, [searchTerm, selectedCategory]);
  
  const handleSelectAsana = (asana: AsanaType) => {
    setSelectedAsana(asana);
    setOpen(true);
  };
  
  const handleAddToSequence = () => {
    if (selectedAsana) {
      onSelectAsana(selectedAsana);
      setOpen(false);
    }
  };
  
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };
  
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };
  
  return (
    <div className="w-full animate-fade-in">
      {/* Centered search box */}
      <div className="mb-4 flex justify-center">
        <SearchBox searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      </div>
      
      {/* Category filters in a single row */}
      <div className="mb-6 flex justify-center">
        <CategoryFilter 
          categories={categories} 
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
      </div>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      )}
      
      <AsanaGrid 
        asanas={asanas}
        isLoading={isLoading}
        error={error}
        onSelectAsana={handleSelectAsana}
        layout="compact"
      />
      
      <AsanaDetailDialog
        asana={selectedAsana}
        open={open}
        onOpenChange={setOpen}
        onAddToSequence={handleAddToSequence}
      />
    </div>
  );
};

export default AsanaGallery;
