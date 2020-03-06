const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        'app': './src/main.ts',
        'polyfills': './src/polyfills.ts'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        symlinks: true
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader', 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.css$/,
                loaders: ['to-string-loader', 'css-loader', 'sass-loader']
            }           
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new BaseHrefWebpackPlugin({ baseHref: '/db/bqbvg2ysq/' })
    ],
    optimization: {
        minimize: true,
        removeAvailableModules: true,
        removeEmptyChunks: true,
        namedChunks: true,
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 800000,
            minChunks: 1,
            maxAsyncRequests: 2,
            maxInitialRequests: 2,
            automaticNameDelimiter: '~',
            automaticNameMaxLength: 30,
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    }
}