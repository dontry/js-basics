class Images {
  public src: string =
    "https://www.google.com.hk/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png";
  public alt: string = "谷歌";
  public width: number = 500;
}

type propsNames = keyof Images;

type propsType = Images[propsNames];

function pick<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n]);
}

const fullname = Symbol("name");

const user = {
  username: "Jay",
  id: "12345",
  token: "xxxxx",
  [fullname]: "Jay Chou"
};

const res = pick(user, ["token", fullname]);

type partial<T> = { [K in keyof T]?: T[K] };

interface User {
  username: string;
  id: number;
  token: string;
}

type partialUser = partial<User>;
