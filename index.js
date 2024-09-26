/**
 * @param {Array.<string|number>} array
 * @returns {Array.<number>}
 *
 * @throws {TypeError}
 * @throws {Error}
 */
const expandRangeArray = (array) => {
  const rangedNumbers = [];

  // Check array is valid or not
  if (!Array.isArray(array)) {
    throw new TypeError('Input must be a valid array');
  }

  for (let i = 0; i < array.length; i++) {
    const element = array[i];

    // Ensure the element is either a string or a number
    if (typeof element !== 'string' && typeof element !== 'number') {
      throw new TypeError(`Invalid array element at index ${i}: must be a number or a string in 'x-y' format`);
    }

    // Handle numbers directly (non-range elements)
    if (!isNaN(element)) {
      rangedNumbers.push(Number(element));
      continue;
    }

    // Check if the element is a range (e.g., '1-10')
    if (typeof element === 'string' && element.includes('-')) {
      const separated = element.split('-');

      // Validate that we have exactly two parts and they are numbers
      if (separated.length !== 2 || isNaN(separated[0]) || isNaN(separated[1])) {
        throw new Error(`Invalid range format at index ${i}: must be 'x-y' where x and y are numbers`);
      }

      let start = Number(separated[0]);
      let end = Number(separated[1]);

      // Ensure the start is less than or equal to the end
      if (start > end) {
        throw new Error(`Invalid range at index ${i}: start of the range (${start}) is greater than end (${end})`);
      }

      // Generate the numbers for the range
      for (let j = start; j <= end; j++) {
        rangedNumbers.push(j);
      }

      array.splice(i, 1); // Remove the range after processing it
      i -= 1; // Adjust the index since we removed an element
    } else {
      throw new Error(`Invalid input at index ${i}: must be a number or a range in 'x-y' format`);
    }
  }

  return rangedNumbers;
};

export { expandRangeArray };
