import ceil from '../src/ceil';

test('should round numbers correctly to the nearest integer (no precision)', () => {
  expect(ceil(4.006)).toBe(5);
  expect(ceil(4.004)).toBe(5);
  expect(ceil(0.1)).toBe(1);
  expect(ceil(-0.1)).toBeCloseTo(0); // Use toBeCloseTo, because JavaScript distinguishes between 0 and -0
});

test('should round numbers correctly to the specified precision (2 decimals)', () => {
  expect(ceil(4.006, 2)).toBeCloseTo(4.01, 2);  
  expect(ceil(0.1, 2)).toBeCloseTo(0.1, 2);    // 1 decimal precision, no change
  expect(ceil(0.001, 2)).toBeCloseTo(0.01, 2);  
});

test('should round numbers correctly near the rounding boundary', () => {
  expect(ceil(4.005, 2)).toBeCloseTo(4.01, 2);
  expect(ceil(12.499, 2)).toBeCloseTo(12.50, 2); 
  expect(ceil(99.9999, 3)).toBeCloseTo(100.000, 3);  
});

test('should round negative numbers correctly with specified precision', () => {
  expect(ceil(-4.006, 2)).toBeCloseTo(-4.00, 2);
  expect(ceil(-0.99, 2)).toBeCloseTo(-0.99, 2);   // No change, already 2 decimals
  expect(ceil(-0.001, 2)).toBeCloseTo(0.00, 2);   // Rounds up to zero (negative small value)
});

test('should handle zero correctly with precision', () => {
  expect(ceil(0, 0)).toBe(0);
  expect(ceil(0, 2)).toBe(0);
});

test('should round very small and very large numbers correctly with precision', () => {
  expect(ceil(0.00001, 4)).toBeCloseTo(0.0001, 4);
  expect(ceil(100.123456, 4)).toBeCloseTo(100.1235, 4);
  expect(ceil(99999.87654321, 5)).toBeCloseTo(99999.87655, 5);
  expect(ceil(1e10, 0)).toBe(1e10);
});

test('should handle zero and very small values correctly with precision', () => {
  expect(ceil(0.00001, 2)).toBeCloseTo(0.01, 2);
  expect(ceil(0.0001, 3)).toBeCloseTo(0.001, 3);
  expect(ceil(-0.00001, 3)).toBeCloseTo(0.000, 3); // Small negative value rounds up to zero
});

test('should round large numbers correctly', () => {
  expect(ceil(1000.1, 1)).toBeCloseTo(1000.1, 1);  // Large number with 1 decimal place
  expect(ceil(99999.9, 2)).toBe(99999.9); // Should not change, already up to that precision
});

// Non-numeric input handling
test('should return NaN for string input', () => {
  expect(isNaN(ceil('a'))).toBe(true);
  expect(isNaN(ceil(''))).toBe(true);
});

test('should return NaN for undefined input', () => {
  expect(isNaN(ceil(undefined))).toBe(true);
});

test('should return NaN for null input', () => {
  expect(isNaN(ceil(null))).toBe(true);
});

test('should return NaN for array input', () => {
  expect(isNaN(ceil([]))).toBe(true);
});

test('should return NaN for object input', () => {
  expect(isNaN(ceil({}))).toBe(true);
});

test('should return NaN for boolean input', () => {
  expect(isNaN(ceil(true))).toBe(true);
  expect(isNaN(ceil(false))).toBe(true);
});

