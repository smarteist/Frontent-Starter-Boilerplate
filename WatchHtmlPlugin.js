const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const glob = require('glob');

class WatchHtmlPlugin {
    constructor(options) {
        this.options = options;
        this.initialFiles = new Set();
    }

    apply(compiler) {
        // Gather initial HTML files
        const files = glob.sync(`${this.options.srcDir}/**/*.html`);
        files.forEach(file => this.initialFiles.add(file));
        // Add HtmlWebpackPlugin instances for initial files
        compiler.options.plugins.push(...this.createHtmlPlugins(files));
    }

    createHtmlPlugins(files) {
        return files.map(filePath => {
            const relativePath = path.relative(this.options.srcDir, filePath);
            const outputFilename = relativePath.replace(/\\/g, '/');
            const htmlPluginOptions = {
                ...this.options.htmlPluginOptions,
                template: filePath,
                filename: outputFilename,
            };
            return new HtmlWebpackPlugin(htmlPluginOptions);
        });
    }
}
module.exports = WatchHtmlPlugin;
