Meteor.publish('partcol', function () {
  /*if (! this.userId) {
    return this.ready();
  }*/
  console.log ('partcol');

  return Parts.find({});
});