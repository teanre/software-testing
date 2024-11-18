import camelCase from '../src/camelCase';

test('should convert a single word to lower case', () => {
  expect(camelCase('FOO')).toBe('foo');
});

test('should convert multiple words to camel case', () => {
  expect(camelCase('Foo Bar')).toBe('fooBar');
  expect(camelCase('--foo-bar--')).toBe('fooBar');
  expect(camelCase('__FOO_BAR__')).toBe('fooBar');
});

test('should handle strings with special characters', () => {
  expect(camelCase('foo-bar')).toBe('fooBar');
  expect(camelCase('foo_bar')).toBe('fooBar');
  expect(camelCase('foo.bar')).toBe('fooBar');
});

test('should handle strings with numbers', () => {
  expect(camelCase('foo 123 bar')).toBe('foo123Bar');
  expect(camelCase('foo2bar')).toBe('foo2Bar');
});

test('should handle strings with leading and trailing whitespace', () => {
  expect(camelCase('  foo bar  ')).toBe('fooBar');
  expect(camelCase('  foo  ')).toBe('foo');
});

test('should handle strings with mixed case', () => {
  expect(camelCase('fOo BaR')).toBe('fooBar');
  expect(camelCase('FOO bar')).toBe('fooBar');
});

test('should handle strings with non-alphanumeric characters', () => {
  expect(camelCase('foo!@#bar')).toBe('fooBar');
  expect(camelCase('foo$%^bar')).toBe('fooBar');
});

test('should handle strings with Unicode characters', () => {
  expect(camelCase('fóo bár')).toBe('fóoBár');
  expect(camelCase('你好 世界')).toBe('你好世界');
});

test('should handle empty strings', () => {
  expect(camelCase('')).toBe('');
});

test('should handle non-string inputs by converting them to strings', () => {
  expect(camelCase(null)).toBe('');
  expect(camelCase(undefined)).toBe('');
  expect(camelCase(123)).toBe('123');
  expect(camelCase({})).toBe('[objectObject]');
});