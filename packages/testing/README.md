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

### Validate Prettier

```sh
npx prettier src --list-different
```

To validate that all the files in the project have been formatted by Prettier, we can use a --list-different flag when we run Prettier. If there are any files that would be different if Prettier were to format them, then it will fail the script. Otherwise, the script will pass.

### Flow

Install flow-bin

```sh
npm install --save-dev flow-bin
```

Add flow script to package.json

Run flow init to generate .flowconfig

```sh
npm run flow init
```

Add [Flow Language Support](https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode) to teach it about Flow.

Adding these two lines to my user settings.json

```
    "flow.useNPMPackagedFlow": true,
    "javascript.validate.enable": false,
```
