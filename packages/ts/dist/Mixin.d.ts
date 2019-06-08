declare class Animal {
    eat(): void;
}
declare class Mammal extends Animal {
    milk(): void;
}
declare class WingedAnimal extends Animal {
    fly(): void;
}
declare class Bat implements Mammal, WingedAnimal {
    eat(): void;
    fly(): void;
    milk(): void;
}
declare const mammal: Mammal;
declare const bat: Bat;
declare function applyMixins(derivedCtor: any, baseCtors: any[]): void;
declare const bat2: Bat;
//# sourceMappingURL=Mixin.d.ts.map