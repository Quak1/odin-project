import Tree from "./Tree.js";

const a = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(a);
tree.insert(6);
tree.insert(7);
tree.insert(2);
tree.insert(25);
Tree.prettyPrint(tree.root);

tree.deleteItem(67);
tree.deleteItem(3);
tree.deleteItem(6);
tree.deleteItem(23);
Tree.prettyPrint(tree.root);

console.log(tree.find(324));
console.log(tree.find(5));
console.log(tree.find(10000));
