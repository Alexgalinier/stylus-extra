test('Src parameter is mandatory', () => {
  const spy = jest.spyOn(console, 'error');
  process.exit = () => {};
  process.argv = ['', ''];

  require('./stylus-extra');
  expect(spy.mock.calls[0][0]).toMatch(/.*you must specify a <src> folder.*/);
});
