//private variable;
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
