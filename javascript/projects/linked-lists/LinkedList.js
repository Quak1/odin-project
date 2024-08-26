import Node from "./Node.js";

class LinkedList {
  #head = null;
  #tail = null;
  #size = 0;

  get head() {
    return this.#head;
  }

  get tail() {
    return this.#tail;
  }

  get size() {
    return this.#size;
  }

  append(value) {
    if (!this.#size) {
      this.#head = new Node(value);
      this.#tail = this.head;
    } else {
      const node = new Node(value);
      this.#tail.nextNode = node;
      this.#tail = node;
    }

    this.#size++;
  }

  prepend(value) {
    if (!this.#size) {
      this.#head = new Node(value);
      this.#tail = this.head;
    } else {
      const node = new Node(value, this.head);
      this.#head = node;
    }

    this.#size++;
  }

  at(index) {
    if (index > this.size) throw new Error("Index out of bounds");

    let node = this.head;
    for (let i = 0; i < index; i++) {
      node = node.nextNode;
    }

    return node;
  }

  pop() {
    if (this.size === 0) return;
    if (this.size === 1) {
      this.#head = null;
      this.#tail = null;
      this.#size = 0;
      return;
    }

    let node = this.head;
    while (node.nextNode.nextNode) {
      node = node.nextNode;
    }
    node.nextNode = null;
    this.#tail = node;
    this.#size--;
  }

  contains(value) {
    let node = this.head;
    while (node && node.value != value) {
      node = node.nextNode;
    }

    return !!node;
  }

  find(value) {
    let i = 0;
    let node = this.head;
    while (node && node.value != value) {
      node = node.nextNode;
      i++;
    }

    return node ? i : null;
  }

  toString() {
    let node = this.head;
    const values = [];
    while (node) {
      values.push(node.value);
      node = node.nextNode;
    }

    return `( ${values.join(" ) -> ( ")} ) -> null`;
  }

  insertAt(value, index) {
    if (index <= 0) return this.prepend(value);
    if (index >= this.size) return this.append(value);

    const node = this.at(index - 1);
    node.nextNode = new Node(value, node.nextNode);
  }

  removeAt(index) {
    if (index >= this.size - 1) return this.pop();
    if (index <= 0) return (this.#head = this.head.nextNode);

    const node = this.at(index - 1);
    node.nextNode = node.nextNode.nextNode;
  }
}

export default LinkedList;
