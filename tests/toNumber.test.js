import toNumber from '../src/toNumber.js';

describe('toNumber', () => {
  test('returns the same number if the input is already a number', () => {
    expect(toNumber(42)).toBe(42);
    expect(toNumber(-3.14)).toBe(-3.14);
    expect(toNumber(0)).toBe(0);
  });

  test('returns NaN for symbols', () => {
    expect(toNumber(Symbol('test'))).toBeNaN();
  });

  test('converts a string representation of a number to a number', () => {
    expect(toNumber('42')).toBe(42);
    expect(toNumber('-3.14')).toBe(-3.14);
    expect(toNumber('0')).toBe(0);
  });

  test('handles binary string values correctly', () => {
    expect(toNumber('0b101')).toBe(5); // Binary for 5
    expect(toNumber('0b11111111')).toBe(255); // Binary for 255
  });

  test('handles octal string values correctly', () => {
    expect(toNumber('0o10')).toBe(8); // Octal for 8
    expect(toNumber('0o377')).toBe(255); // Octal for 255
  });

  test('returns NaN for bad hexadecimal strings', () => {
    expect(toNumber('-0x1')).toBeNaN(); // Invalid signed hex
    expect(toNumber('0x')).toBeNaN();   // Incomplete hex
  });

  test('handles valid hexadecimal strings', () => {
    expect(toNumber('0x1')).toBe(1);
    expect(toNumber('0xFF')).toBe(255);
  });

  test('returns NaN for non-numeric strings', () => {
    expect(toNumber('hello')).toBeNaN();
    expect(toNumber('123abc')).toBeNaN();
  });

  test('handles objects with a valid valueOf function', () => {
    const obj = {
      valueOf: () => 42,
    };
    expect(toNumber(obj)).toBe(42);
  });

  test('handles objects without a valid valueOf function', () => {
    const obj = {
      toString: () => '42',
    };
    expect(toNumber(obj)).toBe(42);
  });

  test('returns the input for null, undefined, or boolean values', () => {
    expect(toNumber(null)).toBe(0);
    expect(toNumber(undefined)).toBeNaN();
    expect(toNumber(true)).toBe(1);
    expect(toNumber(false)).toBe(0);
  });

  test('trims leading and trailing whitespace in strings', () => {
    expect(toNumber('  42  ')).toBe(42);
    expect(toNumber('\t-3.14\n')).toBe(-3.14);
  });

  test('returns NaN for deeply nested objects or invalid conversions', () => {
    const obj = {
      valueOf: () => ({
        toString: () => 'invalid',
      }),
    };
    expect(toNumber(obj)).toBeNaN();
  });

  test('handles Infinity and very small numbers correctly', () => {
    expect(toNumber(Infinity)).toBe(Infinity);
    expect(toNumber(Number.MIN_VALUE)).toBe(Number.MIN_VALUE);
  });
});
