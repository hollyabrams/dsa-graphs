class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    vertexArray.forEach(vertex => this.nodes.add(vertex));
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex);
    this.nodes.forEach(node => node.adjacent.delete(vertex));
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    // Initialize an empty array to store the result
    const result = [];
  
    // Initialize a Set to keep track of visited nodes
    const visited = new Set();
  
    // Define the recursive dfs function
    const dfs = (vertex) => {
      // If the vertex has already been visited, return
      if (visited.has(vertex)) return;
  
      // Mark the vertex as visited
      visited.add(vertex);
  
      // Add the value of the vertex to the result array
      result.push(vertex.value);
  
      // Recursively call the dfs function on each unvisited neighbor
      vertex.adjacent.forEach(neighbor => dfs(neighbor));
    };
  
    // Call the dfs function on the start vertex
    dfs(start);
  
    // Return the result array
    return result;
  }
  

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    // Initialize an empty array to store the result
    const result = [];
  
    // Initialize a Set to keep track of visited nodes
    const visited = new Set();
  
    // Initialize a queue with the start node
    const queue = [start];
  
    // Loop while there are items in the queue
    while (queue.length) {
      // Remove the first item from the queue and store it in `vertex`
      const vertex = queue.shift();
  
      // If the vertex has already been visited, skip to the next iteration
      if (visited.has(vertex)) continue;
  
      // Mark the vertex as visited
      visited.add(vertex);
  
      // Add the value of the vertex to the result array
      result.push(vertex.value);
  
      // Add all unvisited neighbors of the vertex to the queue
      queue.push(...vertex.adjacent);
    }
  
    // Return the result array
    return result;
  }
  
}

module.exports = {Graph, Node}