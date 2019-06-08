"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Animal = /** @class */ (function () {
    function Animal() {
    }
    //   public _species: string;
    //   constructor(species: string) {
    //     this._species = species;
    //   }
    Animal.prototype.eat = function () {
        console.log("animal eats");
    };
    return Animal;
}());
var Mammal = /** @class */ (function (_super) {
    __extends(Mammal, _super);
    function Mammal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //   constructor(species: string) {
    //     super(species);
    //   }
    Mammal.prototype.milk = function () {
        console.log("mammal milks");
    };
    return Mammal;
}(Animal));
var WingedAnimal = /** @class */ (function (_super) {
    __extends(WingedAnimal, _super);
    function WingedAnimal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //   constructor(species: string) {
    //     super(species);
    //   }
    WingedAnimal.prototype.fly = function () {
        console.log("wingedAnimal flies");
    };
    return WingedAnimal;
}(Animal));
// we can't and constructor function
var Bat = /** @class */ (function () {
    function Bat() {
    }
    Bat.prototype.eat = function () { };
    Bat.prototype.fly = function () { };
    Bat.prototype.milk = function () { };
    return Bat;
}());
var mammal = new Mammal();
mammal.eat();
var bat = new Bat();
bat.eat();
function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach(function (baseCtor) {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
            if (name !== "constructor") {
                console.log("baseCtor prototype name: " + name);
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            }
        });
    });
}
// it can only inherit the properties and methods form one level
// the second base class will override the methods of the first base class with same name
applyMixins(Bat, [Mammal, WingedAnimal]);
var bat2 = new Bat();
bat2.eat(); // the Animal methods are not inherited
bat2.fly();
