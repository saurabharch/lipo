const path = require('path');
const os = require('os');
const _ = require('lodash');
const test = require('ava');
const uuid = require('uuid');
const Koa = require('koa');
const multer = require('koa-multer');
const bytes = require('bytes');

const Lipo = require('../');

const input = path.join(__dirname, 'fixtures', 'input.jpg');

const upload = multer({
  limits: {
    fieldNameSize: bytes('100b'),
    fieldSize: bytes('1mb'),
    fileSize: bytes('5mb'),
    fields: 10,
    files: 1
  }
});

test.cb.beforeEach(t => {
  const app = new Koa();
  app.use(upload.single('input'));
  app.use(Lipo.middleware);
  t.context.server = app.listen(function() {
    t.context.lipo = new Lipo({
      baseURI: `http://localhost:${this.address().port}`
    });
    t.end();
  });
});

test('basic', async t => {
  const jpg = path.join(os.tmpdir(), `${uuid.v4()}.jpg`);
  const info = await t.context
    .lipo(input)
    .resize(300, 300)
    .toFile(jpg);
  t.is(info.format, 'jpeg');
  t.is(info.size, 807);
  t.is(info.width, 300);
  t.is(info.height, 300);
  t.is(info.channels, 3);
  t.is(info.premultiplied, false);
});

test.cb('basic with callback', t => {
  const jpg = path.join(os.tmpdir(), `${uuid.v4()}.jpg`);
  t.context
    .lipo(input)
    .resize(300, 300)
    .toFile(jpg, (err, info) => {
      if (err) return t.end(err);
      t.is(info.format, 'jpeg');
      t.is(info.size, 807);
      t.is(info.width, 300);
      t.is(info.height, 300);
      t.is(info.channels, 3);
      t.is(info.premultiplied, false);
      t.end();
    });
});

test('convert to png', async t => {
  const png = path.join(os.tmpdir(), `${uuid.v4()}.png`);
  const info = await t.context
    .lipo(input)
    .resize(200, 200)
    .png()
    .toFile(png);
  t.is(info.format, 'png');
  t.is(info.size, 610);
  t.is(info.width, 200);
  t.is(info.height, 200);
  t.is(info.channels, 3);
  t.is(info.premultiplied, false);
});

test('buffer', async t => {
  const data = await t.context
    .lipo(input)
    .resize(200, 200)
    .png()
    .toBuffer();
  t.true(_.isBuffer(data));
});

test.cb('buffer with callback', t => {
  t.context
    .lipo(input)
    .resize(200, 200)
    .png()
    .toBuffer((err, data) => {
      if (err) return t.end(err);
      t.true(_.isBuffer(data));
      t.end();
    });
});
