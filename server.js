import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let pumpState = "OFF";
let schedule = { onTime: "06:00", offTime: "06:15" };

// 🟢 Manual control
app.get("/status", (req, res) => res.json({ status: pumpState }));
app.post("/on", (req, res) => {
  pumpState = "ON";
  res.json({ message: "Pump turned ON" });
});
app.post("/off", (req, res) => {
  pumpState = "OFF";
  res.json({ message: "Pump turned OFF" });
});

// 🕒 Schedule endpoints
app.post("/schedule", (req, res) => {
  const { onTime, offTime } = req.body;
  if (onTime && offTime) {
    schedule = { onTime, offTime };
    res.json({ message: "Schedule updated", schedule });
  } else {
    res.status(400).json({ error: "Invalid data" });
  }
});

app.get("/schedule/get", (req, res) => res.json(schedule));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
