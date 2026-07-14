// @ts-check
/* eslint-env node */
/* eslint-disable import/no-commonjs */

// The embedding SDK and iframe-embed bundles were removed with the
// commercially-licensed enterprise/ directory; only the main app is built.
const configs = [require("./rspack.main.config")];

module.exports = configs;
