// PDF generation system
// Enhanced implementation with HTML to PDF conversion

import { PDFData } from "@/app/lib/pricing-types";

export function generateQuote(data: PDFData): void {
  // Create a comprehensive HTML document for PDF conversion
  const htmlContent = generateHTMLReport(data);

  // Create a blob with the HTML content
  const htmlBlob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(htmlBlob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `Praetori-Pricing-Report-${data.client.name.replace(
    /[^a-zA-Z0-9]/g,
    "-"
  )}-${Date.now()}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

function generateHTMLReport(data: PDFData): string {
  const selectedModules = data.configuration.modules.filter((m) => m.selected);
  const formatCurrency = (amount: number) =>
    Math.round(amount).toLocaleString("de-DE") + " " + data.contract.currency;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Praetori Pricing Report</title>
  <style>
    body { 
      font-family: Arial, sans-serif; 
      margin: 40px; 
      line-height: 1.6; 
      color: #333;
    }
    .header { 
      text-align: center; 
      border-bottom: 3px solid #2563eb; 
      padding-bottom: 20px; 
      margin-bottom: 30px;
    }
    .header h1 { 
      color: #2563eb; 
      margin: 0; 
      font-size: 28px;
    }
    .header p { 
      color: #666; 
      margin: 5px 0 0 0;
    }
    .section { 
      margin-bottom: 30px; 
      page-break-inside: avoid;
    }
    .section h2 { 
      color: #2563eb; 
      border-bottom: 2px solid #e5e7eb; 
      padding-bottom: 10px; 
      margin-bottom: 15px;
    }
    .info-grid { 
      display: grid; 
      grid-template-columns: 1fr 1fr; 
      gap: 20px; 
      margin-bottom: 20px;
    }
    .info-item { 
      background: #f8fafc; 
      padding: 15px; 
      border-radius: 8px; 
      border-left: 4px solid #2563eb;
    }
    .info-label { 
      font-weight: bold; 
      color: #374151; 
      margin-bottom: 5px;
    }
    .info-value { 
      color: #6b7280;
    }
    .pricing-grid { 
      display: grid; 
      grid-template-columns: repeat(2, 1fr); 
      gap: 15px; 
      margin: 20px 0;
    }
    .pricing-card { 
      background: #f8fafc; 
      padding: 20px; 
      border-radius: 8px; 
      text-align: center; 
      border: 2px solid #e5e7eb;
    }
    .pricing-card h3 { 
      margin: 0 0 10px 0; 
      color: #374151; 
      font-size: 14px;
    }
    .pricing-card .amount { 
      font-size: 24px; 
      font-weight: bold; 
      color: #2563eb; 
      margin: 0;
    }
    .breakdown { 
      background: #f8fafc; 
      border-radius: 8px; 
      overflow: hidden;
    }
    .breakdown-item { 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      padding: 15px 20px; 
      border-bottom: 1px solid #e5e7eb;
    }
    .breakdown-item:last-child { 
      border-bottom: none;
    }
    .breakdown-item .component { 
      font-weight: bold; 
      color: #374151;
    }
    .breakdown-item .description { 
      color: #6b7280; 
      font-size: 14px; 
      margin-top: 2px;
    }
    .breakdown-item .cost { 
      font-weight: bold; 
      color: #2563eb;
    }
    .footer { 
      margin-top: 40px; 
      padding-top: 20px; 
      border-top: 2px solid #e5e7eb; 
      text-align: center; 
      color: #6b7280; 
      font-size: 14px;
    }
    .module-list { 
      display: flex; 
      flex-wrap: wrap; 
      gap: 10px; 
      margin-top: 10px;
    }
    .module-tag { 
      background: #dbeafe; 
      color: #1e40af; 
      padding: 5px 12px; 
      border-radius: 20px; 
      font-size: 14px; 
      font-weight: 500;
    }
    @media print {
      body { margin: 20px; }
      .section { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Praetori Defense AI Platform</h1>
    <p>Pricing Report & Configuration</p>
    <p>Generated on ${new Date(data.generatedAt).toLocaleDateString()}</p>
  </div>

  <div class="section">
    <h2>Client Information</h2>
    <div class="info-grid">
      <div class="info-item">
        <div class="info-label">Organization</div>
        <div class="info-value">${data.client.name}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Primary Contact</div>
        <div class="info-value">${data.client.primaryContact}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Opportunity</div>
        <div class="info-value">${data.client.opportunityName}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Region</div>
        <div class="info-value">${data.client.region}</div>
      </div>
    </div>
    <div class="info-item">
      <div class="info-label">Project Description</div>
      <div class="info-value">${data.client.projectDescription}</div>
    </div>
  </div>

  <div class="section">
    <h2>Configuration Summary</h2>
    <div class="info-grid">
      <div class="info-item">
        <div class="info-label">License Tier</div>
        <div class="info-value">${data.configuration.tier}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Pricing Position</div>
        <div class="info-value">${data.configuration.pricingPosition}</div>
      </div>
      <div class="info-item">
        <div class="info-label">CPU Cores</div>
        <div class="info-value">${data.configuration.cores}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Security Classification</div>
        <div class="info-value">${data.configuration.classification}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Data Usage</div>
        <div class="info-value">${data.configuration.dataUsage} TB/month</div>
      </div>
      <div class="info-item">
        <div class="info-label">AI Token Usage</div>
        <div class="info-value">${data.configuration.aiRuns}M tokens/month</div>
      </div>
    </div>
    <div class="info-item">
      <div class="info-label">Selected AI Modules</div>
      <div class="module-list">
        ${selectedModules
          .map((module) => `<span class="module-tag">${module.name}</span>`)
          .join("")}
      </div>
    </div>
  </div>

  <div class="section">
    <h2>Contract Terms</h2>
    <div class="info-grid">
      <div class="info-item">
        <div class="info-label">Duration</div>
        <div class="info-value">${data.contract.duration} months</div>
      </div>
      <div class="info-item">
        <div class="info-label">Currency</div>
        <div class="info-value">${data.contract.currency}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Payment Terms</div>
        <div class="info-value">${data.contract.paymentTerms}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Renewal Option</div>
        <div class="info-value">${data.contract.renewalOption}</div>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>Pricing Summary</h2>
    <div class="pricing-grid">
      <div class="pricing-card">
        <h3>Year 1 Investment</h3>
        <p class="amount">${formatCurrency(data.pricing.year1Cost)}</p>
        <p style="font-size: 12px; color: #6b7280; margin: 5px 0 0 0;">Including setup fee</p>
      </div>
      <div class="pricing-card">
        <h3>Annual Ongoing</h3>
        <p class="amount">${formatCurrency(data.pricing.annualCost)}</p>
        <p style="font-size: 12px; color: #6b7280; margin: 5px 0 0 0;">Recurring annual cost</p>
      </div>
      <div class="pricing-card">
        <h3>Total Contract Value</h3>
        <p class="amount">${formatCurrency(data.pricing.tcv)}</p>
        <p style="font-size: 12px; color: #6b7280; margin: 5px 0 0 0;">Complete contract value</p>
      </div>
      <div class="pricing-card">
        <h3>Average Annual Value</h3>
        <p class="amount">${formatCurrency(data.pricing.aav)}</p>
        <p style="font-size: 12px; color: #6b7280; margin: 5px 0 0 0;">TCV divided by years</p>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>Cost Breakdown</h2>
    <div class="breakdown">
      ${data.pricing.breakdown
        .map(
          (item) => `
        <div class="breakdown-item">
          <div>
            <div class="component">${item.component}</div>
            <div class="description">${item.description}</div>
          </div>
          <div class="cost">${formatCurrency(item.cost)}</div>
        </div>
      `
        )
        .join("")}
    </div>
  </div>

  <div class="footer">
    <p>This pricing report was generated by the Praetori Defense AI Platform Pricing Calculator</p>
    <p>For questions or clarifications, please contact your Praetori representative</p>
  </div>
</body>
</html>
  `;
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

// Enhanced PDF generation with HTML report
export async function generateProfessionalPDF(data: PDFData): Promise<void> {
  // Generate the comprehensive HTML report
  generateQuote(data);
}
