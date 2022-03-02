# FRONTEND BOILERPLATE

[![Bootstrap](https://img.shields.io/static/v1?label=Bootstrap&message=5.0.1&color=blueviolet)](https://getbootstrap.com)
[![FontAwesome](https://img.shields.io/static/v1?label=FontAwesome&message=4.7.0&color=brightgreen)](http://fontawesome.com/v4.7.0)
[![Bootstrap](https://img.shields.io/static/v1?label=jQuery&message=3.6.0&color=orange)](http://jquery.com)
[![Webpack](https://img.shields.io/static/v1?label=Webpack&message=5&color=83c6e8)](https://webpack.js.org)
[![BrowserSync](https://img.shields.io/static/v1?label=BrowserSync&message=2&color=red)](https://browsersync.io)
[![license](https://img.shields.io/static/v1?label=Licence&message=MIT&color=blue)](https://raw.githubusercontent.com/smarteist/Frontent-Starter-Boilerplate/master/LICENSE)

![Image](https://raw.githubusercontent.com/smarteist/Frontent-Starter-Boilerplate/master/src/assets/images/favicon.ico)

This boilerplate uses [Webpack](https://webpack.js.org/) boundler and its dev server helps you build web apps and sites much faster.
this project also uses [Bootstrap](https://getbootstrap.com/) , and a modern development workflow.

## Features

* **Live reloading** Time-saving synchronised browser update after changes by using [BrowserSync](https://browsersync.io/).
* **Automatically optimization** entry files <br> concatenate, minify and inject output files to HTML
* **[Sass](https://sass-lang.com/) for stylesheets** <br> with [the 7-1 Pattern](https://sass-guidelin.es/#the-7-1-pattern)
* **[Webpack 5](https://webpack.js.org/)** a good configuration - module bundler
* **[Bootstrap 5](http://getbootstrap.com/)** - the most popular HTML, CSS and JS framework
* **[jQuery 3.6.0](http://jquery.com/)** - JavaScript library
* **[Font Awesome 4.7](https://fontawesome.com/v4.7.0/icons/)** - the web's most popular vector icons and social logos


## Theme development

[Node.js](http://nodejs.org/) and npm is required dependency to work with *this starter*.
<br><br>
You can optionally use [Yarn](https://yarnpkg.com/en/) package manager as well.


#### Installation

1. Install [Node.js](http://nodejs.org/) (installation depends on operation system).
([npm is distributed with Node.js](https://www.npmjs.com/get-npm)).
2. It is recommended to install the latest version of yarn. [How to install yarn?](https://yarnpkg.com/en/docs/install)
3. Clone the repo using `git clone https://github.com/smarteist/Frontent-Starter-Boilerplate.git`.
4. Open project folder and run `npm install` command or if you installed yarn `yarn`. 

Its Done.

#### Build commands

* `yarn start` or `npm run start` ─ webpack can watch files and recompile whenever they change, and start [BrowserSync](https://browsersync.io/) server session.
* `yarn build` or `npm run build` ─ compile assets without any compression or optimization.
* `yarn build:production` or `npm run build:production` ─ compile and optimize (the files in your assets directory) for production.
* `yarn clean` or `npm run clean` ─ cleanup previous build files in /dist folder.
* `yarn lint:js` or `npm run lint:js` ─  this command will lint all js files based on ```.eslintrc.js```.
* `yarn lint:style` or `npm run lint:style` ─ This command will lint all style files based on ```.stylelintrc.js```

## Structure

Shorten directories and files structure which you'll see after build: 

```shell
▼ project/
│
├──▼ src/
│  ├──▼ assets/            # template asset files
│  │  ├──► fonts/          # place template fonts files here
│  │  ├──► images/         # template images files
│  │  └──▼ styles/         # template style files
│  │     ├── [...]         # 7-1 Sass architecture folders
│  │     └── main.scss     # main Sass file that references scss source files
│  ├──▼ html/              # template HTML files
│  │  ├──▼ partials/       # partials of HTML code
│  │  │  └── [...]
│  │  ├── 404.html         # example 404 error page
│  │  └── index.html       # default index page
│  │  └── [...]
│  ├──▼ scripts/           # template javascript files
│  │  ├──► modules/        # dedicated project modules
│  │  ├──▼ vendor/         # necessary parts of frameworks and libs
│  │  │  └── [...]         # Bootstrap, jQuery, etc...
│  │  └── main.js          # main javascript file that references JS source files
│  ├── index.js            # entry point of template
│  └── [...]
├──▼ dist/                 # distribution folder with production build (don't edit*)
│  ├──► css/               # output styles
│  ├──► images/            # output images
│  ├──► js/                # output javascripts
│  ├── index.html          # homepage
│  └── [...]               # miscellaneous
├──▼ node_modules/         # Node.js packages (don't edit*)
│  └── [...]
├── .babelrc               # Babel configuration file
├── .eslintrc.js           # ESLint configuration file
├── .stylelintrc.js        # StyleLint configuration file
├── package.json           # Node.js dependencies and scripts
├── webpack.config.js      # Webpack configuration file
├── package-lock.json      # Node.js dependencies lock file (don't edit)
└── [...]                  # other files
```

## License

Code released under the [MIT license](https://raw.githubusercontent.com/smarteist/Frontent-Starter-Boilerplate/master/LICENSE).
