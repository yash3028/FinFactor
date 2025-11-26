import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aqiRoute from "./routes/aqi_routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/aqi", aqiRoute);

app.get("/", (req, res) => {
  res.send("AQI Backend Running");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
