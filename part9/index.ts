import express from "express";
const app = express();
import calculateBmi from "./bmiCalculator";

app.get("/hello", (_, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (!height || !weight) {
    res.status(400).send({ error: "parameters missing" });
    return;
  }
  const heightNum = Number(height);
  const weightNum = Number(weight);
  if (isNaN(heightNum) || isNaN(weightNum)) {
    res.status(400).send({ error: "malformatted parameters" });
    return;
  }

  try {
    const bmi = calculateBmi(heightNum, weightNum);
    res.send({ weightNum, heightNum, bmi });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
