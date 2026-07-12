import { analyzeResearch } from "../ai/agent.js";

export async function generateAIReport(researchData) {
    return await analyzeResearch(researchData);
}