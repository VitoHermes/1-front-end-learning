// 1. let const var
// let const var

const name = 'Alice'; // global scope
if (true) {
  let name = 'Bob'; // use let to declare a block scope variable
  console.log(name); // Bob
}
console.log(name); // Alice

function add(a, b) {
  return a + b;
}

// change function to arrow function
const addWithArrow = (a, b) => a + b;

console.log(addWithArrow(1, 3));

// 2. arrow function
// this keyword for arrow function
// this keyword is not bound to the arrow function

const person = {
  name: 'John',
  sayHello: function () {
    console.log(`Hello, ${this.name}`);
  },
};

person.sayHello(); // Hello, John

// change function to arrow function
// this keyword is bound to the parent scope
const person2 = {
  name: 'John',
  sayHello: () => {
    console.log(`Hello, ${this.name}`);
  },
};

person2.sayHello(); // Hello, undefined

// 3. template literal
let greeting = `Hello, ${name}! Welcome to the website.`;
console.log(greeting); // Hello, Alice! Welcome to the website.

// 4. destructuring
let person1 = {
  name: 'John',
  age: 25,
  city: 'New York',
};

let { name1, age, city } = person;
console.log(name1, age, city); // John 20 New York

// 5. Default parameters
function calculateArea(width, height = 10) {
  return width * height;
}

console.log(calculateArea(10)); // 100
console.log(calculateArea(10, 20)); // 200

// 6. rest
function sum(a, b) {
  return a + b;
}

function sumAll(...nums) {
  return nums.reduce((total, n) => total + n, 0);
}

console.log(sumAll(1, 2, 3, 4)); // 10

// 7. spread operator
let arr1 = [1, 2];
let arr2 = [3, 4];

let merged = [...arr1, ...arr2];
console.log(merged); // [1, 2, 3, 4]
