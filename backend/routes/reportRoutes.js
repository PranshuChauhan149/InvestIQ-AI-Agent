import { Router } from "express";
import { analyzeCompany } from "../controllers/reportController.js";

const reportRouter = Router();

reportRouter.post("/analyze", analyzeCompany);

export default reportRouter;
