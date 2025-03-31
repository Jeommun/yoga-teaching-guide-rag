
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Predefined themes for yoga classes
export const CLASS_THEMES = [
  "Grounding & Stability",
  "Heart Opening & Compassion",
  "Strength & Courage", 
  "Balance & Focus",
  "Surrender & Release",
  "Gratitude & Joy",
  "Energy & Vitality"
];

// Available time options in minutes
export const TIME_OPTIONS = [30, 45, 60, 75, 90];

interface TeachingGuideFormProps {
  theme: string;
  setTheme: (theme: string) => void;
  classLength: string;
  setClassLength: (length: string) => void;
}

const TeachingGuideForm: React.FC<TeachingGuideFormProps> = ({
  theme,
  setTheme,
  classLength,
  setClassLength
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto mb-6">
      <div>
        <Label className="block text-sm font-medium mb-2 text-muted-foreground">
          Select a Class Theme... 🌼
        </Label>
        <Select onValueChange={setTheme} value={theme}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a theme" />
          </SelectTrigger>
          <SelectContent>
            {CLASS_THEMES.map((themeOption) => (
              <SelectItem key={themeOption} value={themeOption}>
                {themeOption}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label className="block text-sm font-medium mb-2 text-muted-foreground">
          Choose Total Class Length (minutes): ⏱️
        </Label>
        <Select onValueChange={setClassLength} value={classLength}>
          <SelectTrigger>
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            {TIME_OPTIONS.map((time) => (
              <SelectItem key={time} value={time.toString()}>
                {time} minutes
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TeachingGuideForm;
