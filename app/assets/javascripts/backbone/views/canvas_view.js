//= require ./vertex_view

MyApp.Views.CanvasView = Backbone.Marionette.CompositeView.extend({
  template: 'backbone/templates/canvas_view',
  className: 'canvas-container',
  itemView: MyApp.Views.VertexView,

  render: function(){
    this.isRendered = true;
    this.isClosed = false;
    this.resetItemViewContainer();

    this.triggerBeforeRender();
    var html = this.renderModel();
    this.$el.html(html);

    this.bindUIElements();
    this.triggerMethod("composite:model:rendered");

    this._renderChildren();

    this.triggerMethod("composite:rendered");
    this.triggerRendered();
    return this;
  },

  appendHtml: function(collectionView, itemView) {
    var context = collectionView.$('canvas').get(0).getContext('2d');
    context.fillStyle = 'black';
    context.fillText("yeah", 50, 50);
    context.drawImage(itemView.el, 100, 100);
  }
});
