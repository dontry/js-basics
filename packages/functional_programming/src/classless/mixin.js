const _ = require("lodash");
const existy = require("../existy");
const dispatch = require("../composer/dispatch");

function Container(value) {
  this._value = value;
  this.init(value);
}

Container.prototype.init = x => x;

const c = new Container(42);

const HoleMixin = {
  setValue(newValue) {
    const oldValue = this._value;
    this._value = newValue;
    this.notify(oldValue, newValue);
    return this._value;
  },
  notify(oldValue, newValue) {
    console.log(`replace ${oldValue} withValue ${newValue}`);
  }
};

const ObserverMixin = (function() {
  var _watchers = [];

  return {
    watch: function(fun) {
      _watchers.push(fun);
      return _.size(_watchers);
    },
    notify: function(oldVal, newVal) {
      _.each(_watchers, function(watcher) {
        watcher.call(this, oldVal, newVal);
      });

      return _.size(_watchers);
    }
  };
})();

const stringifyArray = arr => `[${arr.map(polyToString).join(",")}]`;

const polyToString = dispatch(
  s => (_.isString(s) ? s : undefined),
  s => (_.isArray(s) ? stringifyArray(s) : undefined),
  s => (_.isObject(s) ? JSON.stringify(s) : undefined),
  s => s.toString()
);

const ValidateMixin = {
  addValidator: function(fun) {
    this._validator = fun;
  },
  init: function(val) {
    this.validate(val);
  },
  validate: function(val) {
    if (existy(this._validator) && !this._validator(val))
      fail("Attempted to set invalid value " + polyToString(val));
  }
};

function Hole(value) {
  Container.call(this, value);
}
_.extend(Hole.prototype, HoleMixin, ValidateMixin, ObserverMixin);

module.exports = { Hole };
