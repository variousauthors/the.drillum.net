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
* TODO currently loops aren't handled properly:
*  they render the vertex twice
*  they don't render a loopy looking edge
*  So I am making these loop free (which is what I need anyway)
*
* */
MyApp.Models.Vertex = Backbone.Model.extend({
  defaults: {
    'x': 0,
    'y': 0,
    'color': 'black', // a string maintaining a colour
    'edges': [],
  },

  constructor: function() {
    console.log("Vertex->constructor");
    // uniq the param set
    var params = arguments[0];

    if (params['x'] == undefined) return undefined;
    if (params['y'] == undefined) return undefined;

    // we will need x and y for _uniq
    this.x = params['x'];
    this.y = params['y'];

    params['edges'] = this._uniq(params['edges']);

    Backbone.Model.apply(this, arguments);
  },

  initialize: function(params) {
    console.log("Vertex->initialize");

    this._marked = false;
    var self = this;
  },

  /* given a list of edges, returns the loop-free
   * set of edges, in an array.
   * @pre this.x and this.y are defined
   * @return [] if edges is undefined */
  _uniq: function(edges) {
    if (edges == undefined) return [];
    if (this.x == undefined) return undefined;
    if (this.y == undefined) return undefined;

    var point_set = {};
    var local_origin = this.x + ', ' + this.y;
    point_set[local_origin] = false;

    _.each(edges, function(edge) {
      var point = '' + edge.get('x') + ', ' + edge.get('y');
      point_set[point] = edge;
    });

    delete point_set[local_origin];

    return _.values(point_set);
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
    var equal = (a.get('x') === b.get('x') && a.get('y') === b.get('y'))

    return equal;
  },

  /* add an edge to the edge list with idempotence
  *  @param A Vertex */
  addEdge: function(terminal_vertex) {
    console.log("Vertex-->addEdge");
    if (this.isEqual(terminal_vertex)) return this; // loop: should handle this later

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
