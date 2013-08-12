
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
    console.log(data);
    var context = this.el.getContext('2d');
    context.beginPath();
    context.arc(data.x, data.y, this.radius, 0, 2 * Math.PI);
    context.stroke();
  }
});
