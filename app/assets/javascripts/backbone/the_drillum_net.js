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

/* setup the Canvas view with graph */
MyApp.addInitializer(function(options) {
  var canvas_view = new MyApp.Views.CanvasView({
    collection: options.graph
  });

  MyApp.mainRegion.show(canvas_view);
});

$(document).ready(function() {
  var graph = new MyApp.Models.Graph([
    new MyApp.Models.Vertex({ x: 50, y: 50}),
    new MyApp.Models.Vertex({ x: 100, y: 100})
  ]);

  MyApp.start({ graph: graph });
});
