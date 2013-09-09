/* we can initialize a Vertex with edges,
*
*     new Vertex({x:0, y:0, edges:[
*       new Vertex({x:1, y:1}),
*       new Vertex({x:2, y:2}),
*       new Vertex({x:3, y:3})
*     ]})
*
* or add them as we go
*
*     var A = new Vertex({x:0, y:0});
*     var B = new Vertex({x:1, y:1});
*     var C = new Vertex({x:2, y:2});
*     A.addVertex(B)
*      .addvertex(C);
*
* */
MyApp.Models.Vertex = Backbone.Model.extend({
  initialize: function(params) {
    console.log("Vertex->initialize");

    this._terminal_vertices = [];
    this._marked = false;
    params['foo'] = 'bar';

    if (params['edges'] === undefined) {
      params['edges'] = [];
    }

    console.log(this);

    var self = this;
    _.forEach(params['edges'], function(terminal_vertex) {
      self.addEdge(terminal_vertex);
    })

    console.log(this._terminal_vertices.length);
    console.log(params['edges'].length)
  },

  setMark: function() {
    this._mark = true;
  },

  clearMark: function() {
    this._mark = false;
  },

  getNeighbours: function() {
    return this._terminal_vertices;
  },

  isUnmarked: function() {
    return !this._mark;
  },

  isEqual: function(b) {
    var a = this;
    if (a.get('x') === b.get('x') && a.get('y') === b.get('y')) {
      return true;
    } else {
      return false;
    }
  },

  /* add an edge to the edge list with idempotence
  *  @param A Vertex */
  addEdge: function(terminal_vertex) {
    console.log("vertex-->addEdge");
    // edges must be unique per Vertex
    var duplicate = _.any(this.getNeighbours(), function(vertex) {
      return vertex.isEqual(terminal_vertex);
    });

    if (duplicate) {
      return this;
    }

    this._terminal_vertices.push(terminal_vertex);
    this.get('edges').push(terminal_vertex);

    return this;
  }
});
