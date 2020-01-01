// naked type param
type NakedUsage<T> = T extends boolean ? "YES" : "NO";
// non-naked type param
type WrappedUsage<T> = [T] extends [boolean] ? "YES" : "NO";

type Distributed = NakedUsage<number | boolean>; //  = NakedUsage<number> | NakedUsage<boolean> =  "NO" | "YES"
type NotDistributed = WrappedUsage<number | boolean>; // "NO"

type diff<T, U> = T extends U ? never : T;
type R = diff<"a" | "b" | "c" | "d", "a" | "c" | "f">;

type filter<T, U> = T extends U ? T : never;
type F = filter<"a" | "b" | "c" | "d", "a" | "c" | "f">;

type nonNullable<T> = diff<T, null | undefined>;
type R2 = NonNullable<string | number | undefined>; // string | number

//假设我们把Part代入泛型T,[K in keyof T]相当于遍历整个interface
//这时K相当于interface的key,T[K]相当于interface的value
//接下来,用条件类型验证value的类型,如果是Function那么将value作为新interface的key保留下来,否则为never
//到这里我们得到了遍历修改后的新interface即:
type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

//mariusschulz.com/blog/conditional-types-in-typescript
interface People {
  id: string;
  name: string;
  age?: number;
  from?: string;
}

// 1. Record<K, T[K]> --> {[K]: type}
// 2. If property is optional, then T extends Record<K, T[K]> return false
type OptionalKeys<T> = {
  [K in keyof T]: T extends Record<K, T[K]> ? never : K;
}[keyof T];
type optionalKeys = OptionalKeys<People>;

type Age = Record<"age", number>;

type x = People extends Age ? "Yes" : "No";
