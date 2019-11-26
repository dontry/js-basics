const redis = require("redis");
const db = redis.createClient();

function Entry(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      this[key] = obj[key];
    }
  }
}

Entry.prototype.save = function(fn) {
  const entryJSON = JSON.stringify(this);

  db.lpush("entries", entryJSON, function(err) {
    if (err) return fn(err);
    fn();
  });
};

Entry.getRange = function(from, to, fn) {
  db.lrange("entries", from, to, function(err, items) {
    if (err) return fn(err);
    const entries = items.map(function(item) {
      return JSON.parse(item);
    });
    fn(null, entries);
  });
};

module.exports = Entry;
