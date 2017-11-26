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
* [Rate Limiting](#rate-limiting)
* [Background](#background)
* [Deploy Yourself](#deploy-yourself)
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

```js
const Lipo = require('lipo');
const lipo = new Lipo();
lipo('input.jpg')
 .resize(300, 300)
 .toFile('output.jpg', err => {
   if (err) throw err;
   console.log('resized image');
 });
```

> **Lipo** is a drop-in replacement for Sharp (so you won't have to worry about cross-platform installation).

You can simply replace instances of `sharp` with `lipo`:

```diff
-const sharp = require('sharp');
+const Lipo = require('lipo');
-sharp('input.jpg')
+lipo('input.jpg')
  .resize(300, 200)
  .toFile('output.jpg', err => {
     if (err) throw err;
     console.log('resized image');
  });
```

> **Synchronous Methods**: We have also exposed three helper functions `toBufferSync`, `toFileSync`, and `metadataSync`. These are not included in [Sharp's][sharp] API, however we included them since they were needed for our project [custom-fonts-in-emails][]. You can use these if you need to run purely synchronous operations. They use the [deasync][] package under the hood!


## Rate Limiting

Note that if you use make more than 100 requests per hour from the same IP address or wish to exceed 20MB file upload size limitation, we will rate limit you until you sign up for an API key at <https://lipo.io>.

Once you sign up for a key, you can pass it as `const lipo = new Lipo({ key: 'YOUR_API_KEY_HERE' });` or as an environment variable (e.g. `LIPO_KEY=YOUR_API_KEY_HERE node app.js`).


## Background

After attempting to work with a team while building [Lad][], I instructed them how to install [Sharp][].

However between Docker, Ubuntu, and Mac cross-platform issues reported by the team, I wanted to drop Sharp completely as a dependency from [Lad][].

I tried pure JavaScript-based solutions like [Jimp][], and even tried PhantomJS and Puppeteer solutions, however they were all too slow.

Sharp was the fastest option, and therefore I thought making a drop-in replacement that uses a powerful server would be satisfactory.

Thus Lipo was born.


## Deploy Yourself

See the test folder for an example that shows how to use the middleware exposed as `Lipo.middleware`.


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

[deasync]: https://github.com/abbr/deasync

[custom-fonts-in-emails]: https://github.com/ladjs/custom-fonts-in-emails
