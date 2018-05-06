
FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "dataTables"});
  },
  subscriptions: function(params, queryParams) {
    this.register('partcol', Meteor.subscribe('partcol'));
  }
});