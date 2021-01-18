class HashMap {
    //The constructor has an array called _hashTable which will hold all of the data and is considered the hash table.
    constructor(initialCapacity=8) {
        this.length = 0;
        this._hashTable = [];
        this._capacity = initialCapacity;
        this._deleted = 0;
    }
    get(key) {
        const index = this._findSlot(key);
        if (this._hashTable[index] === undefined) {
            throw new Error('Key error');
        }
        return this._hashTable[index].value;
    }
    //adding the item to the hash map
    set(key, value){
        /*Using MAX_LOAD_RATIO, we keep track of how full the hashmap is. 
        When it is a certain % full, we move to a bigger hash table 
        using the SIZE_RATIO so we reduce the number of collisions.
        */
        const loadRatio = (this.length + this._deleted + 1) / this._capacity;
        if (loadRatio > HashMap.MAX_LOAD_RATIO) {
            this._resize(this._capacity * HashMap.SIZE_RATIO);
        }
        //Find the slot where this key should be in. _findSlot() function is O(1)
        const index = this._findSlot(key);

        if(!this._hashTable[index]){
            this.length++;
        }
        this._hashTable[index] = {
            key,
            value,
            DELETED: false
        }; 
    }
    delete(key) {
        const index = this._findSlot(key);
        const slot = this._hashTable[index];
        if (slot === undefined) {
            throw new Error('Key error');
        }
        slot.DELETED = true;
        this.length--;
        this._deleted++;
    }
    // / locating the correct slot for an item
    _findSlot(key) {
        const hash = HashMap._hashString(key);
        const start = hash % this._capacity;

        for (let i=start; i<start + this._capacity; i++) {
            const index = i % this._capacity;
            const slot = this._hashTable[index];
            if (slot === undefined || (slot.key === key && !slot.DELETED)) {
                return index;
            }
        }
    }
    //this is O(n) in the best and average case and O(n^2) in the worst case
    _resize(size) {
            const oldSlots = this._hashTable;
            this._capacity = size;
            // Reset the length - it will get rebuilt as you add the items back
            this.length = 0;
            this._hashTable = [];
    
            for (const slot of oldSlots) {
                if (slot !== undefined) {
                    this.set(slot.key, slot.value);
                }
            }
    }
    //he _hashString function takes a string and hashes it, outputting a number. This is the famous djb2 algorithm
    static _hashString(string) {
        let hash = 5381;
        for (let i = 0; i < string.length; i++) {
            //Bitwise left shift with 5 0s - this would be similar to
            //hash*31, 31 being the decent prime number
            //but bit shifting is a faster way to do this
            //tradeoff is understandability
            hash = (hash << 5) + hash + string.charCodeAt(i);
            //converting hash to a 32 bit integer
            hash = hash & hash;
        }
        //making sure hash is unsigned - meaning non-negative number. 
        return hash >>> 0;
    }
}