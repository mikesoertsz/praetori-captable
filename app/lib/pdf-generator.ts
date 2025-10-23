// PDF generation system
// Basic implementation that can be enhanced with jsPDF later

import { PDFData } from "@/app/lib/pricing-types";

export function generateQuote(data: PDFData): void {
  // For now, create a simple JSON export
  // In production, this would use jsPDF to generate a professional PDF

  const quoteData = {
    ...data,
    generatedAt: new Date().toISOString(),
    version: "1.0",
  };

  const dataStr = JSON.stringify(quoteData, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `Praetori-Quote-${data.client.name.replace(
    /[^a-zA-Z0-9]/g,
    "-"
  )}-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

export function saveQuoteData(data: PDFData): void {
  // Save quote data for CRM integration
  const quoteData = {
    ...data,
    savedAt: new Date().toISOString(),
    type: "pricing_quote",
  };

  const dataStr = JSON.stringify(quoteData, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `Praetori-Quote-Data-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

// Future enhancement: Full PDF generation with jsPDF
export async function generateProfessionalPDF(data: PDFData): Promise<void> {
  // This would be implemented with jsPDF for full PDF generation
  // For now, fall back to JSON export
  console.log(
    "PDF generation not yet implemented, falling back to JSON export"
  );
  generateQuote(data);
}
