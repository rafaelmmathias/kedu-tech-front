import { BilletType } from "@/constants";

type BilletType = (typeof BilletType)[keyof typeof BilletType];
type Day = {
  monthDay: number;
  percentage: number;
};
export type Company = {
  id?: string;
  name: string;
  cnpj: string;
  registeredAt?: string;
  billetType?: BilletType;
  tax?: number;
  systemName?: string;
  legalRepresentative?: string;
  legalRepresentativeEmail?: string;
  legalRepresentativePhone?: string;
  contractualTerm?: number;
  cashback?: boolean;
  fine?: number;
  interest?: number;
  address?: {
    line1?: string;
    line2?: string;
    district?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  days?: Day[];
};

export type PlanFilters = {
  period: [string, string];
};
export type Plan = {
  id: string;
  studentName: string;
  ownerName: string;
  ownerDocument: string;
  planDescription: string;
  dueDate: string;
  value: number;
};

export type PlanRow = Plan & {
  overdue: number;
};

export type PlanStatement = {
  id: string;
  index: number;
};

export type CompanyStats = {
  planCount: number;
  totalValue: number;
  defaultLoan: number;
  receivedValue: number;
};
