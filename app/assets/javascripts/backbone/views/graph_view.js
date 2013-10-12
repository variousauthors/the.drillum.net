//= require ./vertex_view
//= require ./../models/color_wheel
//= require ./canvas_view

/* GraphView
 * The GraphView is responsible for:
 *  - receiving click events from the browser, and mapping them to methods on Graph
 *  - maintaining the ColorWheel, and coloring vertices through the Vertex API
 *
 * ColorWheel: While the colour of a vertex is a data member of the vertex, and is solely
 *  the responsibility of the vertex, the available colours and the mechanism
 *  of 'rotating' through a wheel of colours has nothing to do with Vertex.
 */
MyApp.Views.GraphView = MyApp.Views.CanvasView.extend({
  itemView: MyApp.Views.VertexView,
  itemViewEventPrefix: 'vertex',
  color_wheel: {},

  initialize: function() {
    console.log("GraphView->initialize");

    this.color_wheel = new MyApp.Models.ColorWheel({ length: 0 });
    this.color_wheel.setup();
    this.listenTo(this.collection, 'vertex:selected', this.onVertexSelected);
  },

  /* fires after a vertex view has processed an incoming click */
  onVertexSelected: function(view, model) {
    console.log("EVENT  GraphView->onVertexSelected");

    this.trigger('graph:selected', model);
  },

  /* the vertices are initially all coloured the same. They receive
  *  a colour when the application requires it. */
  onBeforeItemAdded: function(itemView) {
    console.log("GraphView->onAfterItemAdded");
    this.color_wheel.increment();
    itemView.model.set('color', this.color_wheel.sample()); // returns a random color
  },

  /* map browser events to application logic */
  events: {
    'click button': 'addVertex',
    'click canvas': 'detectVertexHit',
  },

  /* detect a click inside any vertex. This has nothing to do with
  *  Graphs and Vertices, and everything to do with their visual
  *  representation. */
  detectVertexHit: function(e) {
    console.log("EVENT  GraphView->selectVertex");
    var bounds = $('canvas').get(0).getBoundingClientRect();
    var client_x = e.clientX - bounds.left;
    var client_y = e.clientY - bounds.top;

    // find the vertex that is being clicked
    var vertex_view = this.children.find(function(itemView) {
      var x = itemView.model.get('x');
      var y = itemView.model.get('y');
      var x_leg = Math.pow(x - client_x, 2);
      var y_leg = Math.pow(y - client_y, 2);
      var d = Math.sqrt(x_leg + y_leg);

      return d < itemView.radius;
    });

    if (vertex_view) {
      this.selectVertex(vertex_view);
      this.renderChildView(vertex_view);
      this.draw(); // redraw the canvas without rerendering the collection
    }
  },

  /* change the vertex's colour to the next colour in the wheel
   * and select the vertex */
  selectVertex: function(vertex_view) {
    console.log("GraphView->selectVertex");

    /* colour logic is handled by the graph view */
    var model = vertex_view.model;
    var current_color = model.get('color');
    model.set('color', this.color_wheel.next(current_color));

    /* some other logic is handled by the vertex view */
    vertex_view.select();
  },

  // TODO NEXTSTEP now we need a way to add to the "end" of the
  // graph... a "current node"
  addVertex: function(e) {
    console.log("GraphView->addVertex");
    // coordinates from 10 to 490
    var max_x = this.width - 10;
    var max_y = this.height - 10;
    var min_x = 10;
    var min_y = 10;
    var x = Math.random() * (max_x - min_x) + min_x;
    var y = Math.random() * (max_y - min_y) + min_y;
    this.collection.add(new MyApp.Models.Vertex({ 'x': x, 'y': y}));
  }
});
