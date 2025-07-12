const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production', // Minifies output for production
    entry: './src/index.js', // Entry point (you’ll create this)
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js', // Output file name
        clean: true // Clears dist folder before each build
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Source HTML
            filename: 'index.html' // Output HTML in dist
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/style.css', to: 'style.css' } // Copy CSS to dist
            ]
        })
    ]
};