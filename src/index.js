const fs = require('fs');

const FormData = require('form-data');
const Frisbee = require('frisbee');
const _isString = require('lodash.isstring');
const _isBuffer = require('lodash.isbuffer');
const _isObject = require('lodash.isobject');
const safeStringify = require('fast-safe-stringify');
const universalify = require('universalify');
const { boolean } = require('boolean');

// Object.keys(require('sharp').prototype).filter(key => !key.startsWith('_'))
const keys = [
  'metadata',
  'limitInputPixels',
  'sequentialRead',
  'resize',
  'crop',
  'embed',
  'max',
  'min',
  'ignoreAspectRatio',
  'withoutEnlargement',
  'overlayWith',
  'rotate',
  'extract',
  'flip',
  'flop',
  'sharpen',
  'blur',
  'extend',
  'flatten',
  'trim',
  'gamma',
  'negate',
  'normalise',
  'normalize',
  'convolve',
  'threshold',
  'boolean',
  'background',
  'greyscale',
  'grayscale',
  'toColourspace',
  'toColorspace',
  'extractChannel',
  'joinChannel',
  'bandbool',
  'toFile',
  'toBuffer',
  'withMetadata',
  'jpeg',
  'png',
  'webp',
  'tiff',
  'raw',
  'toFormat',
  'tile'
];

class Lipo {
  constructor(config = {}) {
    this.__config = {
      key: process.env.LIPO_KEY || '',
      baseURI:
        process.env.LIPO === 'true'
          ? 'http://localhost:3000'
          : 'https://api.lipo.io',
      ...config
    };

    this.__api = new Frisbee({
      baseURI: this.__config.baseURI,
      headers: {
        Accept: 'application/json'
      }
    });

    if (this.__config.key) this.__api.auth(this.__config.key);

    this.__queue = [];

    this.__metadata = universalify.fromPromise(this.__metadata);
    this.__toFile = universalify.fromPromise(this.__toFile);
    this.__toBuffer = universalify.fromPromise(this.__toBuffer);

    return input => {
      this.__input = input;
      return this;
    };

    /*
    // <https://github.com/lovell/sharp/issues/1045>
    return (input, options = {}) => {
      this.__input = null;
      this.__options = {};
      // input = Buffer | String
      // options = Object
      // - density (Number)
      // - raw (Object)
      //   - width (Number)
      //   - height (Number)
      //   - channels (Number; 1-4)
      // - create (Object)
      //   - width (Number)
      //   - height (Number)
      //   - channels (Number; 3-4)
      //   - background (String | Object)
      if (_isString(input) || _isBuffer(input)) this.__input = input;
      else if (_isObject(this.__input)) this.__options = input;
      if (!_isObject(this.__input) && _isObject(options))
        this._options = options;
      return this;
    };
    */
  }

  async __metadata() {
    const body = new FormData();
    if (_isString(this.__input))
      body.append('input', fs.createReadStream(this.__input));
    else if (_isBuffer(this.__input)) body.append('input', this.__input);
    else if (_isObject(this.__input))
      body.append('options', safeStringify(this.__input));
    body.append('queue', safeStringify(this.__queue));
    this.__queue = [];
    const res = await this.__api.post('/', { body });
    if (res.err) throw res.err;
    return res.body;
  }

  async __toFile(fileOut) {
    if (!_isString(fileOut)) throw new Error('File output path required');
    const body = new FormData();
    if (_isString(this.__input))
      body.append('input', fs.createReadStream(this.__input));
    else if (_isBuffer(this.__input)) body.append('input', this.__input);
    else if (_isObject(this.__input))
      body.append('options', safeStringify(this.__input));
    body.append('queue', safeStringify(this.__queue));
    this.__queue = [];
    const res = await this.__api.post('/', { body, raw: true });
    if (res.err) throw res.err;
    this.__info = {
      format: res.headers.get('x-sharp-format'),
      size: Number(res.headers.get('x-sharp-size')),
      width: Number(res.headers.get('x-sharp-width')),
      height: Number(res.headers.get('x-sharp-height')),
      channels: Number(res.headers.get('x-sharp-channels')),
      premultiplied: boolean(res.headers.get('x-sharp-multiplied'))
    };
    const stream = fs.createWriteStream(fileOut);
    // let timer;
    // stream.on('open', () => {
    //   timer = setTimeout(() => {
    //     stream.close();
    //     reject(new Error('Timed out while writing file'));
    //   }, 10000);
    // });
    const promise = new Promise((resolve, reject) => {
      stream.on('error', reject).on('finish', () => {
        resolve(this.__info);
      });
      res.body.on('error', reject).pipe(stream);
    });
    return promise;
  }

  async __toBuffer(options = {}) {
    const body = new FormData();
    if (_isString(this.__input))
      body.append('input', fs.createReadStream(this.__input));
    else if (_isBuffer(this.__input)) body.append('input', this.__input);
    else if (_isObject(this.__input))
      body.append('options', safeStringify(this.__input));
    body.append('queue', safeStringify(this.__queue));
    this.__queue = [];
    const res = await this.__api.post('/', { body, raw: true });
    if (res.err) throw res.err;
    this.__info = {
      format: res.headers.get('x-sharp-format'),
      size: Number(res.headers.get('x-sharp-size')),
      width: Number(res.headers.get('x-sharp-width')),
      height: Number(res.headers.get('x-sharp-height')),
      channels: Number(res.headers.get('x-sharp-channels')),
      premultiplied: boolean(res.headers.get('x-sharp-multiplied'))
    };
    const data = await res.buffer();
    if (_isObject(options) && boolean(options.resolveWithObject))
      return { data, info: this.__info };
    return data;
  }

  clone() {
    return new Lipo({ ...this.__config })(this.__input);
  }
}

keys.forEach(key => {
  Lipo.prototype[key] = function(...args) {
    if (!['toFile', 'toBuffer', 'metadata'].includes(key)) {
      this.__queue.push([key].concat(args));
      return this;
    }

    if (key === 'metadata') {
      this.__queue.push(['metadata']);
      return this.__metadata(...args);
    }

    if (key === 'toFile') return this.__toFile(...args);
    return this.__toBuffer(...args);
  };
});

// Sourced from `lib/resize.js`:
// <https://github.com/lovell/sharp/blob/master/lib/resize.js>

// Weighting to apply when using contain/cover fit.
Lipo.gravity = {
  center: 0,
  centre: 0,
  north: 1,
  east: 2,
  south: 3,
  west: 4,
  northeast: 5,
  southeast: 6,
  southwest: 7,
  northwest: 8
};

// Position to apply when using contain/cover fit.
Lipo.position = {
  top: 1,
  right: 2,
  bottom: 3,
  left: 4,
  'right top': 5,
  'right bottom': 6,
  'left bottom': 7,
  'left top': 8
};

// Strategies for automagic cover behaviour.
Lipo.strategy = {
  entropy: 16,
  attention: 17
};

// Reduction kernels.
Lipo.kernel = {
  nearest: 'nearest',
  cubic: 'cubic',
  lanczos2: 'lanczos2',
  lanczos3: 'lanczos3'
};

// Methods by which an image can be resized to fit the provided dimensions.
Lipo.fit = {
  contain: 'contain',
  cover: 'cover',
  fill: 'fill',
  inside: 'inside',
  outside: 'outside'
};

module.exports = Lipo;
