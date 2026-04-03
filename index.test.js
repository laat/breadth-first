import { it } from "node:test";
import assert from "node:assert/strict";
import bfs from "./index.js";

it("finds nodes BFS", async () => {
  const edges = [
    ["put on your shoes", "tie your shoes"],
    ["put on your shirt", "put on your jacket"],
    ["put on your shorts", "put on your jacket"],
    ["put on your shorts", "put on your shoes"],
  ];
  assert.deepStrictEqual(bfs(edges, "put on your shorts"), [
    "put on your shorts",
    "put on your jacket",
    "put on your shoes",
    "tie your shoes",
  ]);
  assert.deepStrictEqual(bfs(edges, "put on your shirt"), [
    "put on your shirt",
    "put on your jacket",
  ]);
});

it("finds nodes BFS reverse", async () => {
  const edges = [
    ["put on your shoes", "tie your shoes"],
    ["put on your shirt", "put on your jacket"],
    ["put on your shorts", "put on your jacket"],
    ["put on your shorts", "put on your shoes"],
  ];
  assert.deepStrictEqual(bfs(edges, "put on your jacket", { reverse: true }), [
    "put on your jacket",
    "put on your shirt",
    "put on your shorts",
  ]);
  assert.deepStrictEqual(bfs(edges, "put on your shoes", { reverse: true }), [
    "put on your shoes",
    "put on your shorts",
  ]);
});

it("BFS handles cycles", async () => {
  const edges = [
    ["put on your shoes", "tie your shoes"],
    ["tie your shoes", "put on your shoes"],
  ];
  assert.deepStrictEqual(bfs(edges, "put on your shoes"), [
    "put on your shoes",
    "tie your shoes",
  ]);
});

it("supports nodes without edges", async () => {
  const edges = [
    ["put on your shoes", "tie your shoes"],
    ["put on your shirt", "put on your jacket"],
    ["put on your shorts", "put on your jacket"],
    ["put on your shorts", "put on your shoes"],
  ];
  assert.deepStrictEqual(bfs(edges, "listen to audiobook", { reverse: true }), [
    "listen to audiobook",
  ]);
});

it("handles empty edges", () => {
  assert.deepStrictEqual(bfs([], "a"), ["a"]);
});

it("handles self-loops", () => {
  const edges = [["a", "a"]];
  assert.deepStrictEqual(bfs(edges, "a"), ["a"]);
});

it("visits shared nodes only once (diamond graph)", () => {
  const edges = [
    [1, 2],
    [1, 3],
    [2, 4],
    [3, 4],
  ];
  // BFS visits level by level: 1, then 2 and 3, then 4
  assert.deepStrictEqual(bfs(edges, 1), [1, 2, 3, 4]);
});

it("works with reverse on diamond graph", () => {
  const edges = [
    [1, 2],
    [1, 3],
    [2, 4],
    [3, 4],
  ];
  assert.deepStrictEqual(bfs(edges, 4, { reverse: true }), [4, 2, 3, 1]);
});

it("traverses a linear chain in order", () => {
  const edges = [
    ["a", "b"],
    ["b", "c"],
    ["c", "d"],
  ];
  assert.deepStrictEqual(bfs(edges, "a"), ["a", "b", "c", "d"]);
});

it("only reaches the connected component", () => {
  const edges = [
    [1, 2],
    [2, 3],
    [10, 11],
    [11, 12],
  ];
  assert.deepStrictEqual(bfs(edges, 1), [1, 2, 3]);
  assert.deepStrictEqual(bfs(edges, 10), [10, 11, 12]);
});

it("handles reverse with cycles", () => {
  const edges = [
    ["a", "b"],
    ["b", "c"],
    ["c", "a"],
  ];
  assert.deepStrictEqual(bfs(edges, "a", { reverse: true }), ["a", "c", "b"]);
});

it("leaf node has no outgoing edges in forward mode", () => {
  const edges = [
    ["a", "b"],
    ["b", "c"],
  ];
  assert.deepStrictEqual(bfs(edges, "c"), ["c"]);
});

it("root node has no incoming edges in reverse mode", () => {
  const edges = [
    ["a", "b"],
    ["b", "c"],
  ];
  assert.deepStrictEqual(bfs(edges, "a", { reverse: true }), ["a"]);
});

it("explicit reverse: false behaves like default", () => {
  const edges = [
    [1, 2],
    [1, 3],
  ];
  assert.deepStrictEqual(bfs(edges, 1, { reverse: false }), bfs(edges, 1));
});

it("respects edge insertion order for traversal", () => {
  const edges = [
    ["a", "c"],
    ["a", "b"],
  ];
  // c appears before b in the edge list, so BFS visits c first
  assert.deepStrictEqual(bfs(edges, "a"), ["a", "c", "b"]);
});

it("handles a larger tree", () => {
  //       1
  //      / \
  //     2   3
  //    / \   \
  //   4   5   6
  const edges = [
    [1, 2],
    [1, 3],
    [2, 4],
    [2, 5],
    [3, 6],
  ];
  // BFS visits level by level: 1, then 2 and 3, then 4, 5, and 6
  assert.deepStrictEqual(bfs(edges, 1), [1, 2, 3, 4, 5, 6]);
  assert.deepStrictEqual(bfs(edges, 2), [2, 4, 5]);
  assert.deepStrictEqual(bfs(edges, 6, { reverse: true }), [6, 3, 1]);
});
