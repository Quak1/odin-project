function makeMovesGraph() {
  const rowMovement = [1, 1, 2, 2, -1, -1, -2, -2];
  const colMovement = [2, -2, 1, -1, 2, -2, 1, -1];
  const graph = {};

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const node = [row, col].toString();
      graph[node] = [];
      for (let i = 0; i < 8; i++) {
        const newRow = row + rowMovement[i];
        const newCol = col + colMovement[i];
        if (newRow > 7 || newRow < 0 || newCol > 7 || newCol < 0) continue;
        graph[node].push([newRow, newCol].toString());
      }
    }
  }

  return graph;
}

function moves(origin, target) {
  const graph = makeMovesGraph();
  const queue = [];
  const distances = new Map();

  queue.push({ node: origin.toString(), dist: 0, path: [] });

  while (queue.length) {
    const { node, dist, path } = queue.shift();

    distances.set(node, { dist: dist, path: [...path, node] });
    if (node === target.toString()) return distances.get(target.toString());

    const moves = graph[node];
    moves.forEach((move) => {
      if (distances.has(move)) return;
      queue.push({
        node: move,
        dist: dist + 1,
        path: [...path, node],
      });
    });
  }

  throw new Error("Couldn't find a path");
}

function knightMoves(origin, target) {
  const { dist, path } = moves(origin, target);
  const pathLines = path.join("]\n[");
  console.log(
    `You made in it ${dist} moves! Here's your path:\n[${pathLines}]`,
  );
}

knightMoves([3, 3], [4, 3]);
knightMoves([0, 0], [7, 7]);
