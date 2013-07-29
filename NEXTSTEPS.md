# Next Steps

## Getting Started
- Make 1 jasmine and 1 spec to show they work
- setup simplecov
- hamlize things

## Clicky Graph Prototype
- An empty Canvas
- a button that says "click me"
- when clicked, a node is added to a visual graph
- a node is also added to a backbone graph model
- no Rails code

### Architectural notes
- Graph is a collection of verteces
- Verteces
  - x, y coordinates
- Graph
  - add a vertex to the graph
  - each vertex gets a graph specific name
  - each vertex gets a number of potential outgoing edges
    - each of these edges is pointing at a name
    - if the name already exists somewhere in the graph,
      then the edge points to the vertex associated to that
      name
  - the render method calls context.drawImage(v.draw) on each vertex, v
