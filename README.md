# Lipo

[![build status](https://img.shields.io/travis/niftylettuce/lipo.svg)](https://travis-ci.org/niftylettuce/lipo)
[![code coverage](https://img.shields.io/codecov/c/github/niftylettuce/lipo.svg)](https://codecov.io/gh/niftylettuce/lipo)
[![code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![made with lass](https://img.shields.io/badge/made_with-lass-95CC28.svg)](https://lass.js.org)
[![license](https://img.shields.io/github/license/niftylettuce/lipo.svg)](LICENSE)

> Free image manipulation API service built on top of [Sharp][] (an alternative to [Jimp][], [Graphics Magic][gm], [Image Magick][im], and PhantomJS)


## Table of Contents

* [Install](#install)
* [Usage](#usage)
* [Background](#background)
* [Contributors](#contributors)
* [License](#license)


## Install

[npm][]:

```sh
npm install lipo
```

[yarn][]:

```sh
yarn add lipo
```


## Usage

> To keep things simple you can use the exact same API that [Sharp][] offers.

1. Go to <https://lipo.io> and get a free API key

2. Integrate `lipo` in two extra lines of code:

   ```js
   const Lipo = require('lipo');
   const lipo = new Lipo({ key: 'YOUR_API_KEY_HERE' });
   lipo('input.jpg')
     .resize(300, 300)
     .toFile('output.jpg', err => {
       if (err) throw err;
       console.log('resized image');
     });
   ```

You can also pass your API key as an environment variable (e.g. `LIPO_KEY=YOUR_API_KEY_HERE node app.js`), and then you can simply call `const lipo = new Lipo();` without having to pass an API key option.

> **Lipo** is a drop-in replacement for Sharp (so you won't have to worry about cross-platform installation).

You can simply replace instances of `sharp` with `lipo` after you initialize it with your API key:

```diff
-const sharp = require('sharp');
+const Lipo = require('lipo');
+const lipo = new Lipo('YOUR_API_KEY_HERE');
-sharp('input.jpg')
+lipo('input.jpg')
  .resize(300, 200)
  .toFile('output.jpg', err => {
     if (err) throw err;
     console.log('resized image');
  });
```


## Background

After attempting to work with a team while building [Lad][], I instructed them how to install [Sharp][].

However between Docker, Ubuntu, and Mac cross-platform issues reported by the team, I wanted to drop Sharp completely as a dependency from [Lad][].

I tried pure JavaScript-based solutions like [Jimp][], and even tried PhantomJS and Puppeteer solutions, however they were all too slow.

Sharp was the fastest option, and therefore I thought making a drop-in replacement that uses a powerful server would be satisfactory.

Thus Lipo was born.


## Contributors

| Name           | Website                    |
| -------------- | -------------------------- |
| **Nick Baugh** | <http://niftylettuce.com/> |


## License

[MIT](LICENSE) © [Nick Baugh](http://niftylettuce.com/)


## 

[npm]: https://www.npmjs.com/

[yarn]: https://yarnpkg.com/

[sharp]: http://sharp.dimens.io/

[jimp]: https://github.com/oliver-moran/jimp

[gm]: https://aheckmann.github.io/gm/

[im]: https://github.com/yourdeveloper/node-imagemagick

[lad]: https://lad.js.org
