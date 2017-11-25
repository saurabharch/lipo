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
