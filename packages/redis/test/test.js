const test = require('ava');
const keyvTestSuite = require('@keyv/test-suite').default;
const { keyvOfficialTests, keyvIteratorTests } = require('@keyv/test-suite');
const Keyv = require('keyv');
const KeyvRedis = require('this');
const Redis = require('ioredis');

const REDIS_HOST = 'localhost';
const redisURI = `redis://${REDIS_HOST}`;

keyvOfficialTests(test, Keyv, redisURI, 'redis://foo');

const store = () => new KeyvRedis(redisURI);

keyvTestSuite(test, Keyv, store);
keyvIteratorTests(test, Keyv, store);

test('reuse a redis instance', async t => {
	const redis = new Redis(redisURI);
	redis.foo = 'bar';
	const keyv = new KeyvRedis(redis);
	t.is(keyv.redis.foo, 'bar');

	await keyv.set('foo', 'bar');
	const value = await redis.get('foo');
	t.true(value === 'bar');
	t.true(await keyv.get('foo') === value);
});

test('set an undefined key', async t => {
	const redis = new Redis(redisURI);
	const keyv = new KeyvRedis(redis);

	await keyv.set('foo2', undefined);
	const result = await keyv.get('foo2');
	t.true(result === undefined);
});

test.serial('.deleteMany([keys]) should delete multiple key', async t => {
	const redis = new Redis(redisURI);
	const keyv = new KeyvRedis(redis);

	await keyv.set('foo', 'bar');
	await keyv.set('foo1', 'bar1');
	await keyv.set('foo2', 'bar2');
	t.is(await keyv.deleteMany(['foo', 'foo1', 'foo2']), true);
});

test.serial('.deleteMany([keys]) with nonexistent keys resolves to false', async t => {
	const redis = new Redis(redisURI);
	const keyv = new KeyvRedis(redis);

	t.is(await keyv.deleteMany(['foo', 'foo1', 'foo2']), false);
});
