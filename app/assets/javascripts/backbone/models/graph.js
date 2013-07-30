//= require ./vertex

MyApp.Models.Graph = Backbone.Collection.extend({
  model: MyApp.Models.Vertex,
  initialize: function(options) { }
});
