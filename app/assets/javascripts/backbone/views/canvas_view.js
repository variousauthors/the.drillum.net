//= require ./vertex_view
//= require ./../models/color_wheel

// TODO this is really a GraphView mixed with a CanvasView
// needs to split them out
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
    context.drawImage(itemView.el, 0, 0); // draw relative to origin
    console.log("out CanvasView->appendHtml");
  },

  onRender: function() {
    console.log("CanvasView->onRender");
  },

  onBeforeItemAdded: function(itemView) {
    console.log("CanvasView->onAfterItemAdded");
    this.color_wheel.increment();
    itemView.model.set('color', this.color_wheel.color()); // returns a random color
  },

  onItemRemoved: function() {
    console.log("CanvasView->onItemRemoved");
  },

  events: {
    'click button': 'addVertex'
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
