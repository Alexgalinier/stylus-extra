const fs = require('fs-extra');
const build = require('./build');
const stylusP = require('./../shared/stylusP');

const ROOT = './';
const TMP = ROOT + 'tmp';

let rawProcessExit;

beforeEach(async () => {
  rawProcessExit = global.process.exit;
  global.process.exit = jest.fn();
});

afterEach(async () => {
  global.process.exit = rawProcessExit;
  await fs.remove(TMP);
});

test('.styl files are compiled and moved', async () => {
  await build(ROOT + 'test/valid', TMP);
  expect(await fs.pathExists(ROOT + 'tmp/test.css')).toBe(true);
  expect(await fs.pathExists(ROOT + 'tmp/test2.css')).toBe(true);
});

test('only file passed as specific is compiled and move', async () => {
  await build(ROOT + 'test/valid', TMP, 'test.styl');
  expect(await fs.pathExists(ROOT + 'tmp/test.css')).toBe(true);
  expect(await fs.pathExists(ROOT + 'tmp/test2.css')).toBe(false);
});

test('an error message appears when no .styl files found', async () => {
  const spy = jest.spyOn(console, 'error');
  await build('not/a/valid/path', TMP);
  expect(spy.mock.calls[0][0]).toMatch(/.*no matching found with.*/);
});

test('an error message appears when a .styl file is invalid', async () => {
  const spy = jest.spyOn(console, 'error');
  await build(ROOT + 'test/invalid', TMP);
  expect(spy.mock.calls[2][0]).toMatch(/.*occured for file.*/);
});
