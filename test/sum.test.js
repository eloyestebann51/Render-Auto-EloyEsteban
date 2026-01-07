const sum = require('../src/sum');

test('suma correctamente dos números', () => {
  expect(sum(2, 3)).toBe(5);
});
