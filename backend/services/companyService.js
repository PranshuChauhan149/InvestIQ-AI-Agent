
import https from "https";

const WIKIDATA_API = "https://www.wikidata.org/w/api.php";
const companyInfoCache = new Map();

const requestJson = (url) =>
  new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; AIInvestmentAgent/1.0)",
          Accept: "application/json",
        },
      },
      (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          if (res.statusCode !== 200) {
            reject(
              new Error(
                `Wikidata request failed for ${url} with status ${res.statusCode}: ${data.slice(0, 200)}`
              )
            );
            return;
          }

          try {
            resolve(JSON.parse(data));
          } catch (error) {
            reject(
              new Error(
                `Invalid JSON response from Wikidata for ${url}: ${data.slice(0, 200)}`
              )
            );
          }
        });
      }
    );

    req.setTimeout(15000, () => {
      req.destroy(new Error(`Wikidata request timed out for ${url}`));
    });

    req.on("error", reject);
  });

// Step 1: find the Wikidata entity ID for a company name
const findEntityId = async (companyName) => {
  const url = `${WIKIDATA_API}?action=wbsearchentities&search=${encodeURIComponent(companyName)}&language=en&format=json&origin=*`;
  const data = await requestJson(url);
  return data.search?.[0]?.id;
};

// Step 2: resolve a Wikidata ID (like Q1420) into its readable label
const resolveLabel = async (id) => {
  const url = `${WIKIDATA_API}?action=wbgetentities&ids=${id}&props=labels&languages=en&format=json&origin=*`;
  const data = await requestJson(url);
  return data.entities?.[id]?.labels?.en?.value || null;
};
// Helper: pick the best claim from an array of Wikidata claims
const getCurrentClaim = (claimArray) => {
  if (!claimArray || claimArray.length === 0) return null;

  // 1. Prefer claims explicitly marked as "preferred" rank
  const preferred = claimArray.find((c) => c.rank === "preferred");
  if (preferred) return preferred;

  // 2. Otherwise, prefer claims with no "end time" qualifier (P582) — meaning still active
  const current = claimArray.find((c) => !c.qualifiers?.P582);
  if (current) return current;

  // 3. Fallback: just take the first one
  return claimArray[0];
};
export const getCompanyInfo = async (companyName) => {
  const normalizedName = companyName.trim().toLowerCase();
  const cached = companyInfoCache.get(normalizedName);
  if (cached) return cached;

  try {
    const entityId = await findEntityId(companyName);
    if (!entityId) throw new Error(`No Wikidata entry found for "${companyName}"`);

    const entityUrl = `${WIKIDATA_API}?action=wbgetentities&ids=${entityId}&props=claims|labels&languages=en&format=json&origin=*`;
    const data = await requestJson(entityUrl);
    const entity = data.entities[entityId];

    const claims = entity.claims;

    const industryClaim = getCurrentClaim(claims?.P452);
    const ceoClaim = getCurrentClaim(claims?.P169);

    const industryId = industryClaim?.mainsnak?.datavalue?.value?.id;
    const ceoId = ceoClaim?.mainsnak?.datavalue?.value?.id;

    const [industry, ceo] = await Promise.all([
      industryId ? resolveLabel(industryId) : null,
      ceoId ? resolveLabel(ceoId) : null,
    ]);

    const result = {
      name: entity.labels?.en?.value || companyName,
      industry,
      ceo,
    };

    companyInfoCache.set(normalizedName, result);
    return result;
  } catch (error) {
    console.warn(`Company metadata fallback for ${companyName}:`, error.message);
    const fallback = {
      name: companyName,
      industry: "Not specified",
      ceo: "Not specified",
    };

    companyInfoCache.set(normalizedName, fallback);
    return fallback;
  }
};