MyApp.Views.MasterDetailLayout = Backbone.Marionette.Layout.extend({
  template: 'backbone/templates/master_detail_layout',

  regions: {
    master: "#master",
    detail: "#detail"
  }
});
