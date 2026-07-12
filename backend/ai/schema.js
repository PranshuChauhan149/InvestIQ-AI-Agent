import { z } from "zod";

export const InvestmentReportSchema = z.object({
  companyOverview: z.object({
    summary: z.string(),
    industry: z.string(),
    ceo: z.string(),
  }),

  financialAnalysis: z.object({
    rating: z.enum(["Strong", "Moderate", "Weak"]),
    summary: z.string(),
    keyMetrics: z.array(z.string()),
  }),

  newsAnalysis: z.object({
    sentiment: z.enum(["Positive", "Neutral", "Negative"]),
    summary: z.string(),
    keyEvents: z.array(z.string()),
  }),

  strengths: z.array(z.string()),

  weaknesses: z.array(z.string()),

  opportunities: z.array(z.string()),

  risks: z.array(z.string()),

  recommendation: z.enum(["Invest", "Pass"]),

  confidence: z.number().min(0).max(100),

  reasoning: z.string(),
});