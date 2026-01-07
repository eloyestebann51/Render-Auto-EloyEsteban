const sum = require('../src/sum');

test('integración: suma dentro de un flujo mayor', () => {
  const result = sum(5, 5);
  expect(result).toBeGreaterThan(5);
});
