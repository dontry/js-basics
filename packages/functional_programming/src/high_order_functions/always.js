//always return same value or reference;
function always(value) {
  return () => value;
}

module.exports = always;
