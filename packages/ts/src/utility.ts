type DeepPartial<T> = {
  [U in keyof T]?: T[U] extends object ? DeepPartial<T> : T[U];
};

type required<T> = { [P in keyof T]-?: T[P] };

type a = Required<{ a?: number }>;

interface xx {
  a: string;
  b: string;
  c: string;
}
type Diff<T, U> = T extends U ? never : T;

type g = Omit<xx, "a" | "b">;
type cc = Exclude<keyof xx, "a">;

type Intersection<T extends object, U extends object> = Pick<
  T,
  Extract<keyof T, keyof U> & Extract<keyof U, keyof T>
>;

type Overwrite<
  T extends object,
  U extends object,
  I = Diff<T, U> & Intersection<U, T>
> = Pick<I, keyof I>;

type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};
