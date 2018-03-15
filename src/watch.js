const sane = require('sane');
const build = require('./build');

module.exports = async (srcDir, outDir) => {
  let watcher = sane(srcDir, { glob: ['**/*.styl'] });
  watcher.on('ready', () => {
    console.log(`Watching: "./${srcDir}" for .styl files`);
  });
  watcher.on('change', filepath => build(srcDir, outDir, filepath));
  watcher.on('add', filepath => build(srcDir, outDir, filepath));
  watcher.on('delete', filepath => build(srcDir, outDir, filepath));
};
