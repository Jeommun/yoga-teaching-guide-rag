
import { jsPDF } from 'jspdf';
import { toast } from "sonner";

export const generatePDF = (guideContent: string, theme: string): void => {
  try {
    // Create new PDF document
    const doc = new jsPDF();
    
    // Set title
    doc.setFontSize(18);
    doc.text(`Yoga Teaching Guide: ${theme}`, 20, 20);
    
    // Set content
    doc.setFontSize(12);
    
    // Split the text into lines that fit the page width
    const textLines = doc.splitTextToSize(guideContent, 170);
    
    // Add text with line breaks
    doc.text(textLines, 20, 30);
    
    // Save the PDF
    doc.save(`yoga-teaching-guide-${theme.toLowerCase().replace(/\s+/g, '-')}.pdf`);
    
    toast.success("PDF downloaded successfully!");
  } catch (error) {
    console.error("Error creating PDF:", error);
    toast.error("Failed to create PDF", {
      description: "Please try again later."
    });
  }
};
