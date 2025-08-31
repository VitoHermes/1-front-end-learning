function add(a, b) {
    return a + b;
}
function sayHello(person) {
    return "Hello, ".concat(person.name);
}
var chris = {
    name: 'Chris',
    age: 25,
};
console.log(sayHello(chris));
