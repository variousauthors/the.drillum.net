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
    console.log("GraphView->onBeforeItemAdded");
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
      this.draw(); // redraw the canvas without rerendering the collection
    }
  },

  /* override draw function to draw edges first */
  /* TODO: this solved the problem, but now lines are
  * very un-antialiases for some reason. See also graph.walk */
  draw: function() {
    console.log("GraphView->draw");
    this._clearCanvas();

    var context = this.$('canvas').get(0).getContext('2d');

    context.save();
    context.beginPath();
    context.lineWidth = 2;

    _.each(this.collection.getEdges(), function(edge) {
      var start = edge[0];
      var end = edge[1];

      context.moveTo(start.x, start.y);
      context.lineTo(end.x, end.y);

      context.stroke();
    });

    context.closePath();
    context.restore();

    this.children.each(function(itemView) {
      context.drawImage(itemView.el, 0, 0); // draw relative to origin
    });
  },

  /* change the vertex's colour to the next colour in the wheel
   * and select the vertex */
  selectVertex: function(vertex_view) {
    console.log("GraphView->selectVertex");

    /* colour logic is handled by the graph view */
    var model = vertex_view.model;
    var current_color = model.get('color');
    model.set('color', this.color_wheel.next(current_color));

    /* change the selected vertex */
    this.renderSelectedVertex(vertex_view);

    /* some other logic is handled by the vertex view */
    vertex_view.select();
  },

  renderSelectedVertex: function (vertex_view) {
    if (this.selected_vertex === vertex_view) return;

    if (this.selected_vertex) {
      this.selected_vertex.setSelected(false);
      this.renderChildView(this.selected_vertex);
    }

    this.selected_vertex = vertex_view;
    this.selected_vertex.setSelected(true);
    this.renderChildView(vertex_view);
  },

  /* TODO this is quick and dirty: it gives a roughly hourglass
  * shaped distribution of tiny circles */
  addVertex: function(e) {
    console.log("GraphView->addVertex");
    // set the origin to the currently selected vertex
    var origin_x = this.selected_vertex.model.get('x');
    var origin_y = this.selected_vertex.model.get('y');

    var offset_x = Math.random() * 250 - 125;
    var offset_y = Math.floor(Math.sqrt(125*125 - offset_x*offset_x));
    if (Math.round(Math.random())) {
      offset_y *= -1;
    }

    var x = origin_x + offset_x;
    var y = origin_y + offset_y;

    // attach the new vert to the current one
    var new_vertex = new MyApp.Models.Vertex({ 'x': x, 'y': y, 'edges': [ this.selected_vertex.model ]});
    this.collection.add(new_vertex);

    // retrieve a view for the new_vertext and set it as selected
    var new_view = this.children.findByModel(new_vertex);
    this.selectVertex(new_view);
    this.draw(); // redraw the canvas without rerendering the collection
  }
});
