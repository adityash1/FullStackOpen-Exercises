const calculateBmi = (height: number, weight: number): string => {
  if (height <= 0 || weight <= 0) {
    return "Invalid input";
  }

  const bmi = weight / (height / 100) ** 2;
  if (bmi < 18.5) {
    return "underweight";
  } else if (bmi < 25) {
    return "normal (healthy weight)";
  } else if (bmi < 30) {
    return "overweight";
  } else {
    return "obese";
  }
};

interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (e) {
  console.log("Error, something bad happened, message: ", e.message);
}

export default calculateBmi;