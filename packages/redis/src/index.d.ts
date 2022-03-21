import EventEmitter from 'node:events';

declare class KeyvRedis extends EventEmitter {
	readonly ttlSupport: false;
	opts: Record<string, unknown>;
	redis: any;
	constructor(options?: string | KeyvRedis.Options);
	_getNamespace(): string;
	get(key: string): Promise<string | undefined>;
	getMany(keys: string[]): Promise<string[] | undefined>;
	set(key: string, value: string | undefined): Promise<any>;
	delete(key: string): boolean;
	deleteMany(keys: string[]): boolean;
	clear(): Promise<void>;
	iterator(namespace: string | undefined): AsyncGenerator<any, void, any>;
	has(key: string): boolean;
}
declare namespace KeyvRedis {
	interface Options {
		uri?: string | undefined;
		busyTimeout?: number | undefined;
		table?: string | undefined;
		keySize?: number | undefined;
	}
}
export = KeyvRedis;
