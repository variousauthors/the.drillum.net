//= require_self
//= require ./core_ext
//= require_tree ./templates
//= require_tree ./models
//= require_tree ./views
//= require_tree ./routers

// create a marionette app in the global namespace
MyApp = new Backbone.Marionette.Application();
MyApp.module("Models");
MyApp.module("Views");

// add the content div as a region our app will be aware of
MyApp.addRegions({
  mainRegion: "#content"
});

// here we define the initializer for the app, later we will call it
MyApp.addInitializer(function(options) {
  var canvas_view = new MyApp.Views.CanvasView({
    collection: options.graph
  });

  console.log(options.graph);
  console.log(canvas_view);
  MyApp.mainRegion.show(canvas_view);
});

$(document).ready(function() {
  var graph = new MyApp.Models.Graph([
    new MyApp.Models.Vertex({ x: 1, y: 2}),
    new MyApp.Models.Vertex({ x: 1, y: 2})
  ]);

  MyApp.start({ graph: graph });
});
