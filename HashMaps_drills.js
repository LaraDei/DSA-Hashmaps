const HashMap = require('./hash-map-class')
const HashMapChain = require('./chaining-hash-map')

//#1
function main(){
    const lotr = new HashMap()
    lotr.MAX_LOAD_RATIO = 0.5
    lotr.SIZE_RATIO = 3
    characters=[
		{"Hobbit":"Bilbo"},
		{"Hobbit":"Frodo"},
		{"Wizard":"Gandalf"},
		{"Human":"Aragorn"}, 
		{"Elf":"Legolas"}, 
		{"Maiar":"The Necromancer"},
		{"Maiar":"Sauron"}, 
		{"RingBearer":"Gollum"}, 
		{"LadyOfLight":"Galadriel"}, 
		{"HalfElven":"Arwen"},
		{"Ent":"Treebeard"}
    ]
    characters.forEach(character=>{lotr.set(character)})
    console.log(lotr)
    //Retrieve the value that is hashed in the key "Maiar" and Hobbit
    console.log(lotr.get('Maiar'))
    console.log(lotr.get('Hobbit'))
}
//main()
/*Print your hash map and notice the length and items that are hashed in your hash map. Have you hashed all the items you were asked to?*/
//no
// grabs last added value
// capacity is 8

//#2
const WhatDoesThisDo = function(){
    let str1 = 'Hello World.';
    let str2 = 'Hello World.';
    let map1 = new HashMap();
    map1.set(str1,10);
    map1.set(str2,20);
    let map2 = new HashMap();
    let str3 = str1;
    let str4 = str2;
    map2.set(str3,20);
    map2.set(str4,10);

    console.log(map1.get(str1));
    //console.log(map2.get(str3));
}
//WhatDoesThisDo()
//output is value of more recent key //20 then 10

//#3
function numbers(){
	let num=new HashMap(initialCapacity=11);
	num.MAX_LOAD_RATIO=0.5;
	num.SIZE_RATIO=3;
	numbers=[
		{10:"Bilbo"},
		{22:"Frodo"},
		{31:"Gandalf"},
		{4:"Aragorn"}, 
		{15:"Legolas"}, 
		{28:"The Necromancer"},
		{17:"Sauron"}, 
		{88:"Gollum"}, 
		{59:"Galadriel"}, 
	];
	numbers.forEach(number=>{num.set(number);});
	console.log(num.length);
	console.log('---------------------------------------------------------------------');
	num._hashTable.forEach(key=>{console.log(key);	});
	console.log('---------------------------------------------------------------------');
}
 //numbers();

// #4. 
function removeDuplicates(string){
	let hasheroo=new HashMap;//(initialCapacity=11);
	hasheroo.MAX_LOAD_RATIO=0.5;
	hasheroo.SIZE_RATIO=3;
	newString=[];
	for(let i=0;i<string.length;i++){
		try{
			if(hasheroo.get(string[i])!==string[i]){
				throw new Error('new character with same hash');
			}
		}catch(e){      
			hasheroo.set(string[i],string[i]);
			newString.push(string[i]);
		}
	}
	return newString.join('');
}
//console.log(removeDuplicates('google'));
// console.log(removeDuplicates('google all that you think can think of'));

// 5) 
function isPalindrome(str) {
	const input = [];
	const anagrams = (str, prefix = '') => {
		if (str.length === 1) input.push(prefix + str);
		for (let i = 0; i < str.length; i++) {
			anagrams(
				str.substring(0, i) + str.substring(i + 1),
				prefix + str.substring(i, i + 1)
			);
		}
	};
	anagrams(str);

	const isPalim = (str) => {
		const map = new HashMap();
		const center = Math.ceil(str.length / 2);
		for (let i = 0; i < str.length; i++) {
			if (i < center) map.set(i, str[i]);
			if (i > center && map.get(str.length - i) !== str[i]) return false;
		}
		return true;
	};

	for (let i = 0; i < input.length; i++) {
		if (isPalim(input[i])) return true;
	}
	return false;
}
// console.log(isPalindrome('acecarr'))
// console.log(isPalindrome('north'))

// 6) 
function anagramGroups(array) {
    const result = [];
    const groups = {};
  
    let sortedWord;
    for (const word of array) {
      sortedWord = word.split('').sort().join('');
      if (!groups[sortedWord]) groups[sortedWord] = [word];
      else groups[sortedWord].push(word);
    }
    for (const key in groups) result.push(groups[key]);
    return result;
}
//console.log(anagramGroups(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']))

// 7) Separate Chaining
function mainSC() {
	const lotr = new HashMapChain();
	lotr.set('Hobbit', 'Bilbo')
	lotr.set('Hobbit', 'Frodo')
	lotr.set('Wizard', 'Gandalf')
	lotr.set('Human', 'Aragorn')
	lotr.set('Elf', 'Legolas')
	lotr.set('Maiar', 'The Necromancer')
	lotr.set('Maiar', 'Sauron')
	lotr.set('RingBearer', 'Gollum')
	lotr.set('LadyOfLight', 'Galadriel')
	lotr.set('HalfElven', 'Arwen')
	lotr.set('Ent', 'Treebeard')

	console.log(lotr)
	display(lotr)
}
mainSC()

function display(separateChainingHashMap) {
    for (const slot of separateChainingHashMap._hashTable) {
      if (!slot) console.log('  empty,');
      else {
        let str = '';
  
        if (slot.head === null)
          return '  head -> null,';
        else {
          str += `  (head -> ${slot.head.value.value})`;
  
          let currNode = slot.head.next;
          while (currNode) {
            str += ` -> ${currNode.value.value}`;
            currNode = currNode.next;
          }
          str += ' -> null,';
          console.log(str);
        }
      }
    }
  }