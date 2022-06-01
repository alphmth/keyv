const Keyv = require('keyv');

class KeyvBrowser {
  constructor(uri, options = {}) {
    this.keyv = new Keyv(uri, options);
  }

  set(key, value, ttl) {
    return this.keyv.set(key, value, ttl);
  }

  get(key, options) {
    return this.keyv.get(key, options);
  }

  delete(key) {
    return this.delete(key);
  }

  clear() {
    return this.clear();
  }

  has(key) {
    return this.keyv.has(key);
  }
}

export default KeyvBrowser;