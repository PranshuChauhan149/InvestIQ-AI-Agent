import { investmentChain } from "./chain.js";

export async function analyzeResearch(researchData) {

  try{
    const report = await investmentChain.invoke({

    company: JSON.stringify(researchData.company, null, 2),

    finance: JSON.stringify(researchData.finance, null, 2),

    news: JSON.stringify(researchData.news, null, 2),

  });

  return report;
  }
  catch (error) {
    console.error("Gemini call failed:", error.message);
    throw error;
  }

}