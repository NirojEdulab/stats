// Function to calculate mean of the given values

const calculateMean = (values: (string | number)[]): number => {
  let sum = 0;
  for (let i = 0; i < values.length; i++) {
    const value = typeof values[i] === 'string' ? Number(values[i]) : values[i] as number;
    sum += value;
  }
  const mean = sum / values.length;

  return mean;
};

export default calculateMean;
