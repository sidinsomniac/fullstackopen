import express from "express";
import diagnosisService from "../services/diagnosisService";
const router = express.Router();

router.get("/", (_, res) => {
  res.json(diagnosisService.getData());
});

router.post("/", (_, res) => {
  res.send("Saved new diagnosis");
});

export default router;
