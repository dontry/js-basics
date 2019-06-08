class Animal {
  //   public _species: string;
  //   constructor(species: string) {
  //     this._species = species;
  //   }
  public eat() {
    console.log("animal eats");
  }
}

class Mammal extends Animal {
  //   constructor(species: string) {
  //     super(species);
  //   }
  public milk() {
    console.log("mammal milks");
  }
}

class WingedAnimal extends Animal {
  //   constructor(species: string) {
  //     super(species);
  //   }
  public fly() {
    console.log("wingedAnimal flies");
  }
}

// we can't and constructor function
class Bat implements Mammal, WingedAnimal {
  eat() {}
  fly() {}
  milk() {}
}

const mammal = new Mammal();
mammal.eat();

const bat = new Bat();
bat.eat();

function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      if (name !== "constructor") {
        console.log(`baseCtor prototype name: ${name}`);
        derivedCtor.prototype[name] = baseCtor.prototype[name];
      }
    });
  });
}

// it can only inherit the properties and methods form one level
// the second base class will override the methods of the first base class with same name
applyMixins(Bat, [Mammal, WingedAnimal]);

const bat2 = new Bat();
bat2.eat(); // the Animal methods are not inherited
bat2.fly();
