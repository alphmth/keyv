const test = require('ava');
const KeyvGzip = require('../src/index.js');

test('gzip compression/decompression', async t => {
	const keyv = new KeyvGzip();
	const compressed = await keyv.compress('whatever');
	t.not(compressed, 'whatever');
	const decompressed = await keyv.decompress(compressed);
	t.is(decompressed, 'whatever');
});

// Test serialize compression
test('serialize compression', async t => {
	const keyv = new KeyvGzip();
	const {serialize} = keyv.opts;
	const json = await serialize({value: 'whatever'});
	t.not(JSON.parse(json).value, 'whatever');
});
// Test deserialize compression
test('deserialize compression', async t => {
	const keyv = new KeyvGzip();
	const {serialize, deserialize} = keyv.opts;
	const json = await serialize({value: 'whatever'});
	const djson = await deserialize(json);
	t.deepEqual(djson, {expires: undefined, value: 'whatever'});
});
