import words from '../src/words.js';

describe('words', () => {
  test('splits a basic ASCII string into words', () => {
    expect(words('fred, barney, & pebbles')).toEqual(['fred', 'barney', 'pebbles']);
  });

  test('splits a string with custom pattern', () => {
    const result = words('fred, barney, & pebbles', /[^, ]+/g);
    expect(result).toEqual(['fred', 'barney', '&', 'pebbles']);
  });

  test('handles an empty string', () => {
    expect(words('')).toEqual([]);
  });

  test('handles strings with only punctuation', () => {
    expect(words('...,,,!!!')).toEqual([]);
  });

  test('handles strings with mixed alphanumeric characters', () => {
    expect(words('foo123bar')).toEqual(['foo', '123', 'bar']);
    expect(words('123foo456')).toEqual(['123', 'foo', '456']);
  });

  test('splits Unicode strings into words', () => {
    expect(words('привет мир')).toEqual(['привет', 'мир']);
    expect(words('你好 世界')).toEqual(['你好', '世界']);
  });

  test('handles strings with mixed Unicode and ASCII characters', () => {
    expect(words('hello 世界')).toEqual(['hello', '世界']);
  });

  test('handles null or undefined input gracefully', () => {
    expect(() => words(null)).toThrow(TypeError);
    expect(() => words(undefined)).toThrow(TypeError);
});

test('throws error for non-string input', () => {
    expect(() => words(12345)).toThrow(TypeError); 
    expect(() => words(true)).toThrow(TypeError); 
    expect(() => words({})).toThrow(TypeError); 
    expect(() => words([])).toThrow(TypeError); 
});

  test('splits words with symbols if matched by a pattern', () => {
    expect(words('fred, barney, & pebbles', /\w+/g)).toEqual(['fred', 'barney', 'pebbles']);
    expect(words('hello@world.com', /[^@]+/g)).toEqual(['hello', 'world.com']);
  });
});
