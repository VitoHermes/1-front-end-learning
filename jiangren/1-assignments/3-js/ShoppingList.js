let shoppingList = ['apple', 'banana', 'cherry'];

// push two items and print the list
shoppingList.push('orange');
shoppingList.push('pear');

console.log(shoppingList);

// remove the first item and print the list
shoppingList.shift();
console.log(shoppingList);

// remove the last item and print the list
shoppingList.pop();
console.log(shoppingList);

// check if the list if full
function isFull(list) {
  return list.length >= 5;
}

const isFullArrow = list => list.length >= 5;

console.log(isFull(shoppingList));
console.log(isFullArrow(shoppingList));

// check if the list is empty
function isEmpty(list) {
  return list.length === 0;
}

// print the list
for (let i = 0; i < shoppingList.length; i++) {
  console.log(`${i + 1}. ${shoppingList[i]}`);
}

// check if the list contains 'banana'
function containsItem(list, item) {
  return list.includes(item);
}

console.log(containsItem(shoppingList, 'banana')); // true
console.log(containsItem(shoppingList, 'banana1')); // false

// create a shopping list object
let shoppingListObject = {
  name: 'milk',
  quantity: 2,
  price: 3.99,
};

console.log(shoppingListObject);
