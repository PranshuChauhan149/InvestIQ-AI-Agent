const NEWS_API_URL = "https://newsapi.org/v2/everything";

const filterRelevantArticles = (articles, companyName, symbol) => {
  const nameLower = companyName.toLowerCase();
  const symbolLower = symbol?.toLowerCase();

  return articles
    .filter((article) => {
      const title = article.title?.toLowerCase() || "";
      const description = article.description?.toLowerCase() || "";

      const mentionsName = title.includes(nameLower) || description.includes(nameLower);
      const mentionsSymbol =
        symbolLower && (title.includes(symbolLower) || description.includes(symbolLower));

      return mentionsName || mentionsSymbol;
    })
    .slice(0, 5)
    .map((article) => ({
      title: article.title,
      description: article.description,
    }));
};

export const getCompanyNews = async (companyName, symbol) => {
  const query = `"${companyName}"`; // exact phrase match

  const url = `${NEWS_API_URL}?qInTitle=${encodeURIComponent(
    query
  )}&domains=reuters.com,bloomberg.com,cnbc.com,marketwatch.com,finance.yahoo.com&sortBy=publishedAt&language=en&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== "ok") {
    throw new Error(data.message || "Failed to fetch news");
  }

  return filterRelevantArticles(data.articles, companyName, symbol);
};