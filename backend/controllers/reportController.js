import { generateReport } from "../services/reportService.js";

export const analyzeCompany = async (req, res) => {
    const companyName = req.body.company;
    const report = await generateReport(companyName);
    res.json(report);
};