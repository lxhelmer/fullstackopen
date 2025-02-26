import express from 'express';
import calculateBmi from './bmiCalculator.ts';
import calculateExercises from './exerciseCalculator.ts'

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);
  if (!weight || !height) {
    res.end(JSON.stringify({
      error: "malformatted parameters"
    }));
    return; 
  }

  const bmi = calculateBmi(height, weight);
  res.send(JSON.stringify({
    weight: weight,
    height: height,
    bmi: bmi
  }));
});

app.post('/exercises', (req, res) => {
  try {
    const { daily_exercises, target } = req.body
    if (daily_exercises === undefined || target === undefined) {
      throw "missing param"
    }
    try {
      const weekRecord: Array<number> = daily_exercises.map((v: string) => Number(v))
      const target_arg: number = Number(target);
      if (isNaN(target_arg) || weekRecord.includes(NaN)) {
        throw "bad param";
      }
      const ex_data = calculateExercises(weekRecord, target_arg);
      res.send(JSON.stringify(ex_data));
      return 
    } catch {
      res.end(JSON.stringify({
        error: "malformatted parameters"
      }));
    }
  } catch {
      res.end(JSON.stringify({
        error: "parameters missing"
      }));
  }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
