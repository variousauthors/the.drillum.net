
MyApp.Views.VertexView = Backbone.Marionette.ItemView.extend({
  template: 'backbone/templates/vertex_view',
  tagName: 'canvas',
  attributes: {
    'height': '500px',
    'width': '500px'
  },

  radius: 10,
  width: 500,
  height:500,

  onRender: function(){
    console.log("VertexView->onRender");
    var data = this.serializeData();

    this.draw(data); // my code
  },

  /* fire the relevant event */
  select: function() {
    console.log('VertexView->select');

    this.trigger('selected', this.model);
  },

  setSelected: function (isSelected) {
    this.selected = isSelected;
  },

  getSelected: function () {
    return this.selected;
  },

  draw: function(data) {
    console.log("VertexView->draw");
    var context = this.el.getContext('2d');

    this.clearCanvas(context);
    this.draw_edges(data, context);
    this.draw_vertex(data, context);
  },

  clearCanvas: function(context) {
    context.clearRect(0, 0, this.width, this.height);
  },

  draw_edges: function(data, context) {
    console.log("VertexView->draw_edges");
    context.save();
    context.beginPath();

    context.lineWidth = 2;

    _.each(data.edges, function(edge) {
      context.moveTo(data.x, data.y);
      context.lineTo(edge.get('x'), edge.get('y'));
    });

    context.stroke();

    context.closePath();
    context.restore();
  },

  draw_vertex: function(data, context) {
    console.log("VertexView->draw_vertex");
    context.save();
    context.beginPath();

    if (this.getSelected()) {
      context.strokeStyle = 'gold';
    }

    /* thick outline */
    context.lineWidth = 6;
    context.arc(data.x, data.y, this.radius, 0, 2 * Math.PI);
    context.stroke();

    context.fillStyle = data.color;
    context.fill();

    context.closePath();
    context.restore();
  },

  boundingRect: function() {
    return {
      x: this.model.get('x') - this.radius,
      y: this.model.get('y') - this.radius,
      width: this.radius * 2,
      height: this.radius * 2
    };
  }
});
