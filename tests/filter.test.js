import filter from '../src/filter.js';

describe('filter', () => {
  test('filters elements based on the predicate function', () => {
    const users = [
      { user: 'barney', active: true },
      { user: 'fred', active: false },
    ];
    const result = filter(users, ({ active }) => active);
    expect(result).toEqual([{ user: 'barney', active: true }]);
  });

  test('returns an empty array if no elements match the predicate', () => {
    const array = [1, 2, 3, 4];
    const result = filter(array, (n) => n > 10);
    expect(result).toEqual([]);
  });

  test('returns the entire array if all elements match the predicate', () => {
    const array = [1, 2, 3, 4];
    const result = filter(array, (n) => n > 0);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  test('handles an empty array gracefully', () => {
    const result = filter([], (n) => n > 0);
    expect(result).toEqual([]);
  });

  test('returns an empty array if array is null or undefined', () => {
    expect(filter(null, (n) => n > 0)).toEqual([]);
    expect(filter(undefined, (n) => n > 0)).toEqual([]);
  });

  test('provides correct arguments to the predicate function', () => {
    const mockPredicate = jest.fn();
    const array = [10, 20, 30];
    filter(array, mockPredicate);
    expect(mockPredicate).toHaveBeenCalledTimes(3);
    expect(mockPredicate).toHaveBeenCalledWith(10, 0, array);
    expect(mockPredicate).toHaveBeenCalledWith(20, 1, array);
    expect(mockPredicate).toHaveBeenCalledWith(30, 2, array);
  });

  test('throws an error for non-array inputs', () => {
    expect(() => filter(12345, (n) => n > 0)).toThrow(TypeError);
    expect(() => filter('hello', (char) => char === 'h')).toThrow(TypeError);
    expect(() => filter(true, (n) => n)).toThrow(TypeError);
  });

  test('filters elements in an array of mixed types', () => {
    const array = [1, 'a', true, null, undefined, 0];
    const result = filter(array, (value) => typeof value === 'number' && value > 0);
    expect(result).toEqual([1]);
  });
});
