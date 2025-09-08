# Funding Round Planning App - Technical Plan

## Overview

A single-page application for planning and visualizing startup funding rounds from Seed to Series C, with interactive calculations and real-time cap table updates.

## App Architecture

### Layout Structure

- **Full-screen application** with 2-column grid layout
- **Left Column**: Input controls and variables (scrollable, hidden scrollbars)
- **Right Column**: Round visualization and summaries (scrollable, hidden scrollbars)
- **Grid System**: CSS Grid for responsive column management
- **No custom styling**: Pure shadcn components only, no additional CSS

### Data Structure (JSON)

```json
{
  "company": {
    "name": "StartupCo",
    "founded": "2024"
  },
  "founders": {
    "founder1": {
      "name": "Founder 1",
      "ownership": 49
    },
    "founder2": {
      "name": "Founder 2",
      "ownership": 51
    }
  },
  "rounds": [
    {
      "id": "seed",
      "name": "Seed",
      "preMoneyValuation": 150000000,
      "amountRaised": 10000000,
      "postMoneyValuation": 160000000,
      "targetDilution": 6.25,
      "optionPoolSize": 10,
      "optionPoolRefresh": "post-money",
      "advisors": 1,
      "status": "planned",
      "capTable": {
        "founders": 92.5,
        "investors": 6.25,
        "optionPool": 10,
        "advisors": 1
      },
      "summary": "Raising €10M at €150M pre-money valuation. This gives investors 6.25% ownership and establishes a €160M post-money valuation. Founders retain 92.5% after accounting for the 10% option pool."
    }
  ],
  "optionPool": {
    "currentSize": 10,
    "refreshStrategy": "post-money"
  },
  "advisors": {
    "totalAllocation": 1
  }
}
```

## Component Architecture

### Core Components

1. **App.tsx** - Main container with grid layout
2. **InputPanel.tsx** - Left column input controls
3. **RoundVisualization.tsx** - Right column round display
4. **RoundCard.tsx** - Individual round summary component
5. **CapTableDisplay.tsx** - Ownership breakdown visualization
6. **CalculationEngine.ts** - Business logic for round calculations

### Input Panel Components

- **FounderInputs.tsx** - Founder ownership controls
- **RoundInputs.tsx** - Round-specific inputs (valuation, amount, dilution)
- **OptionPoolControls.tsx** - Option pool size and refresh strategy
- **AdvisorControls.tsx** - Advisor allocation controls
- **GlobalSettings.tsx** - Company-wide settings

### Visualization Components

- **RoundSummary.tsx** - Round details and calculations
- **OwnershipChart.tsx** - Visual ownership breakdown (recharts stacked bar)
- **DilutionTracker.tsx** - Cumulative dilution tracking
- **ValuationTimeline.tsx** - Valuation progression chart
- **RoundList.tsx** - UL/LI structure for rounds display
- **RoundListItem.tsx** - Individual round LI component with consistent structure

## Round Mechanics & Calculations

### Core Calculations

1. **Post-money Valuation** = Pre-money + Amount Raised
2. **Investor Ownership** = Amount Raised / Post-money Valuation
3. **Founder Dilution** = (New Investor % + Option Pool % + Advisor %)
4. **Remaining Founder %** = Previous % × (1 - Dilution %)

### Option Pool Mechanics

- **Pre-money refresh**: Dilution affects only founders
- **Post-money refresh**: Dilution shared between founders and new investors
- **Standard pool size**: 10-15% of company
- **Refresh timing**: Before major rounds

### Round Progression Logic

- **Seed**: 5-8% dilution, €10M raise
- **Series A**: ~15% dilution, €50M raise
- **Series B**: ~15% dilution, €150M raise
- **Series C**: ~15% dilution, €250M raise
- **Target**: Unicorn status (€1B+) with <30% total founder dilution

## User Interface Design

### Left Column (Input Panel)

- **Company Settings**
  - Company name input
  - Founded date picker
- **Founder Configuration**

  - Founder name inputs
  - Ownership percentage sliders
  - Add/remove founder buttons

- **Round Planning**

  - Round selection (Seed, A, B, C)
  - Pre-money valuation input
  - Amount to raise input
  - Target dilution slider
  - Option pool size control
  - Pool refresh strategy toggle

- **Advisor Management**
  - Total advisor allocation slider
  - Individual advisor inputs

### Right Column (Visualization)

- **Round List** (UL/LI structure, Seed → Series C)

  - Each LI contains consistent structure:
    - Round name and status
    - Pre-money valuation
    - Amount raised
    - Post-money valuation
    - Dilution percentage
    - 2-3 line summary explanation
    - **Stacked bar chart** showing cap table split (recharts)
      - Founders (blue)
      - Investors (green)
      - Option Pool (orange)
      - Advisors (purple)

- **Cap Table Summary**
  - Current ownership percentages
  - Dilution impact visualization
  - Valuation progression chart

## Technical Implementation

### State Management

- **React Context** for global app state
- **useReducer** for complex state updates
- **Local state** for component-specific data

### Chart Library

- **Recharts** for stacked bar charts in each round
- **StackedBarChart** component for cap table visualization
- **Responsive design** with consistent chart sizing across rounds

### Data Flow

1. User inputs → State update
2. State change → Calculation engine
3. Calculations → Component re-render
4. Results → Visualization update

### Key Hooks

- **useFundingRounds** - Round data management
- **useCapTable** - Ownership calculations
- **useValuation** - Valuation progression
- **useDilution** - Dilution tracking
- **useChartData** - Transform cap table data for recharts format

## File Structure

```
/app
  /components
    /ui (shadcn components)
    /input
      - FounderInputs.tsx
      - RoundInputs.tsx
      - OptionPoolControls.tsx
      - AdvisorControls.tsx
    /visualization
      - RoundList.tsx
      - RoundListItem.tsx
      - CapTableDisplay.tsx
      - OwnershipChart.tsx
      - DilutionTracker.tsx
    - App.tsx
    - InputPanel.tsx
    - RoundVisualization.tsx
  /lib
    - calculationEngine.ts
    - types.ts
    - utils.ts
  /data
    - fundingRounds.json
  /hooks
    - useFundingRounds.ts
    - useCapTable.ts
    - useValuation.ts
```

## Round Summary Examples

### Seed Round

"Raising €10M at €150M pre-money valuation. This gives investors 6.25% ownership and establishes a €160M post-money valuation. Founders retain 92.5% after accounting for the 10% option pool."

### Series A

"Raising €50M at €300M pre-money valuation for 14.3% dilution. Post-money valuation reaches €350M. Founders now own 79.3% after this round and option pool refresh."

### Series B

"Raising €150M at €750M pre-money valuation for 16.7% dilution. This round pushes the company to €900M post-money, approaching unicorn status. Founder ownership drops to 66.1%."

### Series C

"Raising €250M at €1.2B pre-money valuation for 17.2% dilution. Company achieves unicorn status with €1.45B post-money valuation. Final founder ownership: 54.7%."

## Success Metrics

- **Unicorn Achievement**: €1B+ post-money valuation by Series C
- **Founder Retention**: <30% total dilution across all rounds
- **Investor Attraction**: Reasonable dilution percentages (5-8% seed, ~15% later rounds)
- **Option Pool Management**: 10-15% pool with post-money refresh strategy

## Round Visualization Structure

### UL/LI Implementation

```tsx
// RoundList.tsx - Main container
<ul className="space-y-4">
  {rounds.map((round) => (
    <RoundListItem key={round.id} round={round} />
  ))}
</ul>

// RoundListItem.tsx - Individual round structure
<li className="border p-4">
  <div className="grid grid-cols-2 gap-4">
    {/* Left side - Round details */}
    <div>
      <h3>{round.name} Round</h3>
      <div className="space-y-2">
        <div>Pre-money: €{formatCurrency(round.preMoneyValuation)}</div>
        <div>Amount Raised: €{formatCurrency(round.amountRaised)}</div>
        <div>Post-money: €{formatCurrency(round.postMoneyValuation)}</div>
        <div>Dilution: {round.targetDilution}%</div>
        <p className="text-sm">{round.summary}</p>
      </div>
    </div>

    {/* Right side - Stacked bar chart */}
    <div>
      <StackedBarChart data={round.capTable} />
    </div>
  </div>
</li>
```

### Recharts Stacked Bar Chart

```tsx
// OwnershipChart.tsx - Recharts implementation
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const StackedBarChart = ({ data }) => {
  const chartData = [
    {
      name: "Cap Table",
      founders: data.founders,
      investors: data.investors,
      optionPool: data.optionPool,
      advisors: data.advisors,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={chartData} layout="horizontal">
        <XAxis type="number" domain={[0, 100]} />
        <YAxis dataKey="name" type="category" width={80} />
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
        <Bar dataKey="founders" stackId="a" fill="#3b82f6" name="Founders" />
        <Bar dataKey="investors" stackId="a" fill="#10b981" name="Investors" />
        <Bar
          dataKey="optionPool"
          stackId="a"
          fill="#f59e0b"
          name="Option Pool"
        />
        <Bar dataKey="advisors" stackId="a" fill="#8b5cf6" name="Advisors" />
      </BarChart>
    </ResponsiveContainer>
  );
};
```

### Chart Data Transformation

```tsx
// useChartData.ts - Hook for data transformation
const useChartData = (rounds) => {
  return rounds.map((round) => ({
    ...round,
    chartData: [
      {
        name: "Cap Table",
        founders: round.capTable.founders,
        investors: round.capTable.investors,
        optionPool: round.capTable.optionPool,
        advisors: round.capTable.advisors,
      },
    ],
  }));
};
```

## Implementation Priority

1. **Phase 1**: Core data structure and calculation engine
2. **Phase 2**: Basic input controls and UL/LI round visualization
3. **Phase 3**: Recharts stacked bar charts integration
4. **Phase 4**: Advanced features and polish

This plan provides a comprehensive foundation for building a professional funding round planning application with clean architecture, proper data management, and intuitive user experience.
