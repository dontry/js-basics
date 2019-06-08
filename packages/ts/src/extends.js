function extends(d, b) {
    for(var p in b) {
        if(b.hasOwnProperty(p)) {
            d[p] = b[p]
        }
    }
    // __ and this.constructor are pointing to the same derived class
    function __() { this.constructor = d;}
    __.prototype = b.prototype;
    // d inherits __;
    d.prototype =  new __();
}


// the problem is parent constructor is called twice;
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child (name, age) {
    Parent.call(this, name); //first
    this.age = age;

}

Child.prototype = new Parent(); //second
Child.prototype.constructor = Child;




// Optimal
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child (name, age) {
    Parent.call(this, name);
    this.age = age;
}

//如果我们不使用 Child.prototype = new Parent() ，而是间接的让 Child.prototype 访问到 Parent.prototype 呢？
var F = function () {};

F.prototype = Parent.prototype;

Child.prototype = new F();


var child1 = new Child('kevin', '18');

console.log(child1);
