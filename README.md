# breadth-first [![npm][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/breadth-first.svg?style=flat
[npm-url]: https://npmjs.org/package/breadth-first

Breadth-first search for directed graphs.

## Install

```
$ npm install breadth-first
```

## Usage

We want to traverse the following graph.

![demo graph](https://cdn.rawgit.com/laat/breadth-first/main/graph.svg)

```js test:all
import bfs from "breadth-first";

// First, we define our edges.
const edges = [
  ["put on your shoes", "tie your shoes"],
  ["put on your shirt", "put on your jacket"],
  ["put on your shorts", "put on your jacket"],
  ["put on your shorts", "put on your shoes"],
];

// List the vertices that can be reached starting at 'put on your shirt'
bfs(edges, "put on your shirt");
/* =>
[
  'put on your shirt',
  'put on your jacket',
]
*/
```

### Reverse edges

```js test:all
// List the vertices that can be reached starting at 'put on your jacket' when
// the edges are reversed
bfs(edges, "put on your jacket", { reverse: true });
/* =>
[
  'put on your jacket',
  'put on your shirt',
  'put on your shorts',
]
*/
```

## Inspired by

This package uses the same data structure as [toposort](https://github.com/marcelklehr/toposort)

## License

MIT © [Sigurd Fosseng](https://github.com/laat)
