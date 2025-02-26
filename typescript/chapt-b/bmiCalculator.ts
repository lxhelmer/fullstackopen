function calculateBmi(height: number, weight: number): string {
  const height_m: number = height/100;
  const bmi: number = weight/height_m**2;
  if (bmi < 18.5) {
    return 'Underweight';
  } if (bmi > 24.9) {
    return 'Overweight';
  }
  return ('Normal range');
}

if (require.main === module) {
  const height: number = Number(process.argv[2]);
  const weight: number = Number(process.argv[3]);
  console.log(calculateBmi(height, weight));
}
export default calculateBmi;
