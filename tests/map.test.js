import map from '../src/map';

// Positive test cases
test('should calculate the correct total price of products in the cart', () => {
  const cartItems = [
    { id: 1, name: 'Product 1', price: 100, quantity: 2 },
    { id: 2, name: 'Product 2', price: 50, quantity: 1 },
  ];
  const totalPrices = map(cartItems, (item) => item.price * item.quantity);
  expect(totalPrices).toEqual([200, 50]);
});

test('should apply a 10% discount to each product price', () => {
  const cartItems = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
  ];
  const applyDiscount = (item) => ({
    ...item,
    price: item.price * 0.9,
  });
  const discountedItems = map(cartItems, applyDiscount);
  expect(discountedItems[0].price).toBe(90);
  expect(discountedItems[1].price).toBe(180);
});

test('should extract product names correctly', () => {
  const products = [
    { id: 1, name: 'Product A', price: 150 },
    { id: 2, name: 'Product B', price: 300 },
  ];
  const productNames = map(products, (product) => product.name);
  expect(productNames).toEqual(['Product A', 'Product B']);
});

test('should map products and sort them by price', () => {
  const products = [
    { id: 1, name: 'Product A', price: 100 },
    { id: 2, name: 'Product B', price: 50 },
    { id: 3, name: 'Product C', price: 150 },
  ];
  const sortedProducts = map(products.sort((a, b) => a.price - b.price), (product) => product.name);
  expect(sortedProducts).toEqual(['Product B', 'Product A', 'Product C']);
});

test('should pass the correct arguments to the iteratee function', () => {
  const mockIteratee = jest.fn();
  const array = [1, 2, 3];
  map(array, mockIteratee);
  expect(mockIteratee).toHaveBeenCalledWith(1, 0, array);
  expect(mockIteratee).toHaveBeenCalledWith(2, 1, array);
  expect(mockIteratee).toHaveBeenCalledWith(3, 2, array);
});

// Edge cases
test('should return an empty array when there are no cart items', () => {
  const cartItems = [];
  const result = map(cartItems, (item) => item.price * item.quantity);
  expect(result).toEqual([]);
});

test('should return "empty" for undefined or null cart items', () => {
  const cartItems = [null, undefined, { id: 3, name: 'Product C', price: 400 }];
  const result = map(cartItems, (item) => (item ? item.name : 'empty'));
  expect(result).toEqual(['empty', 'empty', 'Product C']);
});

test('should handle sparse arrays', () => {
  const array = [1, , 3]; // Sparse array with a missing element
  const iteratee = n => (n !== undefined ? n * n : n);
  const result = map(array, iteratee);
  expect(result).toEqual([1, undefined, 9]);
});

test('should handle arrays with mixed types', () => {
  const array = [1, '2', true, null];
  const iteratee = value => typeof value;
  const result = map(array, iteratee);
  expect(result).toEqual(['number', 'string', 'boolean', 'object']);
});

// Negative test cases
test('should return an empty array when the input array is null or undefined', () => {
  const iteratee = n => n * n;
  expect(map(null, iteratee)).toEqual([]);
  expect(map(undefined, iteratee)).toEqual([]);
});

test('should handle non-array inputs gracefully', () => {
  const iteratee = value => value;
  expect(map(123, iteratee)).toEqual([]);
  expect(map({ key: 'value' }, iteratee)).toEqual([]);
});

test('should handle string input gracefully', () => {
  const iteratee = value => value;
  expect(map('string', iteratee)).toEqual([]);
});

test('should handle iteratee that returns undefined', () => {
  const array = [1, 2, 3];
  const iteratee = () => undefined;
  const result = map(array, iteratee);
  expect(result).toEqual([undefined, undefined, undefined]);
});

test('should handle iteratee that throws an error', () => {
  const array = [1, 2, 3];
  const iteratee = () => { throw new Error('Test error'); };
  expect(() => map(array, iteratee)).toThrow('Test error');
});

test('should throw an error if iteratee is not a function', () => {
  const array = [1, 2, 3];
  expect(() => map(array, null)).toThrow();
  expect(() => map(array, 'not a function')).toThrow();
});