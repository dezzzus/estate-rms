Template.dataTables.rendered = function(){

    // Initialize dataTables
  console.log ('rendered');
  console.log (Parts.find().fetch());
    $('.dataTables-example').DataTable({
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            { extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'ExampleFile'},
            {extend: 'pdf', title: 'ExampleFile'},

            {extend: 'print',
                customize: function (win){
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]

    });

  $('#purchase_date .input-group.date').datepicker({
    todayBtn: "linked",
    keyboardNavigation: false,
    forceParse: false,
    calendarWeeks: true,
    autoclose: true
  });

  $('#lastupdate_date .input-group.date').datepicker({
    todayBtn: "linked",
    keyboardNavigation: false,
    forceParse: false,
    calendarWeeks: true,
    autoclose: true
  });

};

Template.dataTables.onCreated (function () {
  //Meteor.subscribe('partcol');
  console.log ('oncreated');
  console.log (this);
});

Template.dataTables.helpers({
  "components": function() {
    console.log ('helper');
    console.log (Parts.find().fetch());
    return Parts.find({}).fetch();
  }
});

Template.dataTables.events({
  "click #save-component": function (evt) {
    let partname = $('#part').val();
    let category = $('#category-select option:selected').text();
    let type = $('#type-select option:selected').text();
    let place = $('#place-input').val();
    //let yearlyrecurr = $('#yearlyrecurr').;
    let description = $('#description_text').val();
    let quantity = $('#quantity-val').val();
    let unit = $('#unit-select option:selected').text();
    let estimate = $('#estimate-val').val();
    let realcost = $('#realcost-val').val();
    let inflation = $('#inflation-val').val();
    let purchaseyear = $('#purchase').val();
    let lastupdateyear = $('#lastupdate').val();
    let lifespan = $('#lifespan-val').val();
    let addedyear = $('#addedyear-val').val();
    let whyadded = $('#whyadded_text').val();
    let newentry = {partname, category, type, place, description, quantity, unit, estimate, realcost, inflation, purchaseyear,
      lastupdateyear, lifespan, addedyear, whyadded};
    console.log (newentry);
    Parts.insert(newentry);
  }
});