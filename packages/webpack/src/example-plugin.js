const { validate } = require('schema-utils');

const schema = {
    type: 'object',
    properties: {
        test: {
            type: 'string'
        }
    }
}

class ExampleWebpackPlugin {
    constructor(options = {}) {
        validate(schema, options, {
            name: 'hello world plugin',
            baseDataPath: 'options',
        });
    }

    // Define `apply` as its prototype method which is supplied with compiler as its argument
    apply(compiler) {
        // Specify the event hook to attach to
        compiler.hooks.emit.tap(
            'MyExampleWebpackPlugin',
            (compilation) => {
                console.log('This is an example plugin!');
            }
        );
    }
}

module.exports = ExampleWebpackPlugin;