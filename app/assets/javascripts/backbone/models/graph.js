//= require ./vertex

// TODO override add on the Graph so that it walks the given
// vertex, adding all its neighbours
MyApp.Models.Graph = Backbone.Collection.extend({
  model: MyApp.Models.Vertex,
  initialize: function(vertices) {
    var self = this;
    console.log("Graph->initialize");
  },

  walk: function(work) {
    var queue = []; // going to use an array now, and then implement it later
    // fill the queue, empty the collection
    while(this.length > 0) {
      queue.push(this.pop());
    }

    while(queue.length > 0) {
      var vertex = queue.shift();
      var edges = vertex.getEdges();
      var edge;

      work(vertex); // do the work

      while(edges.length > 0) {
        edge = edges.pop();

        if (edge.isUnmarked()) {
          edge.setMark();
          queue.push(edge);
        }
      }
    }
  },

  /* fill an array with the edges of the graph */
  getEdges: function() {
    var edges = [];

    this.each(function(index, vertex) {
      vertex.setMark();
      vertex.getEdges().each(function(index, terminal_vertex) {
        if (terminal_vertex.isUnmarked()) {
          result.push(new Line(vertex, terminal_vertex));
        }
      })
    })

    this.clearMarked();

    return edges;
  },

  clearMarked: function() {
    this.each(function(index, vertex) {
      vertex.clearMark();
    })
  }
});
