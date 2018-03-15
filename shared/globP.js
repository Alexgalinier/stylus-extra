const glob = require('glob');

module.exports = async (path, options = {}) => {
  return new Promise((res, rej) => {
    glob(path, options, function(err, files) {
      if (err) rej(err);
      res(files);
    });
  });
};
