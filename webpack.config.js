const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const WatchHtmlPlugin = require('./WatchHtmlPlugin');

// Development server configuration
const devServerConfiguration = {
  host: 'localhost',
  port: 8080,
  open: 'external',
  hot: true, // Enable Hot Module Replacement (HMR)
  liveReload: true, // Enable live reloading
  watchFiles: ['src/html/**/*.html'], // Watch HTML files
  static: path.resolve(__dirname, 'dist'),
  client: {
    overlay: true, // Display errors in the browser
  },
  server: {
    baseDir: ['dist'],
  },
  files: [path.resolve(__dirname, 'src/**/*')],
  ghostMode: {
    location: false,
  },
  injectChanges: true,
  logFileChanges: true,
};

module.exports = function (env, args) {
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: './js/index.bundle.js',
    },
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src'),
      },
    },
    devtool: 'source-map', // Generate sourcemaps for proper error messages
    performance: {
      hints: false, // Turn off size warnings for entry points
    },
    stats: {
      modules: false, // Turn off information about the built modules
      colors: true,
    },
    module: {
      rules: [
        {
          test: /\.(html)$/,
          use: {
            loader: 'html-srcsets-loader',
            options: {
              attrs: [':src', ':srcset'],
              interpolate: true,
              minimize: false,
              removeComments: false,
            },
          },
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: true,
                publicPath: '../',
              },
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                sourceMap: true,
              },
            },
            'resolve-url-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: {
                    autoprefixer: {},
                  },
                },
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(js)$/,
          loader: 'babel-loader',
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
          },
        },
      ],
    },
    plugins: [
      new WatchHtmlPlugin({
        srcDir: 'src/html',
        htmlPluginOptions: {
          hash: true,
        },
      }),
      new BrowserSyncPlugin(devServerConfiguration, {
        reload: false,
      }),
      new ESLintPlugin({
        emitError: true,
        emitWarning: true,
        context: path.resolve(__dirname, 'src/scripts'),
      }),
      new StylelintPlugin({
        emitErrors: true,
        emitWarning: true,
        configFile: path.resolve(__dirname, '.stylelintrc.js'),
        context: path.resolve(__dirname, 'src/assets/styles'),
      }),
      new MiniCssExtractPlugin({
        filename: './css/styles.css',
        experimentalUseImportModule: false,
      }),
    ],
  };
};
