# Prettier

```sh
npx prettier file
```

Format and save file

```sh

npx prettier --write file
```

### Prettier playground

[playground](https://prettier.io/playground/)

### Eslint-config-prettier

It is a configuration that we can extend that will automatically disable all the rules that Prettier renders irrelevant.

Install and add it to the very end of the extends property in .eslintrc. The configurations that come at the end will win in a conflict for rules for all the configurations that come before it.
