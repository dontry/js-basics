const _ = require("lodash");
const { curry2 } = require("../composer/curry");
const construct = require("../construct");

const project = (table, keys) => {
  return _.map(table, obj => {
    return _.pick(obj, keys);
  });
};

const rename = (obj, newNames) => {
  return _.reduce(
    newNames,
    (o, nu, old) => {
      if (_.has(obj, old)) {
        o[nu] = obj[old];
        return o;
      } else return o;
    },
    _.omit.apply(null, construct(obj, _.keys(newNames)))
  );
};

const as = (table, newNames) => {
  return table.map(obj => rename(obj, newNames));
};

const restrict = (table, pred) => {
  return _.reduce(
    table,
    (newTable, obj) => {
      if (pred(obj)) return newTable;
      else return _.without(newTable, obj);
    },
    table
  );
};

const RQL = {
  select: curry2(project),
  as: curry2(as),
  where: curry2(restrict)
};

module.exports = RQL;
