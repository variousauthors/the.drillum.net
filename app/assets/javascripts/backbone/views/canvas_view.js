//= require ./vertex_view
//= require ./../models/color_wheel

// TODO this is really a GraphView mixed with a CanvasView
// needs to split them out
// TODO the colorwheel stuff is in here because that's convenient (for
// the purposes of event listening). I think that Color is really a property
// of the Graph though, so I will have to figure out how to make backbone models
// do this.
// Hmm... unless! We think of Marionette Views as controllers (which they are) in
// which case this may be ok. Think, Ziggy, think.
MyApp.Views.CanvasView = Backbone.Marionette.CompositeView.extend({
  template: 'backbone/templates/canvas_view',
  className: 'canvas-container',
  itemView: MyApp.Views.VertexView,
  height: 500,
  width: 500,
  color_wheel: {},

  initialize: function() {
    var self = this;
    this.color_wheel = new MyApp.Models.ColorWheel({ length: 0 });
    this.color_wheel.setup();
    console.log("CanvasView->initialize");
  },

  appendHtml: function(collectionView, itemView) {
    console.log("CanvasView->appendHtml");
    var context = collectionView.$('canvas').get(0).getContext('2d');
    context.fillStyle = 'black';

    context.beginPath();
    context.fillStyle = 'black';
    context.lineWidth = 2;

    var x = itemView.model.get('x');
    var y = itemView.model.get('y');
    _.each(itemView.model.get('edges'), function(edge) {
      context.moveTo(x, y);
      context.lineTo(edge.get('x'), edge.get('y'));
    });

    context.stroke();

    context.drawImage(itemView.el, 0, 0); // draw relative to origin
  },

  onBeforeItemAdded: function(itemView) {
    console.log("CanvasView->onAfterItemAdded");
    this.color_wheel.increment();
    itemView.model.set('color', this.color_wheel.sample()); // returns a random color
  },

  onItemRemoved: function() {
    console.log("CanvasView->onItemRemoved");
  },

  events: {
    'click button': 'addVertex',
    'click canvas': 'detectVertexHit'
  },

  detectVertexHit: function(e) {
    console.log("EVENT->CanvasView->selectVertex");
    var bounds = $('canvas').get(0).getBoundingClientRect()
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
      this.selectVertex(vertex_view.model);
      this.updateVertex(vertex_view);
    }
  },

  updateVertex: function(vertex_view) {
    vertex_view.render();

    var context = this.$('canvas').get(0).getContext('2d');
    context.fillStyle = 'black';
    context.drawImage(vertex_view.el, 0, 0); // draw relative to origin
  },

  selectVertex: function(vertex) {
    console.log(vertex);
    var current_color = vertex.get('color');
    vertex.set('color', this.color_wheel.next(current_color));
  },

  // TODO NEXTSTEP now we need a way to add to the "end" of the
  // graph... a "current node"
  addVertex: function(e) {
    console.log("CanvasView->addVertex");
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
