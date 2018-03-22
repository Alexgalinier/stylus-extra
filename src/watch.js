const sane = require('sane');
const build = require('./build');

module.exports = async (srcDir, outDir, forceClose = false) => {
  let watcher = sane(srcDir, { glob: ['**/*.styl'] });

  watcher.on('ready', () => {
    console.log(`Watching: "./${srcDir}" for .styl files`);
    if (forceClose) watcher.close();
  });
  watcher.on('change', filepath => build(srcDir, outDir, filepath, false));
  watcher.on('add', filepath => build(srcDir, outDir, filepath, false));
  watcher.on('delete', filepath => build(srcDir, outDir, filepath, false));

  return watcher;
};
