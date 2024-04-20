// Function to calculate median of the given values

const calculateMedian = (values: any[]): number => {
    // Calculate the mid index of the array
    const mid = Math.floor(values.length / 2);

    // Sort the array
    const sortedValues = values.slice().sort((a, b) => a - b);

    // Check if the array is even then return the mean of the middle two values
    if (sortedValues.length % 2 === 0) {
        return parseFloat(((sortedValues[mid - 1] + sortedValues[mid]) / 2).toFixed(3));
    } else {
        return parseFloat(sortedValues[mid].toFixed(3));
    }
};

export default calculateMedian;
