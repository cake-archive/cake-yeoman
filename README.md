# generator-cake [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]

> Yeoman generator for Cake build scripts

## Installation

First, install [Yeoman](http://yeoman.io) and generator-cake using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-cake
```

Then generate your new project:

```bash
yo cake
```

![Running 'yo cake'](art/yo-cake.gif)

or to generate only certain scripts:

```bash
yo cake:config
yo cake:bootstrapper
```

### Frosting

You can use our (experimental) generator for [Frosting](https://github.com/cake-build/frosting) to quickly setup a new project:

```bash
yo cake:frosting
```

![Running 'yo cake:frosting'](art/yo-frosting.gif)

## License

MIT © [Alistair Chapman](https://agchapman.com)


[npm-image]: https://badge.fury.io/js/generator-cake.svg
[npm-url]: https://npmjs.org/package/generator-cake
[daviddm-image]: https://david-dm.org/agc93/generator-cake.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/agc93/generator-cake
