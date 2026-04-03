export default function breadthFirst(edges, node, opts = {}) {
  const { reverse = false } = opts;
  const outEdges = new Map();
  for (const [a, b] of edges) {
    const from = reverse ? b : a;
    const to = reverse ? a : b;
    let list = outEdges.get(from);
    if (list === undefined) {
      list = [];
      outEdges.set(from, list);
    }
    list.push(to);
  }
  const result = [];
  const visited = new Set();
  const queue = [node];
  visited.add(node);
  while (queue.length > 0) {
    const v = queue.shift();
    result.push(v);
    const neighbors = outEdges.get(v);
    if (neighbors !== undefined) {
      for (const to of neighbors) {
        if (!visited.has(to)) {
          visited.add(to);
          queue.push(to);
        }
      }
    }
  }
  return result;
}
