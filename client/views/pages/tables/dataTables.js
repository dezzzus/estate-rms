Template.dataTables.rendered = function(){

  // Initialize dataTables
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

  // Initialize i-check plugin
  $('.i-checks').iCheck({
    checkboxClass: 'icheckbox_square-green',
    radioClass: 'iradio_square-green'
  });

  this.addModal = $('#addComponentModal').clone();
  console.log (this.addModal);
};

Template.dataTables.onCreated (function () {
  //Meteor.subscribe('partcol');
  this.documentpath = null;
});

Template.dataTables.helpers({
  "components": function() {
    return Parts.find({}).fetch();
  }
});

Template.dataTables.events({
  "click button[data-target=#addComponentModal]": function(ev, inst) {
    ev.preventDefault();

    var clone = inst.addModal.clone();
    console.log (inst.addModal);

    $("#addComponentModal").remove();
    $('.modaldivs').append(clone);
    console.log (clone);

    $('#addComponentModal #purchase_date .input-group.date').datepicker({
      todayBtn: "linked",
      keyboardNavigation: false,
      forceParse: false,
      calendarWeeks: true,
      autoclose: true
    });

    $('#addComponentModal #lastupdate_date .input-group.date').datepicker({
      todayBtn: "linked",
      keyboardNavigation: false,
      forceParse: false,
      calendarWeeks: true,
      autoclose: true
    });

    // Initialize i-check plugin
    $('#addComponentModal .i-checks').iCheck({
      checkboxClass: 'icheckbox_square-green',
      radioClass: 'iradio_square-green'
    });

    $("#addComponentModal").modal("show");

  },

  "click #save-component": function (evt, inst) {
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
    let document = inst.documentpath;
    let newentry = {partname, category, type, place, description, quantity, unit, estimate, realcost, inflation, purchaseyear,
      lastupdateyear, lifespan, addedyear, whyadded, document};
    console.log (newentry);
    let newid = Parts.insert(newentry);
    console.log (newid);
    Meteor.call('move-file', document, newid, (err, result) => {
      if (err) {
        console.log(err);
      }
    });
  },
  "change #addComponentModal #inputDoc": function (evt, inst) {
    //var func = this;
    var file = evt.currentTarget.files[0];
    var reader = new FileReader();
    reader.onload = function(fileLoadEvent) {
      Meteor.call('file-upload', file.name, fileLoadEvent.target.result, (err, result) => {
        if (result) {
          inst.documentpath = file.name;
        }
      });
    };
    reader.readAsDataURL(file);
  },
});