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
  console.log("== MyApp-->initializer ==");
  var canvas_view = new MyApp.Views.CanvasView({
    collection: options.graph
  });

  MyApp.mainRegion.show(canvas_view);
});

$(document).ready(function() {
  /* vertices created one at a time */
//var A = new MyApp.Models.Vertex({x:15, y:15});
//var B = new MyApp.Models.Vertex({x:30, y:30});
//var C = new MyApp.Models.Vertex({x:45, y:45});
//var D = new MyApp.Models.Vertex({x:120, y:120});
//A.addEdge(B).addEdge(C.addEdge(D.addEdge(A))); // nested edge A->C->D

///* or in bulk */
//var E = new MyApp.Models.Vertex({ x:60, y:60, edges: [
//  new MyApp.Models.Vertex({x:75, y:75}),
//  new MyApp.Models.Vertex({x:90, y:90}),
//  new MyApp.Models.Vertex({x:105, y:105}),
//  B
//]});
  var A = new MyApp.Models.Vertex({x:15, y:30, color: 'red', edges: []});
  var B = new MyApp.Models.Vertex({x:15, y:30, color: 'blue', edges: []});
  var C = new MyApp.Models.Vertex({x:45, y:100, edges: []});
  A.addEdge(B);
  A.addEdge(B);
  A.addEdge(C);

  var D = new MyApp.Models.Vertex({ x:90, y:60, edges: [
    new MyApp.Models.Vertex({x:75, y:10}),
    new MyApp.Models.Vertex({x:10, y:75}),
    new MyApp.Models.Vertex({x:90, y:150})
  ]});

  /* we could also say Graph([A, B, C, D, E]),
  * and redundant edges would not be included
  * note also: D is nested in A->C->D
  * and: B is a duplicate
  * but the result will be a set of vertices */
  var graph = new MyApp.Models.Graph([A, D]);

  /* since the views aren't set up yet we must listen */
  MyApp.listenTo(graph, 'remove', function(model, collection) {
    collection.decrement_color_wheel();
  });

  MyApp.listenTo(graph, 'add', function(model, collection) {
    collection.increment_color_wheel();
  });

  graph.setup();

  /* after this point it is the view that listens */
  MyApp.stopListening();
  MyApp.start({ graph: graph });
});
