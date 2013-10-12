//= require ./vertex_view
//= require ./../models/color_wheel

/* CanvasView
 *
 * The CanvasView is responsible for clearing and drawing the canvas
 * on render.
 * */
MyApp.Views.CanvasView = Backbone.Marionette.CompositeView.extend({
  template: 'backbone/templates/canvas_view',
  className: 'canvas-container',
  height: 500,
  width: 500,

  // Renders the model once, and the collection once. Calling
  // this again will tell the model's view to re-render itself
  // but the collection will not re-render.
  render: function(){
    console.log("CanvasView->render");
    this.isRendered = true;
    this.isClosed = false;
    this.resetItemViewContainer();

    this.triggerBeforeRender();
    var html = this.renderModel();
    this.$el.html(html); // create the Canvas HTML element
    this._clearCanvas(); // clear the canvas for drawing

    // the ui bindings is done here and not at the end of render since they
    // will not be available until after the model is rendered, but should be
    // available before the collection is rendered.
    this.bindUIElements();
    this.triggerMethod("composite:model:rendered");

    this._renderChildren(); // do the rendering work for each child

    this.triggerMethod("composite:rendered");
    this.triggerRendered();
    return this;
  },

  _clearCanvas: function() {
    var context = this.$('canvas').get(0).getContext('2d');
    context.clearRect(0, 0, this.width, this.height);
  },

  renderChildView: function(view) {
    console.log("CanvasView->renderChildView");
    view.render();
  },

  appendHtml: function(collectionView, itemView) {
    console.log("CanvasView->appendHtml");
    var context = collectionView.$('canvas').get(0).getContext('2d');

    // at this point each itemview has already rendered onto its el
    context.drawImage(itemView.el, 0, 0); // draw relative to origin
  },

  draw: function() {
    console.log("CanvasView->draw");
    this._clearCanvas();

    var context = this.$('canvas').get(0).getContext('2d');
    this.children.each(function(itemView) {
      context.drawImage(itemView.el, 0, 0); // draw relative to origin
    });
  }

});
