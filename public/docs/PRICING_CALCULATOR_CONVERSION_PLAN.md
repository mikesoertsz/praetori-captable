# Praetori Pricing Calculator - Next.js 15+ Conversion Plan

## Overview

Convert the standalone HTML pricing calculator into a fully integrated Next.js 15+ application following modern React patterns and the existing app structure.

## Project Structure Analysis

### Current HTML Features to Preserve

- ✅ Complete pricing calculation logic (DO NOT MODIFY)
- ✅ All form fields and validation
- ✅ VAT calculation system
- ✅ PDF generation functionality
- ✅ Professional proposal generation
- ✅ European number formatting
- ✅ Multi-currency support
- ✅ Discount system (auto + manual)
- ✅ Security classification pricing
- ✅ Module-based pricing
- ✅ Tooltip system with detailed explanations

## Conversion Checklist

### 1. Type Definitions (`app/lib/pricing-types.ts`)

- [ ] **ClientInfo** - Client organization, contact, opportunity details
- [ ] **LicenseConfig** - Tier, modules, pricing position
- [ ] **InfrastructureConfig** - Cores, classification, data/AI usage
- [ ] **ContractTerms** - Duration, payment, renewal, currency
- [ ] **PricingResult** - Year 1, annual, TCV, AAV calculations
- [ ] **VATConfig** - Rate, region, inclusive/exclusive toggle
- [ ] **DiscountConfig** - Auto discounts, additional discounts
- [ ] **ModuleConfig** - Available modules with multipliers
- [ ] **SecurityClassification** - Pricing tiers for different security levels

### 2. Core Components Structure

#### 2.1 Main Layout (`app/pricing/page.tsx`)

- [ ] **PricingCalculator** - Main container component
- [ ] **VideoBackground** - Animated grid background
- [ ] **NotificationSystem** - Toast notifications
- [ ] **Header** - Praetori branding and title

#### 2.2 Form Sections (`app/components/pricing/`)

- [ ] **ClientInformationSection** - Client details form
- [ ] **LicenseConfigurationSection** - Tier and module selection
- [ ] **InfrastructureSection** - Cores, security, usage configuration
- [ ] **ContractTermsSection** - Duration, payment, renewal options
- [ ] **ResultsSection** - Pricing display and breakdown

#### 2.3 Form Components (`app/components/pricing/forms/`)

- [ ] **FormGroup** - Reusable form field wrapper
- [ ] **Tooltip** - Help system with detailed explanations
- [ ] **ModuleSelector** - Checkbox grid for AI modules
- [ ] **CustomField** - Conditional custom input fields
- [ ] **ToggleSwitch** - VAT and discount toggles
- [ ] **CurrencySelector** - Multi-currency support

#### 2.4 Results Components (`app/components/pricing/results/`)

- [ ] **PricingSummary** - Main pricing cards (Year 1, Annual, TCV, AAV)
- [ ] **BreakdownTable** - Detailed cost breakdown
- [ ] **VATSection** - VAT information and toggle
- [ ] **ActionButtons** - PDF generation and data export

### 3. Business Logic (`app/lib/pricing-engine.ts`)

- [ ] **calculatePricing()** - Main calculation function (preserve exact logic)
- [ ] **getVATRate()** - VAT rate calculation by region
- [ ] **formatEuropean()** - European number formatting
- [ ] **detectNATOMOD()** - Client type detection
- [ ] **getModuleMultipliers()** - Module pricing multipliers
- [ ] **getSecurityPricing()** - Security classification pricing
- [ ] **calculateDiscounts()** - Auto and manual discount logic

### 4. State Management (`app/hooks/usePricingCalculator.ts`)

- [ ] **Form state management** - All form fields
- [ ] **Calculation state** - Pricing results
- [ ] **UI state** - Toggles, custom fields visibility
- [ ] **Validation state** - Form validation
- [ ] **Auto-fill logic** - Tier-based recommendations

### 5. PDF Generation (`app/lib/pdf-generator.ts`)

- [ ] **generateQuote()** - Professional PDF proposal
- [ ] **jsPDF integration** - PDF library setup
- [ ] **Template system** - Professional proposal layout
- [ ] **Data export** - JSON quote data export

### 6. Styling & UI (`app/components/pricing/`)

- [ ] **Dark theme** - Preserve existing dark theme
- [ ] **Responsive design** - Mobile-first approach
- [ ] **Animation system** - Grid background, particles
- [ ] **Color scheme** - Orange/teal accent colors
- [ ] **Typography** - Inter font family
- [ ] **Component styling** - Tailwind CSS classes

### 7. Data Sources & Configuration

#### 7.1 Static Data (`app/data/pricing-config.ts`)

- [ ] **Tier pricing ranges** - Team, Unit, Command, National
- [ ] **Module configurations** - Available modules with multipliers
- [ ] **Security classifications** - Pricing by security level
- [ ] **VAT rates** - European country VAT rates
- [ ] **Currency rates** - EUR, USD, GBP conversion
- [ ] **Region data** - Country/region configurations

#### 7.2 Form Options (`app/data/pricing-options.ts`)

- [ ] **License tiers** - Available tier options
- [ ] **Security levels** - Classification options
- [ ] **Payment terms** - Available payment options
- [ ] **Renewal options** - Contract renewal types
- [ ] **Duration options** - Contract duration presets

### 8. Integration Points

#### 8.1 Navigation (`components/navbar.tsx`)

- [ ] **Update navbar** - Add pricing route (already exists)
- [ ] **Active state** - Highlight current page
- [ ] **Route handling** - Navigation between cap table and pricing

#### 8.2 Layout Integration (`app/layout.tsx`)

- [ ] **Global styles** - Ensure pricing styles don't conflict
- [ ] **Font loading** - Inter font for pricing calculator
- [ ] **Meta tags** - SEO optimization for pricing page

### 9. Performance & Optimization

- [ ] **Lazy loading** - Code splitting for pricing components
- [ ] **Memoization** - Optimize calculation performance
- [ ] **Debouncing** - Form input optimization
- [ ] **Bundle optimization** - Minimize PDF library impact

### 10. Testing & Validation

- [ ] **Calculation accuracy** - Verify all pricing calculations match HTML
- [ ] **Form validation** - Required field validation
- [ ] **PDF generation** - Test PDF output quality
- [ ] **Responsive testing** - Mobile and desktop compatibility
- [ ] **Cross-browser testing** - Browser compatibility

## Implementation Priority

### Phase 1: Core Structure (Week 1)

1. Type definitions and data structures
2. Basic component structure
3. Form state management
4. Core calculation engine

### Phase 2: UI Components (Week 2)

1. Form sections and components
2. Results display components
3. Styling and responsive design
4. Animation and visual effects

### Phase 3: Advanced Features (Week 3)

1. PDF generation system
2. Data export functionality
3. Advanced form features (tooltips, auto-fill)
4. Performance optimization

### Phase 4: Integration & Testing (Week 4)

1. Navigation integration
2. Cross-browser testing
3. Performance optimization
4. Final validation and bug fixes

## Key Considerations

### Preserve Exact Functionality

- **DO NOT** modify any pricing calculations
- **DO NOT** change business logic or formulas
- **DO NOT** alter VAT calculations or discount logic
- **PRESERVE** all tooltip content and explanations

### Modern React Patterns

- Use React 18+ features (hooks, concurrent features)
- Implement proper TypeScript typing
- Follow Next.js 15+ conventions
- Use Tailwind CSS for styling
- Implement proper error boundaries

### User Experience

- Maintain the professional, military-grade aesthetic
- Preserve all interactive features
- Ensure responsive design
- Keep the dark theme and orange/teal color scheme

### Performance

- Optimize for large form calculations
- Implement proper memoization
- Use code splitting for PDF generation
- Ensure fast page loads

## Success Criteria

- [ ] All pricing calculations match HTML version exactly
- [ ] PDF generation produces identical output
- [ ] Responsive design works on all devices
- [ ] Performance is equal or better than HTML version
- [ ] Integration with existing app is seamless
- [ ] Code is maintainable and follows Next.js best practices

## File Structure Preview

```
app/
├── pricing/
│   └── page.tsx                    # Main pricing page
├── components/
│   └── pricing/
│       ├── PricingCalculator.tsx   # Main container
│       ├── sections/               # Form sections
│       ├── forms/                  # Reusable form components
│       ├── results/                # Results display
│       └── ui/                     # Pricing-specific UI components
├── lib/
│   ├── pricing-types.ts           # Type definitions
│   ├── pricing-engine.ts          # Calculation logic
│   └── pdf-generator.ts           # PDF generation
├── data/
│   ├── pricing-config.ts          # Static configuration
│   └── pricing-options.ts         # Form options
└── hooks/
    └── usePricingCalculator.ts    # State management
```

This plan ensures a complete, professional conversion while preserving all existing functionality and maintaining the high-quality user experience of the original HTML calculator.
