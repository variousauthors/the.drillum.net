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
  var masterDetailLayout = new MyApp.Views.MasterDetailLayout();

  MyApp.mainRegion.show(masterDetailLayout);

  console.log("== MyApp-->initializer ==");
  var graph_view = new MyApp.Views.GraphView({
    collection: options.graph
  });

  var passage_view = new MyApp.Views.PassageView();

  masterDetailLayout.master.show(graph_view);
  masterDetailLayout.detail.show(passage_view);
});

MyApp.vent.on('graph:selected', function() {
  console.log('== bubble max ==');
});

$(document).ready(function() {
  /* vertices created one at a time */
  var A = new MyApp.Models.Vertex({x:15, y:30, color: 'red', edges: []});
  var B = new MyApp.Models.Vertex({x:15, y:30, color: 'blue', edges: []});
  var C = new MyApp.Models.Vertex({x:45, y:100, edges: []});
  console.log("---");
  A.addEdge(B);
  A.addEdge(B);
  A.addEdge(C);
  console.log("---");

  var D = new MyApp.Models.Vertex({ x:90, y:60, edges: [
    new MyApp.Models.Vertex({x:75, y:10}),
    new MyApp.Models.Vertex({x:10, y:75}),
    new MyApp.Models.Vertex({x:10, y:75}),
    new MyApp.Models.Vertex({x:90, y:150})
  ]});

//SOON
//A.set('passage', new MyApp.Models.Passage({ text: "Bob" }));
//B.set('passage', new MyApp.Models.Passage({ text: "is" }));
//C.set('passage', new MyApp.Models.Passage({ text: "grumpy" }));

  /* we could also say Graph([A, B, C, D, E]),
  * and redundant edges would not be included
  * note also: D is nested in A->C->D
  * and: B is a duplicate
  * but the result will be a set of vertices */
  var graph = new MyApp.Models.Graph([A, D]);

  graph.setup();

  /* after this point it is the view that listens */
  MyApp.start({ graph: graph });
});
