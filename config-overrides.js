const { override, addWebpackExternals } = require('customize-cra');

module.exports = override(
  addWebpackExternals({
    verovio: 'commonjs verovio',
  })
);
