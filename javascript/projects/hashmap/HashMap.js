class HashMap {
  static #primeNumber = 31;
  #buckets = Array(16).fill(null);
  #length = 0;

  #hash(key) {
    let hashCode = 0;

    for (let i = 0; i < key.length; i++) {
      hashCode =
        (HashMap.#primeNumber * hashCode + key.charCodeAt(i)) %
        this.#buckets.length;
    }

    return hashCode;
  }

  #getBucketByKey(key) {
    const hash = this.#hash(key);
    return this.#getBucketByHash(hash);
  }

  #getBucketByHash(index) {
    if (index < 0 || index >= this.#buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
    const bucket = this.#buckets[index];
    return bucket && bucket.length ? bucket : null;
  }

  #setBucket(index, value) {
    if (index < 0 || index >= this.#buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
    return (this.#buckets[index] = value);
  }

  set(key, value) {
    const hash = this.#hash(key);
    const bucket = this.#getBucketByHash(hash);
    if (!bucket) {
      this.#setBucket(hash, [{ key, value }]);
      this.#length++;
      return;
    }

    const index = bucket.findIndex((entry) => entry.key === key);
    if (index === -1) {
      bucket.push({ key, value });
      this.#length++;
    } else {
      bucket[index].value = value;
    }
  }

  #getByKey(key) {
    const bucket = this.#getBucketByKey(key);
    if (!bucket) return null;

    const entry = bucket.find((entry) => entry.key === key);
    return entry;
  }

  get(key) {
    const { value } = this.#getByKey(key);
    return value ? value : null;
  }

  has(key) {
    return !!this.#getByKey(key);
  }

  remove(key) {
    const bucket = this.#getBucketByKey(key);
    if (!bucket) return false;

    const index = bucket.findIndex((entry) => entry.key === key);
    if (index === -1) return false;

    bucket.splice(index, 1);
    this.#length--;
    return true;
  }

  length() {
    return this.#length;
  }

  clear() {
    this.#buckets = Array(16).fill(null);
    this.#length = 0;
  }

  keys() {
    return this.#buckets.reduce((prev, bucket) => {
      if (!bucket) return prev;
      const keys = bucket.map((entry) => entry.key);
      return prev.concat(keys);
    }, []);
  }

  values() {
    return this.#buckets.reduce((prev, bucket) => {
      if (!bucket) return prev;
      const values = bucket.map((entry) => entry.value);
      return prev.concat(values);
    }, []);
  }

  entries() {
    return this.#buckets.reduce((prev, bucket) => {
      if (!bucket) return prev;
      const entries = bucket.map((entry) => [entry.key, entry.value]);
      return prev.concat(entries);
    }, []);
  }
}

export default HashMap;
