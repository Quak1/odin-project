import LinkedList from "./LinkedList.js";

const list = new LinkedList();

list.append("dog");
list.pop();
list.append("cat");
list.prepend("first");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

console.log(list.toString());
console.log(list.size);
console.log(list.head);
console.log(list.tail);
console.log(0, list.at(0));
console.log(3, list.at(3));
console.log(6, list.at(6));

console.log(list.contains("first"));
list.pop();
console.log(list.contains("turtle"));
console.log(list.toString());
console.log(list.find("snake"));
list.pop();
console.log(list.find("snake"));

list.insertAt(3, 3);
list.insertAt(0, 0);
list.insertAt(10, 10);
list.insertAt("second to last", list.size - 1);
console.log(list.toString());

list.removeAt(0);
list.removeAt(-1);
list.removeAt(15);
list.removeAt(list.size - 1);
list.removeAt(2);
console.log(list.toString());
