import express from "express";
import { getAqiByCity } from "../services/aqi_service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "City name is required" });
  }

  try {
    const result = await getAqiByCity(city);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
