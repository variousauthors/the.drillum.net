//= require ./vertex_view

// TODO this is really a GraphView mixed with a CanvasView
// needs to split them out
MyApp.Views.CanvasView = Backbone.Marionette.CompositeView.extend({
  template: 'backbone/templates/canvas_view',
  className: 'canvas-container',
  itemView: MyApp.Views.VertexView,
  height: 500,
  width: 500,

  initialize: function() {
    var self = this;
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

  onAfterItemAdded: function() {
    console.log("CanvasView->onAfterItemAdded");
    this.collection.increment_color_wheel();
  },

  onItemRemoved: function() {
    console.log("CanvasView->onItemRemoved");
    this.collection.decrement_color_wheel();
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
