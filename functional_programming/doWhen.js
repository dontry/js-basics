const truthy = require("./truthy");
module.exports = (pred, action) => (truthy(pred) ? action() : undefined);
