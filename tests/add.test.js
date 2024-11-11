// add.test.js
import add from '../src/add';

test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});

test('adds 6 + 4 to equal 10', () => {
  expect(add(6, 4)).toBe(10);
});