
interface WeekStats {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

function calculateExercises(weekRecord: Array<number>, target: number): WeekStats {

  const day_amt = weekRecord.length;
  const day_trn = weekRecord.filter(x => x > 0).length;
  const average = weekRecord.reduce((a, x) => a + x, 0)/day_amt;
  const target_hrs = (target * day_amt)/day_amt;
  const success = (average > target_hrs);
  const rating = (() => {
    if (average < target_hrs){
      return 1;
    }
    if (average > target_hrs){
      return 3;
    }
    return 2;
  })();
  const desc = (() => {
    if (rating === 1) {
      return 'Gotta pump those numbers up';
    }
    else if (rating === 3) {
      return 'Good job chief!';
    }
    return 'Right on the money';
  })();


  const results: WeekStats =  {
    periodLength: day_amt,
    trainingDays: day_trn,
    success: success,
    rating: rating,
    ratingDescription: desc,
    target: target,
    average: average,
  };
  return results;
}

if (require.main === module) {
const target: number = Number(process.argv.at(2));
const weekRecord: Array<number> = process.argv.slice(3).map((v) => Number(v));
console.log(process.argv);
console.log(calculateExercises(weekRecord, target));
}


export default calculateExercises;
