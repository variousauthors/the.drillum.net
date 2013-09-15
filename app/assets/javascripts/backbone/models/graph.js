//= require ./vertex
//= require ./color_wheel

// TODO override add on the Graph so that it walks the given
// vertex, adding all its neighbours
//
MyApp.Models.Graph = Backbone.Collection.extend({
  model: MyApp.Models.Vertex,

  initialize: function() {
    this._color_wheel = {};
  },

  /* setup flattens the Graph and populates a straight collection
  *  counts the nodes and chooses an appropriate colorwheel
  *  assigns each node a colour */
  setup: function() {
    this._color_wheel = new MyApp.Models.ColorWheel({ length: 3 });
    this._color_wheel.setup();

    var self = this;
    var nop = function(vertex) {
      vertex.set('color', self._color_wheel.color()); // returns a random color
      return vertex;
    }
    this.walk(nop);
  },

  update_color_wheel: function() {
    console.log("EVENT Graph-->update_color_wheel")
    this._color_wheel.expand();
  },

  walk: function(work) {
    var queue = []; // going to use an array now, and then implement it later

    // fill the queue, empty the collection
    while(this.length > 0) {
      queue.push(this.pop());
    }

    while(queue.length > 0) {
      var vertex = queue.shift();
      var neighbours = vertex.getNeighbours();
      var neighbour;

      vertex = work(vertex); // do the work
      vertex.setMark();
      this.add(vertex); // add the worked on vertex back in

      _.each(neighbours, function(neighbour) {
        if (neighbour.isUnmarked()) {
          neighbour.setMark();
          queue.push(neighbour);
        }
      });
    }

    this.clearMarked();
  },

  /* fill an array with the edges of the graph */
  getEdges: function() {
    console.log("Graph->getEdges");
    var edges = [];

    this.each(function(vertex, index) {
      var neighbours = [];
      neighbours = vertex.getNeighbours();

      vertex.setMark();

      _.each(neighbours, function(terminal_vertex, index) {
        if (terminal_vertex.isUnmarked()) {
          edges.push([vertex, terminal_vertex]);
        }
      });

      return edges;
    })

    this.clearMarked();

    return edges;
  },

  clearMarked: function() {
    this.each(function(vertex, index) {
      vertex.clearMark();
    })
  }
});
