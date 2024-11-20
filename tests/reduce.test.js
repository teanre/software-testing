import reduce from '../src/reduce.js'; 


describe('reduce', () => {
  test('reduces an array to a single value using a sum function', () => {
    const result = reduce([1, 2, 3, 4], (sum, n) => sum + n, 0);
    expect(result).toBe(10);
  });

  test('uses the first element as the accumulator when none is provided', () => {
    const result = reduce([1, 2, 3, 4], (sum, n) => sum + n);
    expect(result).toBe(10);
  });

  test('handles an empty array with an initial accumulator', () => {
    const result = reduce([], (sum, n) => sum + n, 0);
    expect(result).toBe(0);
  });

  test('throws an error for an empty array with no initial accumulator', () => {
    expect(() => reduce([], (sum, n) => sum + n)).toThrow();
  });

  test('reduces an object to a single value', () => {
    const result = reduce(
      { a: 1, b: 2, c: 3 },
      (sum, value) => sum + value,
      0
    );
    expect(result).toBe(6);
  });

  test('groups object keys by their values', () => {
    const result = reduce(
      { a: 1, b: 2, c: 1 },
      (result, value, key) => {
        (result[value] ||= []).push(key);
        return result;
      },
      {}
    );
    expect(result).toEqual({ 1: ['a', 'c'], 2: ['b'] });
  });

  test('handles an empty object with an initial accumulator', () => {
    const result = reduce({}, (sum, n) => sum + n, 0);
    expect(result).toBe(0);
  });

  test('handles null input gracefully by returning the initial accumulator', () => {
    const result = reduce(null, (sum, n) => sum + n, 0);
    expect(result).toBe(0);
  });
});
