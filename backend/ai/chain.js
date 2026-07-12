import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { investmentPrompt } from "./prompt.js";
import { InvestmentReportSchema } from "./schema.js";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash",
  apiKey: process.env.GEMINI_API_KEY,
  temperature: 0.3,
});

const structuredModel = model.withStructuredOutput(
  InvestmentReportSchema
);

export const investmentChain = investmentPrompt.pipe(structuredModel);