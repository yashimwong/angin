const path = require('path');
const webpack = require('webpack');
const config = require('./config');
async function compile(options) {
    const compiler = webpack(options);
    try {
        return await new Promise((resolve, reject) => compiler.run((error, stats) => {
            if (error || stats.hasErrors()) reject(error || new Error(stats.toString({ all: false, errors: true })));
            else resolve(stats.toJson({ all: false, assets: true, entrypoints: true }));
        }));
    } finally { await new Promise((resolve, reject) => compiler.close(error => error ? reject(error) : resolve())); }
}
async function buildBundles() {
    const shared = {
        mode: 'production', devtool: false, performance: false,
        resolve: { extensions: ['.tsx', '.ts', '.js'] },
        module: { rules: [{ test: /\.tsx?$/, exclude: /node_modules/, use: path.join(__dirname, 'build/ts-loader.js') }] },
        optimization: { minimize: true },
    };
    const server = path.join(config.cache, 'demos.cjs');
    await compile({ ...shared, target: 'node', entry: path.join(__dirname, 'demos/registry.js'), externals: { react: 'commonjs react', 'react-dom': 'commonjs react-dom' }, output: { path: config.cache, filename: 'demos.cjs', chunkFilename: '[name].[contenthash:12].cjs', library: { type: 'commonjs2' } } });
    const client = await compile({ ...shared, target: ['web', 'es2018'], entry: { main: path.join(__dirname, 'client/index.js') }, output: { path: path.join(config.output, 'assets'), filename: '[name].[contenthash:12].js', chunkFilename: '[name].[contenthash:12].js', publicPath: 'auto' }, optimization: { minimize: true, splitChunks: { chunks: 'async', minSize: 10000 } } });
    return { server, client: client.entrypoints.main.assets.find(asset => asset.name.endsWith('.js')).name };
}
module.exports = { buildBundles };
