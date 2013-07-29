//= require_self
//= require ./core_ext
//= require_tree ./templates
//= require_tree ./models
//= require_tree ./views
//= require_tree ./routers

// create a marionette app in the global namespace
MyApp = new Backbone.Marionette.Application();
MyApp.module("Models");

// add the content div as a region our app will be aware of
MyApp.addRegions({
  mainRegion: "#content"
});

// here we define the initializer for the app, later we will call it
MyApp.addInitializer(function(options) {
  console.log(options);
  // var graph = new CanvasView({ collection: options.verts });

  // MyApp.mainRegion.show(graph);
});

$(document).ready(function() {
  var verts = new MyApp.Models.Graph([
    new MyApp.Models.Vertex({ x: 1, y: 2})
  ]);

  MyApp.start({ verts: verts });
});
