const isProd = String(process.env.NODE_ENV) === "production";
const isTest = String(process.env.NODE_ENV) === "test";

//ES modules are not supported in Node.
//We have our Babel configured so that it can transpile those modules,
//except we have that disabled because we want webpack to utilize tree shaking.
module.exports = {
  presets: [
    ["@babel/preset-env", { modules: isTest ? "commonjs" : false }],
    "@babel/preset-react"
  ],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    [
      "emotion",
      {
        hoist: !isProd,
        sourceMap: !isProd,
        autoLabel: !isProd,
        labelFormat: "[local]",
        cssPropOptimization: true
      }
    ],
    "react-loadable/babel"
  ].filter(Boolean)
};
