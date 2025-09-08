export interface Founder {
  name: string;
  ownership: number;
}

export interface CapTable {
  founders: number;
  investors: number;
  optionPool: number;
  advisors: number;
}

export interface FundingRound {
  id: string;
  name: string;
  preMoneyValuation: number;
  amountRaised: number;
  postMoneyValuation: number;
  targetDilution: number;
  optionPoolSize: number;
  optionPoolRefresh: "pre-money" | "post-money";
  advisors: number;
  status: "planned" | "completed" | "in-progress";
  capTable: CapTable;
  summary: string;
}

export interface Company {
  name: string;
  founded: string;
}

export interface OptionPool {
  currentSize: number;
  refreshStrategy: "pre-money" | "post-money";
}

export interface Advisors {
  totalAllocation: number;
}

export interface FundingData {
  company: Company;
  founders: Record<string, Founder>;
  rounds: FundingRound[];
  optionPool: OptionPool;
  advisors: Advisors;
}

export interface ChartData {
  name: string;
  founders: number;
  investors: number;
  optionPool: number;
  advisors: number;
}
