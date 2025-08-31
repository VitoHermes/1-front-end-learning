function add(a: number, b: number): number {
  return a + b;
}

interface Person {
  name: string;
  age: number;
}

function sayHello(person: Person): string {
  return `Hello, ${person.name}`;
}

const chris: Person = {
  name: 'Chris',
  age: 25,
};

console.log(sayHello(chris));
