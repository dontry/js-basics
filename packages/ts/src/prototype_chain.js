var foo = {};

// setup on foo as well as foo.__proto__
foo.bar = 123;
foo.__proto__.bar = 456;

console.log(foo.bar); // 123
delete foo.bar; // remove from object
console.log(foo.bar); // 456
delete foo.__proto__.bar; // remove from foo.__proto__
console.log(foo.bar); // undefined

//Another useful fact is that all functions in JavaScript have
//a property called prototype and that it has a member constructor pointing back to the function. This is shown below:

function Foo() {}
console.log(Foo.prototype); // {} i.e. it exists and is not undefined
console.log(Foo.prototype.constructor === Foo); // Has a member called `constructor` pointing back to the function

// Basically this inside the called function is going to point to the newly created object that will be returned from the function. It's simple to see if you mutate a property on this inside the function:
function Foo2() {
  this.bar = 123;
}

// call with the new operator
var newFoo = new Foo2();
console.log(newFoo.bar); // 123
console.log(newFoo.__proto__ === Foo2.prototype); // True!

var __extends =
  this.__extends ||
  function(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    } //just the proto changed and maintain the old d.prototype.constructor
    __.prototype = b.prototype; //line 2 (__.prototype = b.prototype;) you get d.prototype = {__proto__ : b.prototype}.
    d.prototype = new __(); // means d.prototype = {__proto__ : __.prototype}
  };

// since we restore d.prototype.constructor, the only thing we have truly mutated is the __proto__ hence d.prototype.__proto__ = b.prototype.
