export default function breadthFirst(edges, node, opts = {}) {
  const { reverse = false } = opts;
  const fromIndex = reverse ? 1 : 0;
  const toIndex = reverse ? 0 : 1;
  const outEdges = new Map();
  for (const edge of edges) {
    const list = outEdges.get(edge[fromIndex]);
    if (list === undefined) {
      outEdges.set(edge[fromIndex], [edge[toIndex]]);
    } else {
      list.push(edge[toIndex]);
    }
  }
  // Nodes are emitted in the order they are enqueued, so the result doubles as
  // the queue. Walking it with an index avoids the O(n) cost of Array#shift.
  const result = [node];
  const visited = new Set(result);
  for (let i = 0; i < result.length; i++) {
    const neighbors = outEdges.get(result[i]);
    if (neighbors === undefined) continue;
    for (const to of neighbors) {
      if (!visited.has(to)) {
        visited.add(to);
        result.push(to);
      }
    }
  }
  return result;
}
