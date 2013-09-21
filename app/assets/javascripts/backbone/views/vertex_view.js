
MyApp.Views.VertexView = Backbone.Marionette.ItemView.extend({
  template: 'backbone/templates/vertex_view',
  tagName: 'canvas',
  attributes: {
    'height': '500px',
    'width': '500px'
  },

  radius: 10,

  onRender: function(){
    console.log("VertexView->onRender");
    var data = this.serializeData();

    this.draw(data); // my code
  },

  draw: function(data) {
    console.log("VertexView->draw");
    var context = this.el.getContext('2d');
    var rect = this.boundingRect();

    // clear the border
    context.beginPath();
    context.lineWidth = 2;
    context.arc(data.x, data.y, this.radius, 0, 2 * Math.PI);
    context.clip();
    context.clearRect(rect.x, rect.y, rect.width, rect.height);
    context.restore();

    // draw the vertex
    context.beginPath();
    context.lineWidth = 2;
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
