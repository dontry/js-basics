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
3.  [iterateUtil](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/high_order_functions/iterateUtils.js), it takes two functions: a function that performs actions and another that works as a checker.

### Functions That Returns Other Functions

1. [Always](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/high_order_functions/always.js)

2. [Invoker](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/high_order_functions/invoker.js)

### A Function to Guard Against Nonexisitence: [fnull](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/high_order_functions/fnull.js)

### Object Validator

- [validator](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/high_order_functions/validator.js)

- [checker](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/high_order_functions/validator.js): A combination of validators

### Functional Composition

1. [dispatcher](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/composer/dispatch.js)

   1. Make sure the target exists.

   2. Check if there is a native version and use it if so.

   3. If not, then do some specific tasks implementing the behavior:

      - Do type-specific tasks, if applicable.
      - Do argument-specific tasks, if applicable.
      - Do argument count−specific tasks, if applicable.

A dispatch eliminates is the switch statement manual dispatch

2. [curry](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/composer/curry.js)

3. [partial](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/composer/partial.js)

4. [precondition](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/composer/precondition.js)

5. [compose](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/composer/compose.test.js) Sticthing Functions End-to-End with Compose

## Recursion

- Recursive solutions involve the use of a single abstraction applied to subsets of a common problem.
- Recursion can hide mutable state.
- Recursion is one way to implement laziness and infinitely large structures.

Self-recursive functions are as follows(Touretzky 1990):

- Know when to stop
- Decide how to take one step
- Break the problem into that step and a smaller problem”

1. [cycle](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/recursion/cycle.js)

2. [unzip](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/recursion/constructPair.js)

3. [trampoline](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/recursion/trampoline.js) The typical recursive functions could sometimes blow the stack. A trampoline flattens out the calls instead of a deeply nested recursive call.

4. [generator](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/recursion/generator.js) In generate, the tail is not executed before access which means every access requires a recomputation.

## Purity, Immutability, and Policies for Change

1. [Testing random string genertator](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/pure/randomString.test.js) Separate the pure from the impure.

2. [Defensive Freezing and Cloning](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/pure/deepFreeze.js)

3. [Observing Immutability at the Function Level](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/pure/merge.js)

4. [Observe Immutability in Ojbects](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/pure/Queue.js)

## Flow-Based Programming

The “magic” that allows method chains is that each method in the chain returns the same host object reference.

1. [A Lazy Chain](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/flow-based/LazyChain.js) “, LazyChain works with an explicit array of functions. Using thunk and loopback calls to make the lazy chain more elegant. One downside of chaining is that it mutates some common reference from on call to the rest.

2. [Pipelining](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/flow-based/pipeline.js) In a pipeline, the original data presented to a function remains the same after the call. Pipeline performs nondestructive transformations. [RQL](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/flow-based/RQL.js) is a great example by using pipelining to create query operations.

3. [Actions](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/flow-based/actions.js) is a technique for compose functions for incongruous return types. First we need to find a common shape to flow between nodes. Now, the implementation of the actions function to manage these intermediate states is a hybrid of the pipeline and lazyChain implementations.

4. [Lift](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/flow-based/lift.js) A Function to Simplify Action Creation.

## Programming Without Class

1. [lazyChain](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/classless/lazyChain.js) This is almost the exact code as LazyChain. Except:

- The lazy chain is initiated via a function call.
- The call chain (in calls) is private data.[99]
- There is no explicit LazyChain type.”

2. [Mixins](https://github.com/dontry/js-basics/blob/master/packages/functional_programming/src/classless/mixins.js)
