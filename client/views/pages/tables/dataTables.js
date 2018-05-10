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
  //this.editModal = $('#editComponentModal').clone();
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

  "click i[data-target=#editComponentModal]": function(evt, inst) {
    evt.preventDefault();

    /*
    var clone = inst.editModal.clone();

    $("#editComponentModal").remove();
    $('.modaldivs').append(clone);
    console.log (clone);

    $('#editComponentModal #purchase_date .input-group.date').datepicker({
      todayBtn: "linked",
      keyboardNavigation: false,
      forceParse: false,
      calendarWeeks: true,
      autoclose: true
    });

    $('#editComponentModal #lastupdate_date .input-group.date').datepicker({
      todayBtn: "linked",
      keyboardNavigation: false,
      forceParse: false,
      calendarWeeks: true,
      autoclose: true
    });

    // Initialize i-check plugin
    $('#editComponentModal .i-checks').iCheck({
      checkboxClass: 'icheckbox_square-green',
      radioClass: 'iradio_square-green'
    });*/
    let componentid = evt.target.dataset.id;
    let component = Parts.findOne({_id:componentid});
    $("#editComponentModal").modal("show");
    $('#editComponentModal #part').val(component.partname);
    console.log (component.category);
    $('#editComponentModal #category-select').val(component.category);
    $('#editComponentModal #type-select').val(component.type);
    $('#editComponentModal #place-input').val(component.place);
    //let yearlyrecurr = $('#yearlyrecurr').;
    $('#editComponentModal #description_text').val(component.description);
    $('#editComponentModal #quantity-val').val(component.quantity);
    $('#editComponentModal #unit-select').val(component.unit);
    $('#editComponentModal #estimate-val').val(component.estimate);
    $('#editComponentModal #realcost-val').val(component.realcost);
    $('#editComponentModal #inflation-val').val(component.inflation);
    $('#editComponentModal #purchase').val(component.purchaseyear);
    $('#editComponentModal #lastupdate').val(component.lastupdateyear);
    $('#editComponentModal #lifespan-val').val(component.lifespan);
    $('#editComponentModal #addedyear-val').val(component.addedyear);
    $('#editComponentModal #whyadded_text').val(component.whyadded);
    $('#editComponentModal #save-component').attr('data-id', componentid);
  },

  "click #addComponentModal #save-component": function (evt, inst) {
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
    //console.log (newentry);
    let newid = Parts.insert(newentry);
    //console.log (newid);
    if (document) {
      Meteor.call('move-file', document, newid, (err, result) => {
        if (err) {
          console.log(err);
        }
      });
    }
  },

  "click #editComponentModal #save-component": function (evt, inst) {
    let componentid = evt.target.dataset.id;
    let partname = $('#editComponentModal #part').val();
    let category = $('#editComponentModal #category-select option:selected').text();
    let type = $('#editComponentModal #type-select option:selected').text();
    let place = $('#editComponentModal #place-input').val();
    //let yearlyrecurr = $('#yearlyrecurr').;
    let description = $('#editComponentModal #description_text').val();
    let quantity = $('#editComponentModal #quantity-val').val();
    let unit = $('#editComponentModal #unit-select option:selected').text();
    let estimate = $('#editComponentModal #estimate-val').val();
    let realcost = $('#editComponentModal #realcost-val').val();
    let inflation = $('#editComponentModal #inflation-val').val();
    let purchaseyear = $('#editComponentModal #purchase').val();
    let lastupdateyear = $('#editComponentModal #lastupdate').val();
    let lifespan = $('#editComponentModal #lifespan-val').val();
    let addedyear = $('#editComponentModal #addedyear-val').val();
    let whyadded = $('#editComponentModal #whyadded_text').val();
    let document = inst.documentpath;
    let newentry = {partname, category, type, place, description, quantity, unit, estimate, realcost, inflation, purchaseyear,
      lastupdateyear, lifespan, addedyear, whyadded};
    if (document) {
      newentry.document = document;
    }
    console.log (newentry);
    Parts.update({_id: componentid}, {$set:newentry});
    //console.log (newid);
    if (document) {
      Meteor.call('move-file', document, componentid, (err, result) => {
        if (err) {
          console.log(err);
        }
      });
    }
  },

  "click .delete-part-button": function(evt, inst) {
    let componentid = evt.target.dataset.id;
    swal({
        title: "Are you sure?",
        text: "Your will not be able to recover this component data!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        closeOnConfirm: false,
        closeOnCancel: true },
      function (isConfirm) {
        if (isConfirm) {
          Parts.remove({_id: componentid});
          swal("Deleted!", "Component has been deleted.", "success");
        } else {
          //swal("Cancelled", "Component is safe :)", "error");
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