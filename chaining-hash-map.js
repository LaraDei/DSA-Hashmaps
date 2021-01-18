const LinkedList = require('./linked-list.js')



class HashMapChain {
    constructor(initialCapacity = 8) {
        this.length = 0;
        this._hashTable = [];
        this._capacity = initialCapacity;
  }
  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
  get(key) {
    const list = this._hashTable[this._findSlot(key)];
    let currNode = list.head;
    while (currNode) {
      if (currNode.value.key === key)
        return currNode.value.value;
      currNode = currNode.next;
    }
    throw new Error('Key error');
  }

  set(key, value) {
    if (this.length + 1 > this._capacity) {
      this._resize(this._capacity * HashMapChain.SIZE_RATIO);
    }
    //Find the slot where this key should be in
    const index = this._findSlot(key);

    if (!this._hashTable[index]) {
      this._hashTable[index] = new LinkedList();
    }

    const list = this._hashTable[index];
    let currNode = list.head;
    while (currNode) {
      if (currNode.value.key === key) {
        currNode.value.value = value;
        return;
      }
      currNode = currNode.next;
    }
    this.length++;
    list.insertFirst({ key, value });
  }

  delete(key) {
    const list = this._hashTable[this._findSlot(key)];

    if (!list.head) {
      throw new Error('Key error');
    } else if (list.head.value.key === key) {
      list.head = list.head.next;
      return;
    }

    let prevNode = list.head;
    let currNode = list.head.next;

    while (currNode) {
      if (currNode.value.key === key) {
        prevNode.next = currNode.next;
        currNode = currNode.next;
        return;
      }
      prevNode = currNode;
      currNode = currNode.next;
    }
    throw new Error('Key error');
  }

  _findSlot(key) {
    return HashMapChain._hashString(key) % this._capacity;
  }

  _resize(size) {
    const oldSlots = this._hashTable;
    this._capacity = size;
    this._hashTable = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && slot.head) {
        const index = this._findSlot(slot.head.value.key);
        this._hashTable[index] = slot;
      }
    }
  }
}
HashMapChain.MAX_LOAD_RATIO = 0.5;
HashMapChain.SIZE_RATIO = 3;

module.exports = HashMapChain;