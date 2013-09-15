
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
    console.log(this);
    var data = this.serializeData();

    this.draw(data); // my code
  },

  draw: function(data) {
    console.log("VertexView->draw");
    var context = this.el.getContext('2d');
    console.log(data);
    context.beginPath();
    context.arc(data.x, data.y, this.radius, 0, 2 * Math.PI);
    context.fillStyle = data.color;
    context.fill();
    context.fillStyle = 'black';
    _.each(data.edges, function(element, index) {
      context.moveTo(data.x, data.y);
      context.lineTo(element.get('x'), element.get('y'));
    });
    context.stroke();
  }
});
