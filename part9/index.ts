/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from "express";
import morgan from "morgan";

import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(morgan("tiny"));

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

app.post("/exercises", (req, res) => {
  const { dailyExercises, target } = req.body;
  if (!dailyExercises || !target) {
    res.status(400).send({ error: "parameters missing" });
    return;
  }

  const targetNum = Number(target);
  if (isNaN(targetNum)) {
    res.status(400).send({ error: "malformatted parameters" });
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const dailyExercisesNum = dailyExercises.map((day: unknown) => Number(day));
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  if (dailyExercisesNum.some((day: number) => isNaN(day)) || isNaN(targetNum)) {
    res.status(400).send({ error: "malformatted parameters" });
    return;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(dailyExercisesNum, targetNum);
    res.send(result);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
