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
  defaults: {
    'x': 0,
    'y': 0,
    'color': 'black',
    'edges': [],
  },

  initialize: function(params) {
    console.log("Vertex->initialize");

    this._marked = false;

    var self = this;
    _.inject(params['edges'], function(memo, terminal_vertex) {
      var unique = true; // assume the vertex is unique

      _.every(memo, function(element) { // show it is not
        unique = (element.isEqual(terminal_vertex))? false : unique;
        return unique;
      });

      if (unique) {
        self.addEdge(terminal_vertex);
      }

      memo.push(terminal_vertex);
      return memo;
    }, []);
  },

  setMark: function() {
    this._mark = true;
  },

  clearMark: function() {
    this._mark = false;
  },

  getNeighbours: function() {
    return _.clone(this.get('edges')) || [];
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

    if (!duplicate) {
      this.get('edges').push(terminal_vertex);
    }

    return this; // for chaining
  }
});
