import toString from '../src/toString.js';

describe('toString', () => {
  test('converts a string to itself', () => {
    expect(toString('hello')).toBe('hello');
    expect(toString('')).toBe('');
  });

  test('converts null and undefined to an empty string', () => {
    expect(toString(null)).toBe('');
    expect(toString(undefined)).toBe('');
  });

  test('handles numbers, including -0', () => {
    expect(toString(42)).toBe('42');
    expect(toString(-42)).toBe('-42');
    expect(toString(0)).toBe('0');
    expect(toString(-0)).toBe('-0');
    expect(toString(Infinity)).toBe('Infinity');
    expect(toString(-Infinity)).toBe('-Infinity');
  });

  test('converts arrays to comma-separated strings', () => {
    expect(toString([1, 2, 3])).toBe('1,2,3');
    expect(toString(['a', 'b', 'c'])).toBe('a,b,c');
    expect(toString([1, 'a', null, undefined])).toBe('1,a,,');
  });

  test('handles nested arrays', () => {
    expect(toString([1, [2, [3, 4]], 5])).toBe('1,2,3,4,5');
    expect(toString([null, [undefined, [-0]], 'end'])).toBe(',,-0,end');
  });

  test('converts symbols to strings', () => {
    expect(toString(Symbol('test'))).toBe('Symbol(test)');
  });

  test('converts objects to "[object Object]" by default', () => {
    expect(toString({})).toBe('[object Object]');
    expect(toString({ key: 'value' })).toBe('[object Object]');
  });

  test('converts booleans to strings', () => {
    expect(toString(true)).toBe('true');
    expect(toString(false)).toBe('false');
  });

  test('handles function inputs', () => {
    const fn = () => {};
    expect(toString(fn)).toBe(fn.toString());
  });

  test('converts special values like NaN and Infinity', () => {
    expect(toString(NaN)).toBe('NaN');
    expect(toString(Infinity)).toBe('Infinity');
    expect(toString(-Infinity)).toBe('-Infinity');
  });

  test('handles edge cases gracefully', () => {
    expect(toString(() => {})).toContain('function');
    expect(toString(Symbol())).toContain('Symbol');
    expect(toString(new Date(0))).toContain('1970'); // Date string representation
  });
});
