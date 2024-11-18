import add from '../src/add';

test('add 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});

test('add -1 + -2 to equal -3', () => {
  expect(add(-1, -2)).toBe(-3);
});

test('add 0 + 0 to equal 0', () => {
  expect(add(0, 0)).toBe(0);
});

test('add decimal numbers correctly', () => {
  expect(add(0.1, 0.2)).toBeCloseTo(0.3);
  expect(add(1.99, 2.73)).toBeCloseTo(4.72);
  expect(add(0.99, 0.01)).toBeCloseTo(1);
});

test('add very large numbers correctly', () => {
  expect(add(1e10, 1e10)).toBe(2e10);
});

test('add safely near max integer value', () => {
  expect(add(Number.MAX_SAFE_INTEGER, 1)).toBe(Number.MAX_SAFE_INTEGER + 1);
});

test('add very small numbers correctly', () => {
  expect(add(0.00001, 0.00002)).toBeCloseTo(0.00003);
});

test('should return NaN when strings are passed as parameters', () => {
  expect(add('a', 'b')).toBeNaN();
  expect(add('1', '2')).toBeNaN();
});

test('should return NaN when one parameter is a string', () => {
  expect(add(1, '2')).toBeNaN();
  expect(add('1', 2)).toBeNaN();
});

test('should return NaN when null or undefined are passed as parameters', () => {
  expect(add(null, null)).toBeNaN();
  expect(add(undefined, undefined)).toBeNaN();
  expect(add(null, 1)).toBeNaN();
  expect(add(1, undefined)).toBeNaN();
});

test('should return NaN when arrays are passed as parameters', () => {
  expect(add([], [])).toBeNaN();
  expect(add([1, 2], [3, 4])).toBeNaN();
});

test('should return NaN when mixed invalid inputs are passed as parameters', () => {
  expect(add(1, null)).toBeNaN();
  expect(add(undefined, 2)).toBeNaN();
  expect(add({}, 3)).toBeNaN();
  expect(add([], 4)).toBeNaN();
  expect(add(true, 5)).toBeNaN()
});
