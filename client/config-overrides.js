const path = require('path');
const webpack = require('webpack');

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        fallback: {
            fs: false, // `fs` is not needed in the browser
            path: require.resolve('path-browserify'),
            zlib: require.resolve('browserify-zlib'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            os: require.resolve('os-browserify/browser'),
            process: require.resolve('process/browser'),
            buffer: require.resolve('buffer'),
            stream: require.resolve('stream-browserify')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    ]
};
