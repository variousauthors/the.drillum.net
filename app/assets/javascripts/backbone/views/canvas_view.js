//= require ./vertex_view

MyApp.Views.CanvasView = Backbone.Marionette.CompositeView.extend({
  template: 'backbone/templates/canvas_view',
  className: 'canvas-container',
  itemView: MyApp.Views.VertexView,

  appendHtml: function(collectionView, itemView) {
    console.log("NOP");
    var context = collectionView.$('canvas').get(0).getContext('2d');
    context.fillStyle = 'black';
    context.fillText("yeah", 50, 50);
    context.drawImage(itemView.el, 100, 100);
  }
});
