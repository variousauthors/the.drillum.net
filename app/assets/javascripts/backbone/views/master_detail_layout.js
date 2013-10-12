
MyApp.Views.MasterDetailLayout = Backbone.Marionette.Layout.extend({
  template: 'backbone/templates/master_detail_layout',

  regions: {
    master: "#master",
    detail: "#detail"
  },

  initialize: function() {
    console.log('MasterDetailLayout->initialize');

    var self = this;
    _.each(_.keys(this.regions), function(region_name) {
      var name = region_name.charAt(0).toUpperCase() + region_name.slice(1);

      self.listenTo(self[region_name], 'show', self['on' + name + 'Show']);
    });
  },

  onMasterShow: function(view) {
    console.log('EVENT  MasterDetailLayout->onMasterShow');

    this.listenTo(view, 'graph:selected', this.onMasterSelected);
  },

  onMasterSelected: function(model) {
    console.log('EVENT  MasterDetailLayout->onMasterSelected');

    var passage_view = new MyApp.Views.PassageView({ model: model.get('passage') });
    this.detail.show(passage_view);
  },

  onDetailSelected: function(model) {
    console.log('EVENT  MasterDetailLayout->onDetailSelected');

  },

  onDetailShow: function(view) {
    console.log('EVENT  MasterDetailLayout->onDetailShow');

    this.listenTo(view, 'graph:selected', this.onDetailSelected);
  },

  onShow: function(region) {
    console.log('EVENT  MasterDetailLayout->onShow');
  }

});
