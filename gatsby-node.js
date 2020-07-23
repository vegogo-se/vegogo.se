// Make ES6 imports work by using esm.
// Solution from https://github.com/gatsbyjs/gatsby/issues/7810#issuecomment-449741977.
require = require("esm")(module);
module.exports = require("./gatsby-node.esm.js");
