const HtmlWebpackPlugin = require("html-webpack-plugin");
const colors = require("ansi-colors");
const chokidar = require("chokidar");
const spawn = require("cross-spawn");
const path = require("path");
const glob = require("glob");

module.exports = class WatchHtmlPlugin {
  constructor(options) {
    this.options = options;
    this.initialFiles = new Set();
    this.watcher = null;
    this.browserSyncInstance = null;
    this.serverProcess = null;
    this.restartTimeout = null;
  }

  apply(compiler) {
    this.initializeFiles();
    this.addInitialHtmlPlugins(compiler);
    this.browserSyncInstance = this.findBrowserSyncInstance(compiler);

    compiler.hooks.watchRun.tapAsync(
      "WatchHtmlPlugin",
      (compilation, callback) => {
        if (!this.watcher) this.setupFileWatcher();
        callback();
      }
    );
  }

  initializeFiles() {
    glob
      .sync(`${this.options.srcDir}/**/*.html`)
      .forEach((file) => this.initialFiles.add(path.resolve(file)));
  }

  addInitialHtmlPlugins(compiler) {
    this.createHtmlPlugins(Array.from(this.initialFiles)).forEach((plugin) =>
      plugin.apply(compiler)
    );
  }

  createHtmlPlugins(files) {
    return files.map(
      (filePath) =>
        new HtmlWebpackPlugin({
          ...this.options.htmlPluginOptions,
          template: filePath,
          filename: path
            .relative(this.options.srcDir, filePath)
            .replace(/\\/g, "/"),
        })
    );
  }

  findBrowserSyncInstance(compiler) {
    return (
      compiler.options.plugins?.find(
        (plugin) =>
          plugin.browserSync && typeof plugin.browserSync.exit === "function"
      )?.browserSync || null
    );
  }

  setupFileWatcher() {
    this.watcher = chokidar.watch(`${this.options.srcDir}/*.html`, {
      ignoreInitial: true,
    });
    this.watcher.on("add", this.debounceRestart.bind(this));
    this.watcher.on("unlink", this.debounceRestart.bind(this));
    this.watcher.on("error", (error) =>
      console.error(
        colors.bgRed.whiteBright(`[WatchHtmlPlugin] Watcher error: ${error}`)
      )
    );
  }

  stopBrowserSync() {
    return this.browserSyncInstance
      ? new Promise((resolve) => {
          this.browserSyncInstance.exit();
          this.browserSyncInstance = null;
          resolve();
        })
      : Promise.resolve();
  }

  stopServerProcess() {
    return this.serverProcess
      ? new Promise((resolve) => {
          this.serverProcess.on("exit", () => {
            this.serverProcess = null;
            resolve();
          });
          this.serverProcess.kill("SIGTERM");
        })
      : Promise.resolve();
  }

  debounceRestart() {
    clearTimeout(this.restartTimeout);
    this.restartTimeout = setTimeout(() => this.restartDevServer(), 300);
  }

  restartDevServer() {
    console.log(
      colors.bgRed.whiteBright.bold(
        "[WatchHtmlPlugin] Restarting the development server..."
      )
    );
    Promise.all([this.stopBrowserSync(), this.stopServerProcess()])
      .then(() => {
        this.serverProcess = spawn("npm", ["run", "start"], {
          stdio: "inherit",
        });
      })
      .catch((error) =>
        console.error(
          colors.bgRed.whiteBright(
            "[WatchHtmlPlugin] Error during restart:",
            error
          )
        )
      );
  }
};
