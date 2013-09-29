
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

  draw: function(data) {
    console.log("VertexView->draw");
    var context = this.el.getContext('2d');

    this.clearCanvas(context);
    this.draw_edges(data, context);
    this.draw_vertex(data, context);
  },

  clearCanvas: function(context) {
    console.log("VertexView->_clearCanvas");
    context.clearRect(0, 0, this.width, this.height);
  },

  draw_edges: function(data, context) {
    context.fillStyle = 'black';

    context.beginPath();
    context.fillStyle = 'black';
    context.lineWidth = 2;

    _.each(data.edges, function(edge) {
      context.moveTo(data.x, data.y);
      context.lineTo(edge.get('x'), edge.get('y'));
    });

    context.stroke();
  },

  draw_vertex: function(data, context) {
    context.beginPath();
    context.lineWidth = 3;
    context.arc(data.x, data.y, this.radius, 0, 2 * Math.PI);
    context.fillStyle = data.color;
    context.fill();

    context.stroke();
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
