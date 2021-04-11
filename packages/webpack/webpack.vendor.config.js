const webpack = require('webpack')
const path = require('path');

// https://blog.logrocket.com/speed-up-your-webpack-build-with-the-dll-plugin/
module.exports = {
    mode: 'development',
    entry: {
        vendor: ['lodash-es'],
    },
    output: {
        filename: 'vendor.bundle.js',
        path: path.join(__dirname, 'build'),
        library: 'vendor_lib'
    },
    plugins: [
        new webpack.DllPlugin({
            name: 'vendor_lib',
            path: path.join(__dirname, 'build', 'vendor-manifest.json')
        })
    ]
}