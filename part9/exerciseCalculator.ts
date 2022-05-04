interface ExerciseCalculator {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyExercises: Array<number>,
  target: number
): ExerciseCalculator => {
  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.filter((day) => day > 0).length;
  const average = dailyExercises.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  const rating = average >= target ? 3 : average >= target * 0.8 ? 2 : 1;
  const ratingDescription =
    average >= target
      ? "good"
      : average >= target * 0.8
      ? "not too bad but could be better"
      : "bad";
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

interface MultipleValues {
  array: Array<number>;
  value: number;
}

const parseArguments = (args: Array<string>): MultipleValues => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const array = args.slice(3).map((arg) => {
    if (isNaN(Number(arg))) {
      throw new Error("Provided values were not numbers!");
    }
    return Number(arg);
  });
  const value = Number(args[2]);
  return {
    array,
    value,
  };
};

try {
  const { array, value } = parseArguments(process.argv);
  console.log(calculateExercises(array, value));
} catch (e) {
  console.log("Error, something bad happened, message: ", e.message);
}
