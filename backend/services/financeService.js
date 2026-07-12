import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance({ suppressNotices: ["yahooSurvey"] });

export const getFinanceData = async (companyName) => {
  const searchResults = await yahooFinance.search(companyName);
  const bestMatch = searchResults.quotes?.[0];

  if (!bestMatch || !bestMatch.symbol) {
    throw new Error(`No matching ticker found for "${companyName}"`);
  }

  const symbol = bestMatch.symbol;

  const summary = await yahooFinance.quoteSummary(symbol, {
    modules: ["summaryDetail", "financialData", "defaultKeyStatistics"],
  });

  const { summaryDetail, financialData, defaultKeyStatistics } = summary;

  let revenueGrowth = null;
  try {
    const timeSeries = await yahooFinance.fundamentalsTimeSeries(symbol, {
      period1: "2021-01-01",
      module: "financials",
      type: "annual",
    });

    const revenues = timeSeries
      ?.map((entry) => entry.totalRevenue)
      .filter((val) => val != null)
      .sort((a, b) => a - b);

    if (revenues?.length >= 2) {
      const latest = revenues[revenues.length - 1];
      const previous = revenues[revenues.length - 2];
      revenueGrowth = ((latest - previous) / previous) * 100;
    }
  } catch (err) {
    console.warn(`Could not fetch revenue growth for ${symbol}:`, err.message);
  }

  return {
    symbol,
    revenue: financialData?.totalRevenue ?? null,
    netIncome: financialData?.netIncomeToCommon ?? null,
    marketCap: summaryDetail?.marketCap ?? null,
    profitMargin: financialData?.profitMargins ? financialData.profitMargins * 100 : null,
    revenueGrowth: revenueGrowth ? Number(revenueGrowth.toFixed(2)) : null,
    peRatio: summaryDetail?.trailingPE ?? null,
    eps: defaultKeyStatistics?.trailingEps ?? null,
    dividendYield: summaryDetail?.dividendYield ? summaryDetail.dividendYield * 100 : null,
    week52High: summaryDetail?.fiftyTwoWeekHigh ?? null,
    week52Low: summaryDetail?.fiftyTwoWeekLow ?? null,
    debtToEquity: financialData?.debtToEquity ?? null,
    currentRatio: financialData?.currentRatio ?? null,
    roe: financialData?.returnOnEquity ? financialData.returnOnEquity * 100 : null,
  };
};