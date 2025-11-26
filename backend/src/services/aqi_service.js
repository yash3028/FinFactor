import axios from "axios";
import { cache } from "../utils/cache.js";
import dotenv from "dotenv";
dotenv.config();

const TOKEN = process.env.AQICN_TOKEN;

export async function getAqiByCity(city) {
  const key = `city-${city.toLowerCase()}`;

  const cached = cache.get(key);
  if (cached) {
    return { data: formatAqiResponse(cached.data), fromCache: true };
  }

  const url = `https://api.waqi.info/feed/${city}/?token=${TOKEN}`;

  try {
    const response = await axios.get(url);

    if (response.data.status !== "ok") {
      throw new Error("City not found");
    }

    cache.set(key, response.data);

    return { data: formatAqiResponse(response.data.data), fromCache: false };
  } catch (err) {
    throw new Error(err.message || "Error fetching AQI data");
  }
}
function formatAqiResponse(result) {
  return {
    city: result.city?.name,
    aqi: result.aqi,
    pm25: result.iaqi?.pm25?.v ?? null,
    pm10: result.iaqi?.pm10?.v ?? null,
    o3: result.iaqi?.o3?.v ?? null,
    no2: result.iaqi?.no2?.v ?? null,
    co: result.iaqi?.co?.v ?? null,
    so2: result.iaqi?.so2?.v ?? null,
    time: result.time?.iso,
  };
}
