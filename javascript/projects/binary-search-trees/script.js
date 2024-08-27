import Tree from "./Tree.js";

function randomArray(amount, maxNumber) {
  return Array.from({ length: amount }, () =>
    Math.floor(Math.random() * maxNumber),
  );
}

function isBalanced(tree) {
  console.log("balanced?", tree.isBalanced());
  Tree.prettyPrint(tree.root);
}

function printTraversal(tree) {
  const callback = (node) => console.log(node.data);

  tree.levelOrder(callback);
  console.log();
  tree.preOrder(callback);
  console.log();
  tree.postOrder(callback);
  console.log();
  tree.inOrder(callback);
  console.log();
}

// 1
const initial = randomArray(10, 99);
const tree = new Tree(initial);

//2
isBalanced(tree);

//3
printTraversal(tree);

//4
const moreNumbers = randomArray(5, 1000);
moreNumbers.forEach((n) => tree.insert(n));

//5
isBalanced(tree);

//6
tree.rebalance();

//7
isBalanced(tree);

//8
printTraversal(tree);
