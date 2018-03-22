const globP = require('./../shared/globP');
const stylusP = require('./../shared/stylusP');
const fs = require('fs-extra');
const chalk = require('chalk');
const path = require('path');

function benchmark(diff) {
  return Math.round((diff[0] * 1e9 + diff[1]) / 1e6);
}

function formatPath(path) {
  if (path.substr(0, 1) !== '/' && path.substr(0, 2) !== './') {
    path = './' + path;
  }

  path = path.replace('./', process.cwd() + '/');

  if (path.slice(-1) !== '/') {
    path = path + '/';
  }

  return path;
}

module.exports = async (srcDir, outDir, specificFile = null) => {
  let files;

  const absoluteSrcDir = formatPath(srcDir);

  if (specificFile) {
    files = [`${absoluteSrcDir}${specificFile}`];
  } else {
    // "." means process.cwd (check: https://stackoverflow.com/a/9874415/4716102)
    const srcGlob = `${absoluteSrcDir}**/*.styl`;
    files = await globP(srcGlob);

    if (files.length === 0) {
      console.error(`[${chalk.red('Error')}] no matching found with: ${srcGlob}`);
      process.exit(1);
    }
  }

  const basePaths = [process.cwd(), process.cwd() + '/node_modules', absoluteSrcDir];

  await Promise.all(
    files.map(async _ => {
      let options = {
        paths: [...basePaths, path.dirname(_)],
      };

      try {
        const time = process.hrtime();
        const dest = outDir + _.replace(absoluteSrcDir, '/').replace('.styl', '.css');

        const fileContent = await fs.readFile(_, 'utf8');
        const css = await stylusP(fileContent, options);
        await fs.ensureFile(dest);
        await fs.writeFile(dest, css);
        console.log(`Generated ${dest} ${chalk.grey(benchmark(process.hrtime(time)) + 'ms')}`);
      } catch (e) {
        console.error(e.message);
        console.error(`[${chalk.red('Error')}] occured for file: ${_}`);
        process.exit(1);
      }
    })
  );
};
