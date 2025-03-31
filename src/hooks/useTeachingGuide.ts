
import { useState } from 'react';
import { toast } from "sonner";
import { AsanaType } from '@/components/AsanaCard';
import { generatePDF } from '@/components/yoga/guide/pdfUtils';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(`https://${supabaseUrl}`, supabaseAnonKey);

export function useTeachingGuide() {
  const [theme, setTheme] = useState<string>("");
  const [classLength, setClassLength] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [guideContent, setGuideContent] = useState<string | null>(null);

  const handleGenerateGuide = async (selectedAsanas: AsanaType[]) => {
    // Validate the selections
    if (!theme) {
      toast.error("Please select a class theme");
      return;
    }
    
    if (!classLength) {
      toast.error("Please select a class length");
      return;
    }
    
    setIsGenerating(true);
    setGuideContent(null);
    
    try {
      // Call the edge function to generate the teaching guide
      const { data, error } = await supabase.functions.invoke('generate-teaching-guide', {
        body: {
          sequence: selectedAsanas,
          theme,
          classLength
        }
      });
      
      if (error) {
        console.error("Error calling edge function:", error);
        throw new Error(error.message || "Failed to generate teaching guide");
      }
      
      if (!data.success) {
        throw new Error(data.error || "Failed to generate teaching guide");
      }
      
      // Store the generated content
      setGuideContent(data.guideContent);
      
      toast.success("Teaching guide generated successfully!", {
        description: "Your guide is now ready to download as a PDF."
      });
      
    } catch (error) {
      console.error("Error generating teaching guide:", error);
      toast.error("Failed to generate teaching guide", {
        description: error instanceof Error ? error.message : "Please try again later."
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleDownloadPDF = () => {
    if (!guideContent) return;
    generatePDF(guideContent, theme);
  };

  return {
    theme,
    setTheme,
    classLength,
    setClassLength,
    isGenerating,
    guideContent,
    handleGenerateGuide,
    handleDownloadPDF
  };
}
