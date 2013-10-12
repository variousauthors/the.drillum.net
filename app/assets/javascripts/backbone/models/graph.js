//= require ./vertex

// TODO override add on the Graph so that it walks the given
// vertex, adding all its neighbours
//
MyApp.Models.Graph = Backbone.Collection.extend({
  model: MyApp.Models.Vertex,

  /* setup flattens the Graph and populates a straight collection
  *  counts the nodes and chooses an appropriate colorwheel
  *  assigns each node a colour */
  setup: function() {
    var self = this;
    var nop = function(vertex) {
      return vertex;
    }
    this._walk(nop);
  },

  /* dangerous walk used internally, which triggers add and remove
  * and can be used to modify vertices in place */
  _walk: function(work) {
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

  /* pleasant non-modifying walk that doesn't cause any events
  * to trigger and can't modify the vertices in place */
  /* TODO: this solved a problem: walk was destructive and triggered
  * lots of loads. I'm not sure if I would rather do this with a clone
  * of the collection, or with the JSON as I am doing it now. */
  /* TODO: if we do it with JSON we have to leave the edges as references
  *  in order to get "mark" to work. If it is a clone, we get that for free
  *  but have to do the work of copying the whole graph, which might get
  *  big... pre-mature optimization? */
  walk: function(work) {
    var queue = []; // going to use an array now, and then implement it later
    var vertices = this.toJSON();

    // fill the queue, empty the collection
    while(vertices.length > 0) {
      queue.push(vertices.pop());
    }

    while(queue.length > 0) {
      var vertex = queue.shift();
      var neighbours = vertex.edges; // empty or with references
      var neighbour;

      /* TODO this is a problem: work should expect all JSON or all objects,
      * but as it stands it gets a little of both since edges is not serialized
      * yet */
      work(vertex); // do the work (this should JSONify the edges too...)
      this.where(vertex)[0].setMark(); // set the mark on the reference

      _.each(neighbours, function(neighbour) {
        if (neighbour.isUnmarked()) {
          neighbour.setMark();
          queue.push(neighbour.toJSON()); // again, push only the serial
        }
      });
    }

    this.clearMarked();
  },

  /* fill an array with the edges of the graph */
  getEdges: function() {
    console.log("Graph->getEdges");
    var edges = [];

    this.walk(function (vertex) {
      var neighbours = vertex.edges; // returns references

      _.each(neighbours, function (neighbour) {
        edges.push([vertex, neighbour.toJSON()]);
      });

      return vertex;
    });

    return edges;
  },

  clearMarked: function() {
    this.each(function(vertex, index) {
      vertex.clearMark();
    })
  }

})
