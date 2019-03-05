function plucker(field) {
  return function(obj) {
    return obj && obj[field];
  };
}

module.exports = plucker;
