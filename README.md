<h1 align="center">
  <a href="https://lipo.io"><img src="media/logo-100x61@2x.png" width="100" height="61" alt="lipo" /></a>
</h1>
<div align="center">
  <a href="http://slack.crocodilejs.com"><img src="http://slack.crocodilejs.com/badge.svg" alt="chat" /></a>
  <a href="https://semaphoreci.com/niftylettuce/lipo"><img src="https://semaphoreci.com/api/v1/niftylettuce/lipo/branches/master/shields_badge.svg" alt="build status"></a>
  <a href="https://codecov.io/github/lipojs/lipo"><img src="https://img.shields.io/codecov/c/github/lipojs/lipo/master.svg" alt="code coverage" /></a>
  <a href="https://github.com/sindresorhus/xo"><img src="https://img.shields.io/badge/code_style-XO-5ed9c7.svg" alt="code style" /></a>
  <a href="https://github.com/prettier/prettier"><img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg" alt="styled with prettier" /></a>
  <a href="https://lass.js.org"><img src="https://img.shields.io/badge/made_with-lass-95CC28.svg" alt="made with lass" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/lipojs/lipo.svg" alt="license" /></a>
</div>
<br />
<div align="center">
  Lipo is a free image manipulation API service built on top of <a href="#">Sharp</a>
</div>
<div align="center">
  <sub>
    Need an alternative to <a href="https://github.com/oliver-moran/jimp">Jimp</a>, <a href="https://aheckmann.github.io/gm/">Graphics Magick</a>, <a href="https://github.com/yourdeveloper/node-imagemagick">ImageMagick</a>, or PhantomJS?
    &bull; Built by <a href="https://github.com/niftylettuce">@niftylettuce</a>
    and <a href="#contributors">contributors</a>
  </sub>
</div>
<hr />
<div align="center"><strong>Lipo is a cross-platform and drop-in replacement for Sharp</strong></div>
<hr />


## Table of Contents

* [Install](#install)
* [Usage](#usage)
* [Rate Limiting](#rate-limiting)
* [Background](#background)
* [Deploy Yourself](#deploy-yourself)
* [Related](#related)
* [Credits](#credits)
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
+const lipo = new Lipo();
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

While building [Lad][] I was instructing our team how to install [Sharp][], but there was a lot of confusion with libvips and many cross-platform installation issues.

Between Docker, Ubuntu, and Mac cross-platform issues reported by the team, I wanted to drop Sharp completely as a dependency from [Lad][].

I tried pure JavaScript-based solutions like [Jimp][], and even tried PhantomJS and Puppeteer solutions, however they were all too slow.

Sharp was the fastest option, and therefore I thought making a drop-in replacement that uses a powerful server would be satisfactory.

Thus Lipo was born.


## Deploy Yourself

See the test folder for an example that shows how to use the middleware `lipo-koa` (also see `lipo-express` and other related packages below).


## Related

* [lipo-koa][] - Lipo middleware for [Lad][] and [Koa][]
* [lipo-express][] - Lipo middleware for [Express][] and [Connect][]
* [lipo-grunt][] - Lipo build task for [Grunt][]
* [lipo-gulp][] - Lipo build task for [Gulp][]


## Credits

Lips by Orin zuu from the Noun Project


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

[lad]: https://lad.js.org

[deasync]: https://github.com/abbr/deasync

[custom-fonts-in-emails]: https://github.com/ladjs/custom-fonts-in-emails

[koa]: http://koajs.com

[express]: https://expressjs.com/

[connect]: https://github.com/senchalabs/connect

[lipo-koa]: https://github.com/lipojs/lipo-koa

[lipo-express]: https://github.com/lipojs/lipo-express

[lipo-grunt]: https://github.com/lipojs/lipo-grunt

[lipo-gulp]: https://github.com/lipojs/lipo-gulp

[grunt]: https://gruntjs.com/

[gulp]: https://gulpjs.com/
