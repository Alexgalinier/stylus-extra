#!/usr/bin/env node

const build = require('./src/build');
const watch = require('./src/watch');
const chalk = require('chalk');

let program = require('commander');
let programSrc = null;

program
  .description('Search recursivly *.styl files, transform and copy them to css into the --out folder.')
  .version(require('./package.json').version, '-v, --version')
  .arguments('<src>')
  .option('-w, --watch', 'watch all .styl files inside current directory (ignore "node_modules" folder).')
  .option('-o, --out [dir]', 'output css files to folder [dir]. Keep the same file structure.', 'lib')
  .action(_ => (programSrc = _))
  .parse(process.argv);

if (!programSrc) {
  console.error(`[${chalk.red('Error')}] you must specify a <src> folder`);
  process.exit(1);
}

if (program.watch) {
  watch(programSrc, program.out);
} else {
  build(programSrc, program.out);
}
