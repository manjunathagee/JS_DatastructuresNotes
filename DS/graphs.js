/**
 * Graphs is collection of nodes(vertices) and edges b/w them
 * Directed and Undirected graphs
 * Tree traversal
 * Depth first search: takes some random direction and reached to depth and then takes other direction
 * Breadth first search: visits all neighboring nodes and then for each of the neighbor it visits it's neighbors in turn
 *
 * DFS: uses stacks
 * BFS: uses queues
 *
 */

let graph = {
  a: ["c", "b"],
  b: ["d"],
  c: ["e"],
  d: ["f"],
  e: [],
  f: [],
};

const depthFirstSearchIterative = (graph, source) => {
  const visited = [source];

  while (visited.length) {
    const current = visited.pop();
    console.log(current);
    for (let neighbor of graph[current]) {
      visited.push(neighbor);
    }
  }
};

// depthFirstSearchIterative(graph, 'a');

const depthFirstSearchRecursive = (graph, source) => {
  console.log(source);

  for (let neighbor of graph[source]) {
    depthFirstSearchRecursive(graph, neighbor);
  }
};

// depthFirstSearchRecursive(graph, 'a'); // acebdf

// BFS cannot be implemented using recursion
const breadthFirstSearchIterative = (graph, source) => {
  const visited = [source];

  while (visited.length) {
    const current = visited.shift();
    console.log(current);

    for (let neighbor of graph[current]) {
      visited.push(neighbor);
    }
  }
};

// breadthFirstSearchIterative(graph, 'a'); // acbedf

/**
 * hasPath(src, dest):boolean
 *
 * n - no. of nodes
 * e - no. of edges
 *
 * Time - O(e) - Visit or traverse to every single edge to reach from src to dest
 * Space -O(n) - Store every node in stack/queue(dfs/bfs) to reach from src to dest
 *
 * or
 * n - no. of nodes
 * n^2 - no. of edges - path exists from every node to every other node
 * Time - O(n^2)
 * Space- O(n)
 * 
 */

graph = {
  f: ["g", "i"],
  g: ["h"],
  h: [],
  i: ["g", "k"],
  j: ["i"],
  k: [],
};

// given acyclic graph - no cycle
// Recursive DFS soln
function hasPathDFS(graph, src, dest) {
  if (src === dest) return true;

  for (let neighbor of graph[src]) {
    if (hasPathDFS(graph, neighbor, dest) === true) {
      return true;
    }
  }
  return false;
}

// console.log(hasPathDFS(graph, 'f', 'k'));

// Iterative BFS, it has same complexity
function hasPathBFS(graph, src, dest) {
  const queue = [src];

  while (queue.length) {
    const current = queue.shift();

    if (current === dest) return true;

    for (let neighbor of graph[current]) {
      queue.push(neighbor);
    }
  }
  return false;
}
// console.log('BFS:', hasPathBFS(graph, 'f', 'k'));

// hasPath with cycles, use Set to keep track of visited nodes, if a node is visited return false else continue

let edges = [
  ["i", "j"],
  ["k", "i"],
  ["m", "k"],
  ["k", "l"],
  ["o", "n"],
];

const undirectedGraph = (edges, src, dest) => {
  const graph = buildGraph(edges);
  return hasPath(graph, src, dest, new Set());
};

const hasPath = (graph, src, dest, visited) => {
  if (src === dest) return true;
  if (visited.has(src)) return false;
  visited.add(src);

  for (let neighbor of graph[src]) {
    if (hasPath(graph, neighbor, dest, visited) === true) {
      return true;
    }
  }
  return false;
};

var buildGraph = (edges) => {
  const graph = {};

  for (let edge of edges) {
    const [a, b] = edge;
    if (!(a in graph)) graph[a] = [];
    if (!(b in graph)) graph[b] = [];
    graph[a].push(b);
    graph[b].push(a);
  }
  console.log(edges, graph);
  return graph;
};

// console.log(undirectedGraph(edges, 'j', 'm'));// true

/**
 * connectedComponentsCount, should return number of isolated graphs
 *
 * n = # of nodes
 * e = # of edges
 * Time: O(e)
 * Space: O(n)
 * */

const connectedComponentsCount = (graph) => {
  const visited = new Set();
  let count = 0;

  for (let neighbor in graph) {
    console.log(visited);
    if (explore(graph, neighbor, visited) === true) {
      count += 1;
    }
  }
  return count;
};

let explore = (graph, current, visited) => {
  if (visited.has(String(current))) return false;

  visited.add(String(current));

  for (let neighbor of graph[current]) {
    explore(graph, neighbor, visited);
  }

  return true;
};

// console.log(connectedComponentsCount({
//   0: [8, 1, 5],
//   1: [0],
//   5: [0, 8],
//   8: [0, 5],
//   2: [3, 4],
//   3: [2, 4],
//   4: [3, 2]
// }));

/**
 * largestComponent --> should return size largest island
 * n = # of nodes
 * e = # of edges
 * Time: O(e)
 * Space: O(n)
 *
 */

function largestComponent(graph) {
  let largestGraph = null;
  const visited = new Set();

  for (let neighbor in graph) {
    let currentGraphLength = explore(graph, neighbor, visited);
    if (largestGraph === null || largestGraph < currentGraphLength) {
      largestGraph = currentGraphLength;
    }
  }

  return largestGraph;
}

explore = (graph, current, visited) => {
  if (visited.has(current)) return 0;
  visited.add(current);
  let currentGraphLength = 1; // Always start with 1 to include current 

  for (let neighbor of graph[current]) {
    currentGraphLength += explore(graph, neighbor, visited); //collect value from callstack
  }
  return currentGraphLength;
};

// console.log('Largest Graph: ', largestComponent({
//   0: ['8', '1', '5'],
//   1: ['0'],
//   5: ['0', '8'],
//   8: ['0', '5'],
//   2: ['3', '4'],
//   3: ['2', '4'],
//   4: ['3', '2']
// }));

/**
 * NOTE: for shortest path use Breadth First Search and related questions
 * n = # of nodes
 * e = # of edges
 * Time: O(e)
 * Space: O(n)
 *
 */

function shortestPath(edges, src, dest) {
  const graph = buildGraph(edges);

  const visited = new Set([src]);
  const queue = [[src, 0]];

  while (queue.length) {
    const [current, distance] = queue.shift();

    if (current === dest) return distance;

    for (let neighbor of graph[current]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, distance + 1]);
      }
    }
  }

  return -1;
}

edges = [
  ["w", "x"],
  ["x", "y"],
  ["z", "y"],
  ["z", "v"],
  ["w", "v"],
];

// console.log(shortestPath(edges, 'w', 'z')); // -> 2

/**
 * r - # of rows
 * c - # of columns
 * Time - O(rc)
 * Space - O(rc)
 */

function islandCount(grid) {
  const visited = new Set();
  let count = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (exploreLands(grid, row, col, visited) === true) {
        count += 1;
      }
    }
  }
  return count;
}

const exploreLands = (grid, row, col, visited) => {
  const rowInbounds = 0 <= row && row < grid.length;
  const colInbounds = 0 <= col && col < grid[0].length;

  if (!rowInbounds || !colInbounds) return false;

  if (grid[row][col] === "W") return false;

  const position = row + "-" + col;

  if (visited.has(position)) return false;
  visited.add(position);

  exploreLands(grid, row - 1, col, visited);
  exploreLands(grid, row + 1, col, visited);
  exploreLands(grid, row, col + 1, visited);
  exploreLands(grid, row, col - 1, visited);

  return true;
};

const grid = [
  ["W", "L", "W", "W", "W"],
  ["W", "L", "W", "W", "W"],
  ["W", "W", "W", "L", "W"],
  ["W", "W", "L", "L", "W"],
  ["L", "W", "W", "L", "L"],
  ["L", "L", "W", "W", "W"],
];

// console.log(islandCount(grid)); // -> 3

/**
 * r - # of rows
 * c - # of columns
 * Time - O(rc)
 * Space - O(rc)
 *
 */

function minimumIsland(grid) {
  const visited = new Set();
  let minSize = Infinity;
  for(let row=0;row<grid.length;row++) {
    for(let col = 0;col<grid[0].length;col++) {
      let size = exploreMinIsland(grid, row, col, visited);
      if(size > 0 && size < minSize) {
        minSize = size;
      }
    }
  }
  return minSize;
}

const exploreMinIsland = (grid, row, col, visited) => {
  const rowInbounds = 0<=row && row < grid.length;
  const colInbounds = 0<=col && col < grid[0].length;

  if(!rowInbounds || !colInbounds) return 0;

  if(grid[row][col] === "W") return 0;

  const position = row + "-" + col;

  if(visited.has(position)) return 0;
  visited.add(position);

  let size = 1;

  size += exploreMinIsland(grid, row-1, col, visited);
  size += exploreMinIsland(grid, row+1, col, visited);
  size += exploreMinIsland(grid, row, col-1, visited);
  size += exploreMinIsland(grid, row, col+1, visited);

  return size;
  
}

grid = [
  ["W", "L", "W", "W", "W"],
  ["W", "L", "W", "W", "W"],
  ["W", "W", "W", "L", "W"],
  ["W", "W", "L", "L", "W"],
  ["L", "W", "W", "L", "L"],
  ["L", "L", "W", "W", "W"],
];

minimumIsland(grid); // -> 2
