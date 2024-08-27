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

tree.levelOrder((node) => console.log(node.data));
console.log();
tree.preOrder((node) => console.log(node.data));
console.log();
tree.inOrder((node) => console.log(node.data));
console.log();
tree.postOrder((node) => console.log(node.data));
console.log();

console.log("height:", tree.height(tree.root));
tree.insert(350);
tree.insert(349);
tree.insert(348);
tree.insert(347);
tree.insert(346);
Tree.prettyPrint(tree.root);

console.log("root height:", tree.height(tree.root));
console.log("348 height:", tree.height(tree.find(348)));
console.log("root depth", tree.depth(tree.root));
console.log("9 depth", tree.depth(tree.find(9)));
console.log("346 depth", tree.depth(tree.find(346)));
