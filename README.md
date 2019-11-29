<h1 align="center">
  <a href="https://lipo.io"><img src="media/logo.png" alt="lipo" /></a>
</h1>
<div align="center">
  <a href="https://slack.crocodilejs.com"><img src="https://slack.crocodilejs.com/badge.svg" alt="chat" /></a>
  <a href="https://travis-ci.org/lipojs/lipo"><img src="https://img.shields.io/travis/lipojs/lipo.svg" alt="build status" /></a>
  <a href="https://codecov.io/github/lipojs/lipo"><img src="https://img.shields.io/codecov/c/github/lipojs/lipo/master.svg" alt="code coverage" /></a>
  <a href="https://github.com/sindresorhus/xo"><img src="https://img.shields.io/badge/code_style-XO-5ed9c7.svg" alt="code style" /></a>
  <a href="https://github.com/prettier/prettier"><img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg" alt="styled with prettier" /></a>
  <a href="https://lass.js.org"><img src="https://img.shields.io/badge/made_with-lass-95CC28.svg" alt="made with lass" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/lipojs/lipo.svg" alt="license" /></a>
</div>
<br />
<div align="center">
  Lipo is a free image manipulation API service built on top of <a href="https://github.com/lovell/sharp">Sharp</a>
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
* [Trademark Notice](#trademark-notice)
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

You can even use Lipo from the command line:

```sh
curl -F "input=@/Users/me/Desktop/input.jpg" \
  -F 'queue=[ [ "resize", 300, 300 ] ]' \
  -o /Users/me/Desktop/output.jpg \
  https://api.lipo.io
```

> **Resize Method Options**: If you need to use constant values such as `sharp.kernel.nearest`, `sharp.gravity.centre`, or any other option from [resize](https://github.com/lovell/sharp/blob/master/docs/api-resize.md#resize), please use the alternate form of `Lipo.kernel.nearest` and `Lipo.gravity.centre`, respectively (just as an example)


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
* [lad][] - Scaffold a [Koa][] webapp and API framework for [Node.js][node]
* [cabin][] - Logging and analytics solution for [Node.js][node], [Lad][], [Koa][], and [Express][]
* [lass][] - Scaffold a modern boilerplate for [Node.js][node]


## Credits

Lips by Orin zuu from the Noun Project


## Contributors

| Name           | Website                    |
| -------------- | -------------------------- |
| **Nick Baugh** | <http://niftylettuce.com/> |


## Trademark Notice

Lipo, Lass, Lad, Cabin, and their respective logos are trademarks of Niftylettuce LLC.
These trademarks may not be reproduced, distributed, transmitted, or otherwise used, except with the prior written permission of Niftylettuce LLC.
If you are seeking permission to use these trademarks, then please [contact us](mailto:niftylettuce@gmail.com).


## License

[MIT](LICENSE) © [Nick Baugh](http://niftylettuce.com/)


## 

<a href="#"><img src="media/footer.png" alt="#" /></a>

[npm]: https://www.npmjs.com/

[yarn]: https://yarnpkg.com/

[jimp]: https://github.com/oliver-moran/jimp

[lad]: https://lad.js.org

[koa]: http://koajs.com

[express]: https://expressjs.com/

[connect]: https://github.com/senchalabs/connect

[lipo-koa]: https://github.com/lipojs/lipo-koa

[lipo-express]: https://github.com/lipojs/lipo-express

[lipo-grunt]: https://github.com/lipojs/lipo-grunt

[lipo-gulp]: https://github.com/lipojs/lipo-gulp

[grunt]: https://gruntjs.com/

[gulp]: https://gulpjs.com/

[sharp]: http://sharp.dimens.io/

[cabin]: http://cabinjs.com

[node]: https://nodejs.org

[lass]: https://lass.js.org
