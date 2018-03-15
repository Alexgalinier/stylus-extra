const globP = require('./../shared/globP');
const stylusP = require('./../shared/stylusP');
const fs = require('fs-extra');
const chalk = require('chalk');

function benchmark(diff) {
  return Math.round((diff[0] * 1e9 + diff[1]) / 1e6);
}

function formatPath(path) {
  if (path.substr(0, 1) !== '/' && path.substr(0, 2) !== './') {
    path = './' + path;
  }

  if (path.slice(-1) !== '/') {
    path = path + '/';
  }

  return path;
}

module.exports = async (srcDir, outDir, specificFile = null) => {
  let files;

  srcDir = formatPath(srcDir);
  outDir = formatPath(outDir);

  if (specificFile) {
    files = [`${srcDir}${specificFile}`];
  } else {
    // "." means process.cwd (check: https://stackoverflow.com/a/9874415/4716102)
    const srcGlob = `${srcDir}**/*.styl`;
    files = await globP(srcGlob);

    if (files.length === 0) {
      console.error(
        `[${chalk.red('Error')}] no matching found with: ${srcGlob}`
      );
      process.exit(1);
    }
  }

  await Promise.all(
    files.map(async _ => {
      try {
        const time = process.hrtime();
        const dest =
          outDir + _.replace(srcDir, '').replace('.styl', '.css');

        const fileContent = await fs.readFile(_, 'utf8');
        const css = await stylusP(fileContent);
        await fs.ensureFile(dest);
        await fs.writeFile(dest, css);
        console.log(
          `Generated ${dest} ${chalk.grey(
            benchmark(process.hrtime(time)) + 'ms'
          )}`
        );
      } catch (e) {
        console.error(e.message);
        console.error(`[${chalk.red('Error')}] occured for file: ${_}`);
        process.exit(1);
      }
    })
  );
};
