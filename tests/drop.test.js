import drop from '../src/drop';

test('should drop the first element from the list by default', () => {
  const products = ['apple', 'banana', 'carrot'];
  expect(drop(products)).toEqual(['banana', 'carrot']);
});

test('should drop multiple elements from the list', () => {
  const products = ['apple', 'banana', 'carrot'];
  expect(drop(products, 2)).toEqual(['carrot']);
});

test('should handle dropping more elements than available', () => {
  const products = ['apple', 'banana'];
  expect(drop(products, 5)).toEqual([]);
});

test('should return the same list if n is 0', () => {
  const products = ['apple', 'banana', 'carrot'];
  expect(drop(products, 0)).toEqual(['apple', 'banana', 'carrot']);
});

test('should handle an empty list', () => {
  expect(drop([], 2)).toEqual([]);
});

test('should handle null or undefined list', () => {
  expect(drop(null, 2)).toEqual([]);
  expect(drop(undefined, 2)).toEqual([]);
});

test('handles negative n values by treating them as 0', () => {
  const products = ['apple', 'banana', 'carrot'];
  expect(drop(products, -2)).toEqual(['apple', 'banana', 'carrot']);
});

test('should handle non-integer n values by converting them to integers', () => {
  const products = ['apple', 'banana', 'carrot'];
  expect(drop(products, 1.5)).toEqual(['banana', 'carrot']);
  expect(drop(products, '2')).toEqual(['carrot']);  // Assuming toInteger converts string to number
});

test('should handle large arrays', () => {
  const products = Array.from({ length: 1000 }, (_, i) => `product${i}`);
  expect(drop(products, 500).length).toBe(500);
  expect(drop(products, 1000)).toEqual([]);
});
