import express from 'express';
const app = express();
import patientRouter from './routes/patients';
import diagnosisRouter from './routes/diagnoses';
import cors from 'cors';

app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  res.send("hello");
});

app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnosisRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
