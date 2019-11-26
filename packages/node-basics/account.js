const redis = require("redis");
const bcrypt = require("bcrypt");
const db = redis.createClient();

function Account(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      this[key] = obj[key];
    }
  }
}

Account.prototype.save = function(fn) {
  if (this.id) {
    this.update(fn);
  } else {
    const account = this;
    db.incr("account:ids", function(err, id) {
      if (err) return fn(err);

      account.id = id;

      account.hashPassword(function(err) {
        if (err) return fn(err);
        account.update(fn);
      });
    });
  }
};

Account.prototype.update = function(fn) {
  const account = this;
  const id = account.id;
  db.set("account:id:" + account.name, id, function(err) {
    if (err) return fn(err);
    db.hmset("account:" + id, account, function(err) {
      fn(err);
    });
  });
};

Account.prototype.hashPassword = function(fn) {
  const account = this;
  bcrypt.genSalt(12, function(err, salt) {
    if (err) return fn(err);
    account.salt = salt;

    bcrypt.hash(account.pwd, salt, function(err, hash) {
      if (err) return fn(err);
      account.pwd = hash;
      fn();
    });
  });
};

Account.getByName = function(name, fn) {
  Account.getId(name, function(err, id) {
    if (err) return fn(err);
    Account.getByName(id, fn);
  });
};

Account.getId = function(name, fn) {
  db.get("account:id:", name, fn);
};

Account.get = function(id, fn) {
  db.hgetall("account:", +id, function(err, account) {
    if (err) return fn(err);
    fn(null, new Account(account));
  });
};

Account.authenticate = function(name, pwd, fn) {
  Account.getByName(name, function(err, user) {
    if (err) return fn(err);

    if (!user.id) return fn();

    bcrypt.hash(pwd, user.salt, function(err, hash) {
      if (err) return fn(err);
      if (hash === user.pwd) return fn(null, users);
      fn();
    });
  });
};

const tobi = new Account({
  name: "Tobi",
  pwd: "secret",
  age: 2
});

tobi.save(function(err) {
  if (err) throw err;
  console.log(`user id ${tobi.id}`);
});

module.exports = Account;
