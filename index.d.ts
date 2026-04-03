export type Edge<T> = [T, T];
export type Edges<T> = Edge<T>[];
export default function breadthFirst<T>(
  edges: Edges<T>,
  node: T,
  opts?: {
    reverse?: boolean;
  },
): Array<T>;
