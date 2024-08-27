import Node from "./Node.js";

class Tree {
  constructor(data) {
    this.root = Tree.buildTree(data);
  }

  static #buildTree(array) {
    if (array.length === 0) return null;

    const mid = Math.floor(array.length / 2);
    const node = new Node(array[mid]);

    node.left = this.#buildTree(array.slice(0, mid));
    node.right = this.#buildTree(array.slice(mid + 1));

    return node;
  }

  static buildTree(array) {
    const unique = [...new Set(array)];
    unique.sort((a, b) => a - b);
    return this.#buildTree(unique);
  }

  static prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false,
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(value) {
    let parent;
    let node = this.root;

    while (node) {
      parent = node;
      if (value < node.data) node = node.left;
      else if (value > node.data) node = node.right;
      else return;
    }

    const newNode = new Node(value);
    if (value < parent.value) parent.left = newNode;
    else parent.right = newNode;
  }

  static #deleteItem(node, value) {
    if (!node) return null;

    if (value < node.data) node.left = this.#deleteItem(node.left, value);
    else if (value > node.data)
      node.right = this.#deleteItem(node.right, value);
    else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      let replacementNode = node.right;
      while (replacementNode.left) replacementNode = replacementNode.left;

      node.data = replacementNode.data;
      node.right = this.#deleteItem(node.right, replacementNode.data);
    }

    return node;
  }

  deleteItem(value) {
    Tree.#deleteItem(this.root, value);
  }

  find(value) {
    let node = this.root;

    while (node) {
      if (value < node.data) node = node.left;
      else if (value > node.data) node = node.right;
      else return node;
    }

    return null;
  }

  static #checkCallback(callback) {
    if (typeof callback !== "function")
      throw new Error("Calback funtion is required");
  }
  levelOrder(callback) {
    Tree.#checkCallback(callback);

    const queue = [this.root];

    while (queue.length) {
      let node = queue.shift();
      if (!node) continue;
      callback(node);
      queue.push(node.left);
      queue.push(node.right);
    }
  }

  static #inOrder(node, callback) {
    if (!node) return;
    this.#inOrder(node.left, callback);
    callback(node);
    this.#inOrder(node.right, callback);
  }
  inOrder(callback) {
    Tree.#checkCallback(callback);
    Tree.#inOrder(this.root, callback);
  }

  static #preOrder(node, callback) {
    if (!node) return;
    callback(node);
    this.#preOrder(node.left, callback);
    this.#preOrder(node.right, callback);
  }
  preOrder(callback) {
    Tree.#checkCallback(callback);
    Tree.#preOrder(this.root, callback);
  }

  static #postOrder(node, callback) {
    if (!node) return;
    this.#postOrder(node.left, callback);
    this.#postOrder(node.right, callback);
    callback(node);
  }
  postOrder(callback) {
    Tree.#checkCallback(callback);
    Tree.#postOrder(this.root, callback);
  }
}

export default Tree;
