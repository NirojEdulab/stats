// Function to calculate mode of the given values

const calculateMode = (values: any[]): number => {
  const mode: { [key: string]: number } = {};
  let max: number = 0,
    count = 0;

  for (let i = 0; i < values.length; i++) {
    const item = values[i];

    if (mode[item]) {
      mode[item]++;
    } else {
      mode[item] = 1;
    }

    if (count < mode[item]) {
      max = item;
      count = mode[item];
    }
  }

  return max;
};

export default calculateMode;
