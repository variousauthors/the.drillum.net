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
    var self = this;
    console.log("Vertex->initialize");
    self._terminal_vertices = [];
    self._marked = false;

    _.forEach(params['edges'], function(terminal_vertex) {
      self.addEdge(terminal_vertex);
    })
  },

  setMark: function() {
    this._mark = true;
  },

  clearMark: function() {
    this._mark = false;
  },

  getEdges: function() {
    return this._terminal_vertices;
  },

  isUnmarked: function() {
    return !this._mark;
  },

  /* add an edge to the edge list with idempotence
  *  @param A Vertex */
  addEdge: function(terminal_vertex) {
    // edges must be unique per Vertex
    if (_.contains(this.getEdges(), terminal_vertex)) {
      return this;
    }

    this._terminal_vertices.push(terminal_vertex);

    return this;
  }
});
