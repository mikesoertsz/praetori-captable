"use client";

import { usePricingCalculator } from "@/app/hooks/usePricingCalculator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/app/components/ui/checkbox";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/app/components/ui/stepper";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/app/components/ui/alert";
import { useState } from "react";

export default function Pricing() {
  const {
    formData,
    result,
    vat,
    discount,
    isLoading,
    errors,
    updateClient,
    updateLicense,
    updateInfrastructure,
    updateContract,
    toggleModule,
    calculate,
  } = usePricingCalculator();

  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      step: 1,
      title: "Client Information",
    },
    {
      step: 2,
      title: "License Configuration",
    },
    {
      step: 3,
      title: "Infrastructure Setup",
    },
    {
      step: 4,
      title: "Contract Terms",
    },
    {
      step: 5,
      title: "Pricing Results",
    },
  ];

  const regions = [
    { value: "Netherlands", label: "Netherlands (21% VAT)" },
    { value: "Germany", label: "Germany (19% VAT)" },
    { value: "France", label: "France (20% VAT)" },
    { value: "United Kingdom", label: "United Kingdom (20% VAT)" },
    { value: "Belgium", label: "Belgium (21% VAT)" },
    { value: "Denmark", label: "Denmark (25% VAT)" },
    { value: "Sweden", label: "Sweden (25% VAT)" },
    { value: "Norway", label: "Norway (25% VAT)" },
    { value: "Finland", label: "Finland (24% VAT)" },
    { value: "Poland", label: "Poland (23% VAT)" },
    { value: "Italy", label: "Italy (22% VAT)" },
    { value: "Spain", label: "Spain (21% VAT)" },
    { value: "Austria", label: "Austria (20% VAT)" },
    { value: "Switzerland", label: "Switzerland (7.7% VAT)" },
  ];

  const licenseTiers = [
    { value: "team", label: "Team (Tactical/Edge)" },
    { value: "unit", label: "Unit (Mission Center)" },
    { value: "command", label: "Command (HQ)" },
    { value: "national", label: "National/Coalition" },
  ];

  const pricingPositions = [
    { value: "low", label: "Low (Competitive)" },
    { value: "mid", label: "Mid (Standard)" },
    { value: "high", label: "High (Premium)" },
  ];

  const cpuCores = ["16", "32", "64", "128", "256", "512", "1024"];

  const classifications = [
    { value: "unclassified", label: "Cloud - Unclassified (15% setup)" },
    {
      value: "restricted",
      label: "Hybrid - Sovereign/Secure Cloud (25% setup)",
    },
    {
      value: "airgapped",
      label: "Air-gapped - Confidential/Secret (40% setup)",
    },
    {
      value: "topsecret",
      label: "Custom - Top Secret/Multi-agency (50%+ setup)",
    },
  ];

  const dataUsages = ["1", "2", "5", "10", "15", "25", "50", "100"];

  const aiTokenUsages = ["0.5", "1", "5", "10", "20", "50", "100"];

  const contractDurations = ["12", "18", "24", "36", "48", "60"];

  const currencies = [
    { value: "EUR", label: "EUR (Euro)" },
    { value: "USD", label: "USD (US Dollar)" },
    { value: "GBP", label: "GBP (British Pound)" },
  ];

  const paymentTermsOptions = [
    { value: "Annual Advance", label: "Annual Advance" },
    { value: "Quarterly", label: "Quarterly" },
    { value: "Monthly", label: "Monthly" },
    { value: "Milestone-based", label: "Milestone-based" },
  ];

  const renewalOptions = [
    { value: "Automatic", label: "Automatic (90-day notice)" },
    { value: "Manual", label: "Manual Renewal" },
    { value: "Option", label: "Client Option" },
    { value: "None", label: "No Renewal" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight">
              Pricing Calculator
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Configure your defense AI solution
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto px-6 py-8 bg-white flex items-center justify-center w-full h-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 max-w-7xl">
          {/* Sidebar - Stepper */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Stepper
                value={activeStep}
                onValueChange={setActiveStep}
                orientation="vertical"
                className="space-y-2"
              >
                {steps.map(({ step, title }) => (
                  <StepperItem key={step} step={step} className="relative">
                    <StepperTrigger className="w-full justify-start p-3 rounded-lg hover:bg-accent">
                      <StepperIndicator />
                      <div className="ml-3 text-left">
                        <StepperTitle className="text-sm font-medium">
                          {title}
                        </StepperTitle>
                      </div>
                    </StepperTrigger>
                    {step < steps.length && (
                      <StepperSeparator className="ml-3 mt-2 mb-2" />
                    )}
                  </StepperItem>
                ))}
              </Stepper>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {activeStep === 1 && (
              <Card className="rounded-md border shadow-none bg-slate-100">
                <CardHeader>
                  <CardTitle className="text-md uppercase">
                    Client Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="clientName">Client Organization</Label>
                      <Input
                        id="clientName"
                        value={formData.client.name}
                        onChange={(e) => updateClient({ name: e.target.value })}
                        placeholder="e.g., Netherlands Ministry of Defence"
                        className="bg-white"
                      />
                      {errors.clientName && (
                        <Alert variant="destructive">
                          <AlertDescription>
                            {errors.clientName}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="primaryContact">Primary Contact</Label>
                      <Input
                        id="primaryContact"
                        value={formData.client.primaryContact}
                        onChange={(e) =>
                          updateClient({ primaryContact: e.target.value })
                        }
                        placeholder="e.g., Col. Jan van der Berg, CIO"
                        className="bg-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="opportunityName">Opportunity Name</Label>
                      <Input
                        id="opportunityName"
                        value={formData.client.opportunityName}
                        onChange={(e) =>
                          updateClient({ opportunityName: e.target.value })
                        }
                        placeholder="e.g., AI Command Platform Implementation"
                        className="bg-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="region">Region/Country</Label>
                      <Select
                        value={formData.client.region}
                        onValueChange={(value) =>
                          updateClient({ region: value })
                        }
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select Region" />
                        </SelectTrigger>
                        <SelectContent>
                          {regions.map(({ value, label }) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="projectDescription">
                      Project Description
                    </Label>
                    <textarea
                      id="projectDescription"
                      value={formData.client.projectDescription}
                      onChange={(e) =>
                        updateClient({ projectDescription: e.target.value })
                      }
                      placeholder="Describe the project scope, requirements, and objectives..."
                      className="w-full min-h-[100px] p-3 border border-input bg-white rounded-md"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {activeStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">
                    License Configuration
                  </CardTitle>
                  <CardDescription>
                    Select tier and modules based on requirements
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tier">License Tier</Label>
                      <Select
                        value={formData.license.tier}
                        onValueChange={(value) =>
                          updateLicense({ tier: value as any })
                        }
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select License Tier" />
                        </SelectTrigger>
                        <SelectContent>
                          {licenseTiers.map(({ value, label }) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.tier && (
                        <Alert variant="destructive">
                          <AlertDescription>{errors.tier}</AlertDescription>
                        </Alert>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pricingPosition">Pricing Position</Label>
                      <Select
                        value={formData.license.pricingPosition}
                        onValueChange={(value) =>
                          updateLicense({ pricingPosition: value as any })
                        }
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select Pricing Position" />
                        </SelectTrigger>
                        <SelectContent>
                          {pricingPositions.map(({ value, label }) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.pricingPosition && (
                        <Alert variant="destructive">
                          <AlertDescription>
                            {errors.pricingPosition}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>AI Modules</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {formData.license.modules.map((module) => (
                        <div
                          key={module.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={module.id}
                            checked={module.selected}
                            onCheckedChange={() => toggleModule(module.id)}
                            className="bg-white"
                          />
                          <Label htmlFor={module.id} className="text-sm">
                            {module.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {errors.modules && (
                      <Alert variant="destructive">
                        <AlertDescription>{errors.modules}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">
                    Infrastructure Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure cores, security classification, and usage
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cores">CPU Cores</Label>
                      <Select
                        value={formData.infrastructure.cores.toString()}
                        onValueChange={(value) =>
                          updateInfrastructure({ cores: parseInt(value) })
                        }
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select CPU Cores" />
                        </SelectTrigger>
                        <SelectContent>
                          {cpuCores.map((value) => (
                            <SelectItem key={value} value={value}>
                              {value} cores
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.cores && (
                        <Alert variant="destructive">
                          <AlertDescription>{errors.cores}</AlertDescription>
                        </Alert>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="classification">
                        Security Classification
                      </Label>
                      <Select
                        value={formData.infrastructure.classification}
                        onValueChange={(value) =>
                          updateInfrastructure({ classification: value as any })
                        }
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select Security Classification" />
                        </SelectTrigger>
                        <SelectContent>
                          {classifications.map(({ value, label }) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.classification && (
                        <Alert variant="destructive">
                          <AlertDescription>
                            {errors.classification}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dataUsage">Monthly Data Usage (TB)</Label>
                      <Select
                        value={formData.infrastructure.dataUsage.toString()}
                        onValueChange={(value) =>
                          updateInfrastructure({ dataUsage: parseFloat(value) })
                        }
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select Data Usage" />
                        </SelectTrigger>
                        <SelectContent>
                          {dataUsages.map((value) => (
                            <SelectItem key={value} value={value}>
                              {value} TB/month
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="aiRuns">
                        Monthly AI Token Usage (Millions)
                      </Label>
                      <Select
                        value={formData.infrastructure.aiRuns.toString()}
                        onValueChange={(value) =>
                          updateInfrastructure({ aiRuns: parseFloat(value) })
                        }
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select Token Usage" />
                        </SelectTrigger>
                        <SelectContent>
                          {aiTokenUsages.map((value) => (
                            <SelectItem key={value} value={value}>
                              {value}M tokens/month
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeStep === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Contract Terms</CardTitle>
                  <CardDescription>
                    Set duration, payment terms, and renewal options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Contract Duration</Label>
                      <Select
                        value={formData.contract.duration.toString()}
                        onValueChange={(value) =>
                          updateContract({ duration: parseInt(value) })
                        }
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select Duration" />
                        </SelectTrigger>
                        <SelectContent>
                          {contractDurations.map((value) => (
                            <SelectItem key={value} value={value}>
                              {value} months
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.duration && (
                        <Alert variant="destructive">
                          <AlertDescription>{errors.duration}</AlertDescription>
                        </Alert>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select
                        value={formData.contract.currency}
                        onValueChange={(value) =>
                          updateContract({ currency: value as any })
                        }
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select Currency" />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map(({ value, label }) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="paymentTerms">Payment Terms</Label>
                      <Select
                        value={formData.contract.paymentTerms}
                        onValueChange={(value) =>
                          updateContract({ paymentTerms: value as any })
                        }
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select Payment Terms" />
                        </SelectTrigger>
                        <SelectContent>
                          {paymentTermsOptions.map(({ value, label }) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.paymentTerms && (
                        <Alert variant="destructive">
                          <AlertDescription>
                            {errors.paymentTerms}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="renewalOption">Renewal Option</Label>
                      <Select
                        value={formData.contract.renewalOption}
                        onValueChange={(value) =>
                          updateContract({ renewalOption: value as any })
                        }
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select Renewal Option" />
                        </SelectTrigger>
                        <SelectContent>
                          {renewalOptions.map(({ value, label }) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.renewalOption && (
                        <Alert variant="destructive">
                          <AlertDescription>
                            {errors.renewalOption}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeStep === 5 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Pricing Results</CardTitle>
                  <CardDescription>
                    Review calculated pricing and generate proposals
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                      <p className="mt-2 text-muted-foreground">
                        Calculating pricing...
                      </p>
                    </div>
                  ) : result ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">
                              Year 1 Investment
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">
                              {result.year1Cost.toLocaleString("de-DE")}{" "}
                              {formData.contract.currency}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Including setup fee
                            </p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">
                              Annual Ongoing
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">
                              {result.annualCost.toLocaleString("de-DE")}{" "}
                              {formData.contract.currency}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Recurring annual cost
                            </p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">
                              Total Contract Value
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">
                              {result.tcv.toLocaleString("de-DE")}{" "}
                              {formData.contract.currency}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Complete contract value
                            </p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">
                              Average Annual Value
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">
                              {result.aav.toLocaleString("de-DE")}{" "}
                              {formData.contract.currency}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              TCV divided by years
                            </p>
                          </CardContent>
                        </Card>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">
                          Cost Breakdown
                        </h3>
                        <div className="space-y-2">
                          {result.breakdown.map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-3 border rounded-lg"
                            >
                              <div>
                                <p className="font-medium">{item.component}</p>
                                <p className="text-sm text-muted-foreground">
                                  {item.description}
                                </p>
                              </div>
                              <Badge variant="secondary">
                                {item.cost.toLocaleString("de-DE")}{" "}
                                {formData.contract.currency}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div className="flex gap-4">
                        <Button className="flex-1">
                          Generate Professional Proposal
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Save Quote Data
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        Complete the form sections above to see pricing results
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
