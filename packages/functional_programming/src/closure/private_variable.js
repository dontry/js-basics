//private variable;
// if a returned value only depends on its params, then it's called referential tr4ansparency
const pingpong = function() {
  const private = 0;
  return {
    inc: function(n) {
      return (private += n);
    },
    dec: function(n) {
      return (private -= n);
    }
  };
};
