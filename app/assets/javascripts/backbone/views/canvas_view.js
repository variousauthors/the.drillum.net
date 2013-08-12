//= require ./vertex_view

MyApp.Views.CanvasView = Backbone.Marionette.CompositeView.extend({
  template: 'backbone/templates/canvas_view',
  className: 'canvas-container',
  itemView: MyApp.Views.VertexView,
  height: 500,
  width: 500,

  appendHtml: function(collectionView, itemView) {
    console.log("CanvasView->appendHtml");
    var context = collectionView.$('canvas').get(0).getContext('2d');
    context.fillStyle = 'black';
    context.drawImage(itemView.el, 0, 0); // draw relative to origin
  },

  onRender: function() {
    console.log("CanvasView->onRender");
  },

  onAfterItemAdded: function() {
    console.log("CanvasView->onAfterItemAdded");
  },

  events: {
    'click button': 'addVertex'
  },

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
