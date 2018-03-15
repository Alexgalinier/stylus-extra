const stylus = require('stylus');

module.exports = (str, options = {}) => {
  return new Promise((res, rej) => {
    stylus.render(str, options, function(err, css) {
      if (err) rej(err);
      res(css);
    });
  });
};
