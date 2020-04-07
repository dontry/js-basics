# Design Pattern

## Creational Pattern

### Factory

Factory Method is a creational design pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created.

- Use the Factory Method when you don’t know beforehand the exact types and dependencies of the objects your code should work with.

- Use the Factory Method when you don’t know beforehand the exact types and dependencies of the objects your code should work with.

- Use the Factory Method when you want to save system resources by reusing existing objects instead of rebuilding them each time.

### Builder

Builder is a creational design pattern, which allows constructing complex objects step by step.

- Use the Builder pattern when you want your code to be able to create different representations of some product

- Use the Builder to construct Composite trees or other complex objects.

## Structural Design Patterns

### Adapter

Adapter is a structural design pattern that allows objects with incompatible interfaces to collaborate.

- Use the Adapter class when you want to use some existing class, but its interface isn’t compatible with the rest of your code.

- Use the pattern when you want to reuse several existing subclasses that lack some common functionality that can’t be added to the superclass.

### Bridge

Bridge is a structural design pattern that lets you split a large class or a set of closely related classes into two separate hierarchies—abstraction and implementation—which can be developed independently of each other.

- Use the Bridge pattern when you want to divide and organize a monolithic class that has several variants of some functionality (for example, if the class can work with various database servers).

- Use the pattern when you need to extend a class in several orthogonal (independent) dimensions.

- Use the Bridge if you need to be able to switch implementations at runtime.

### Composite

Composite is a structural design pattern that lets you compose objects into tree structures and then work with these structures as if they were individual objects.

- Use the Composite pattern when you have to implement a **tree-like** object structure.

- Use the pattern when you want the client code to treat both simple and complex elements uniformly.

### Proxy

Proxy is a structural design pattern that lets you provide a substitute or placeholder for another object. A proxy controls access to the original object, allowing you to perform something either before or after the request gets through to the original object.

- **Lazy initialization** (virtual proxy). This is when you have a heavyweight service object that wastes system resources by being always up, even though you only need it from time to time.

- **Access control** (protection proxy). This is when you want only specific clients to be able to use the service object; for instance, when your objects are crucial parts of an operating system and clients are various launched applications (including malicious ones).

- **Local execution** of a remote service (remote proxy). This is when the service object is located on a remote server.

- **Logging requests** (logging proxy). This is when you want to keep a history of requests to the service object.

- **Caching request results** (caching proxy). This is when you need to cache results of client requests and manage the life cycle of this cache, especially if results are quite large.

- **Smart reference**. This is when you need to be able to dismiss a heavyweight object once there are no clients that use it.

## Behavioral Design Patterns

Behavioral design patterns are concerned with algorithms and the assignment of responsibilities between objects.

### Chain of Responsibility

Chain of Responsibility is a behavioral design pattern that lets you pass requests along a chain of handlers. Upon receiving a request, each handler decides either to process the request or to pass it to the next handler in the chain.

### Command

Command is a behavioral design pattern that turns a request into a **stand-alone object** that contains all information about the request. This transformation lets you parameterize methods with different requests, delay or queue a request’s execution, and support undoable operations.

- Use the Command pattern when you want to parametrize objects with operations.

- Use the Command pattern when you want to queue operations, schedule their execution, or execute them remotely.

- Use the Command pattern when you want to implement reversible operations.

### Visitor

Visitor is a behavioral design pattern that lets you separate algorithms from the objects on which they operate. Visitor pattern addresses this problem. It uses a technique called Double Dispatch, which helps to execute the proper method on an object without cumbersome conditionals.

- Use the Visitor when you need to perform an operation on all elements of a complex object structure (for example, an object tree).

- Use the Visitor to clean up the business logic of auxiliary behaviors.

- Use the pattern when a behavior makes sense only in some classes of a class hierarchy, but not in others.

### Mediator

Mediator is a behavioral design pattern that lets you reduce chaotic dependencies between **a group of tightly coupled classes**. The pattern restricts direct communications between the objects and forces them to collaborate only via **a mediator object**.

- Use the Mediator pattern when it’s hard to change some of the classes because they are tightly coupled to a bunch of other classes.

- Use the pattern when you can’t reuse a component in a different program because it’s too dependent on other components.

- Use the Mediator when you find yourself creating tons of component subclasses just to reuse some basic behavior in various contexts.

### Iterator

Iterator is a behavioral design pattern that lets you traverse elements of a collection without exposing its underlying representation (list, stack, tree, etc.).

- Use the Iterator pattern when your collection has a complex data structure under the hood, but you want to hide its complexity from clients (either for convenience or security reasons).

- Use the pattern to reduce duplication of the traversal code across your app.

- Use the Iterator when you want your code to be able to traverse different data structures or when types of these structures are unknown beforehand.

### Strategy

Strategy is a behavioral design pattern that lets you define **a family of algorithms**, put each of them into a separate class, and make their objects interchangeable.

- Use the Strategy pattern when you want to use different variants of an algorithm within an object and be able to switch from one algorithm to another during runtime.

- Use the Strategy when you have a lot of similar classes that only differ in the way they execute some behavior.

- Use the pattern to isolate the business logic of a class from the implementation details of algorithms that may not be as important in the context of that logic.

- Use the pattern when your class has a massive conditional operator that switches between different variants of the same algorithm.

### Template

Template Method is a behavioral design pattern that defines the skeleton of an algorithm in the superclass but lets subclasses **override specific steps of the algorithm** without changing its structure.

- Use the Template Method pattern when you want to let clients **extend only particular steps of an algorithm**&, but not the whole algorithm or its structure.

- Use the pattern when you have several classes that contain almost identical algorithms with some minor differences. As a result, you might need to modify all classes when the algorithm changes.
