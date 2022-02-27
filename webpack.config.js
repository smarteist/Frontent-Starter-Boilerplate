const path = require('path');
const glob = require("glob");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

// dev server configuration
const devServerConfiguration = {
  host: 'localhost',
  server: {
    baseDir: ['dist']
  },
  port: 8080,
  open: 'external',
  reload: false,
  watch: true
};

// eslint-disable-next-line no-unused-vars
module.exports = function (env, args) {

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: './js/index.bundle.js',
    },
    // Generate sourcemaps for proper error messages
    devtool: 'source-map',
    performance: {
      // Turn off size warnings for entry points
      hints: false,
    },
    stats: {
      // Turn off information about the built modules.
      modules: false,
      colors: true,
    },
    /// -------
    /// MODULES
    /// -------
    module: {
      rules: [
        {
          test: /\.(html)$/,
          use: {
            loader: "html-srcsets-loader",
            options: {
              attrs: [":src", ':srcset'],
              interpolate: true,
              minimize: false,
              removeComments: false,
            }
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: true,
                publicPath: '../',
              }
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                sourceMap: true
              }
            },
            {
              loader: 'resolve-url-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: {
                    'autoprefixer': {},
                  },
                },
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              }
            },
          ],
        },
        {
          test: /\.(js)$/,
          loader: 'babel-loader',
        },
        {
          enforce: 'pre', // checked before being processed by babel-loader
          test: /\.(js)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          type: 'asset/resource',
          generator: {
            filename: 'images/[hash][ext]',
          },
        },
        {
          test: /(favicon\.ico|site\.webmanifest|browserconfig\.xml|robots\.txt|humans\.txt)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
        {
          test: /\.(woff(2)?|ttf|eot)(\?[a-z0-9=.]+)?$/,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name]-[hash][ext][query]',
          }
        },
      ],
    },
    /// -------
    /// PLUGINS
    /// -------
    plugins: [
      // sync html files dynamically
      ...glob.sync('src/html/**/*.html').map(fileName => {
        return new HtmlWebpackPlugin({
          template: fileName,
          minify: false, // Disable minification during production mode
          filename: fileName.replace("src/html/", ""),
          hash: true,
        });
      }),
      new BrowserSyncPlugin({
        ...devServerConfiguration,
        files: ['./src/**/*'],
        ghostMode: {
          location: false,
        },
        injectChanges: true,
        logFileChanges: true,
        notify: true,
        reloadDelay: 0,
      }),
      new StylelintPlugin({
        emitErrors: true,
        emitWarning: true,
        configFile: path.resolve(__dirname, '.stylelintrc.js'),
        context: path.resolve(__dirname, 'src/assets/styles'),
      }),
      new MiniCssExtractPlugin({
        filename: './css/styles.css',
        experimentalUseImportModule: false
      }),
    ]
  }

}

// Read this
console.log(
  '\x1b[41m\x1b[38m%s\x1b[0m',
  '\n[REMEMBER TO RESTART THE SERVER WHEN YOU ADD A NEW HTML FILE.]\n'
);
