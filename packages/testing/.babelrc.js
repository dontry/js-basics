const isProd = String(process.env.NODE_ENV) === "production";
const isTest = String(process.env.NODE_ENV) === "test";

//ES modules are not supported in Node.
//We have our Babel configured so that it can transpile those modules,
//except we have that disabled because we want webpack to utilize tree shaking.

//modules should be compiled to commonjs during the tests.
//However, that's just for static modules.
//Here, we're using a dynamic import that Webpack supports natively.
//That is failing our test because babel won't transpile this to commonjs.
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      //This option is useful for "blacklisting" a transform like @babel/plugin-transform-regenerator if you don't use generators and don't want to include regeneratorRuntime (when using useBuiltIns)
      { modules: isTest ? "commonjs" : false, useBuiltIns: "usage" }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    [
      "emotion",
      {
        sourceMap: !isProd,
        autoLabel: !isProd,
        labelFormat: "[filename]--[local]",
        cssPropOptimization: true
      }
    ],
    "react-loadable/babel",
    isTest ? "babel-plugin-dynamic-import-node" : null
  ].filter(Boolean)
};
