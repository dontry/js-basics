# Functional Programming

## Variable Scopes & Closures

### Global Scope

Any variable declared in JavaScript without the var keyword is created in the global scope, or the scope accessible to every function and method in our program.

### Lexical Scope

Lexical scope refers to the visibility of a variable and its value analogous to its textual representation.

### Dynamic Scope

Dynamic scoping is built on the idea of a global table of named values. At the heart of any JavaScript engine you will see—if not in implementation, then in spirit—one big honking lookup table. [Demo](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/closure/binding.js)

### Function Scope

### Closures

[use captured variables as private data.](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/closure/private_variable.js)

---

## Higher-Order Functions

### Functions That Take Other Functions

1.  [Finder](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/high_order_functions/finder.js)
2.  [Repeat](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/high_order_functions/repeat.js)
3.  [iterateUtil](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/high_order_functions/iterateUtil.js), it takes two functions: a function that performs actions and another that works as a checker.

### Functions That Returns Other Functions

1. [Always](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/high_order_functions/always.js)

2. [Invoker](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/high_order_functions/invoker.js)

### A Function to Guard Against Nonexisitence: [fnull](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/high_order_functions/fnull.js)

### Object Validator

- [validator](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/high_order_functions/validator.js)

- [checker](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/high_order_functions/validator.js): A combination of validators
