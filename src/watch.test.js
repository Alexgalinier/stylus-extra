const watch = require('./watch');

test('should not rise an error', async () => {
  await watch('.', '.', true);
});
