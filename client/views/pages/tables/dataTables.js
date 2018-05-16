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
  console.log (Parts.find({}).count());
  this.documentpath = new ReactiveVar([]);
  this.curcategory = new ReactiveVar('category 1');
});

Template.dataTables.helpers({
  "components": function() {
    return Parts.find({}).fetch();
  },
  "documents": function() {
    console.log (Template.instance().documentpath.get());
    return Template.instance().documentpath.get();
  },
  "types": function () {
    var typearr = ['type 1', 'type 2', 'type 3', 'type 4'];
    var i =0;
    var curcategory = Template.instance().curcategory.get();
    for (; i < typearr.length; i++) {
      typearr[i] = curcategory + ' - ' + typearr[i];
    }
    return typearr;
  }
});

Template.dataTables.events({
  "click button[data-target=#addComponentModal]": function(ev, inst) {
    ev.preventDefault();

    $("#addComponentModal").modal("show");
    $('#addComponentModal #part').val('');
    $('#addComponentModal #category-select').val('');
    $('#addComponentModal #type-select').val('');
    $('#addComponentModal #place-input').val('');
    //let yearlyrecurr = $('#yearlyrecurr').;
    $('#addComponentModal #description_text').val('');
    $('#addComponentModal #quantity-val').val('');
    $('#addComponentModal #unit-select').val('');
    $('#addComponentModal #estimate-val').val('');
    $('#addComponentModal #realcost-val').val('');
    $('#addComponentModal #inflation-val').val('');
    $('#addComponentModal #purchase').val('');
    $('#addComponentModal #lastupdate').val('');
    $('#addComponentModal #lifespan-val').val('');
    $('#addComponentModal #addedyear-val').val('');
    $('#addComponentModal #whyadded_text').val('');

    $('#addComponentModal #activatemoms').iCheck('uncheck');
    $('#addComponentModal #yearlyrecurr').iCheck('uncheck');
    $('#addComponentModal #prologlifespan').iCheck('uncheck');
    $('#addComponentModal #k3component').iCheck('uncheck');

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

    //component.activatemoms = true;
    if (component.activatemoms) {
      $('#editComponentModal #activatemoms').iCheck('check');
    } else {
      $('#editComponentModal #activatemoms').iCheck('uncheck');
    }
    if (component.yearlyrecurr) {
      $('#editComponentModal #yearlyrecurr').iCheck('check');
    } else {
      $('#editComponentModal #yearlyrecurr').iCheck('uncheck');
    }
    if (component.prologlifespan) {
      $('#editComponentModal #prologlifespan').iCheck('check');
    } else {
      $('#editComponentModal #prologlifespan').iCheck('uncheck');
    }
    if (component.activatemoms) {
      $('#editComponentModal #k3component').iCheck('check');
    } else {
      $('#editComponentModal #k3component').iCheck('uncheck');
    }

    if (!component.document) {
      component.document = [];
    }
    inst.documentpath.set(component.document);
  },

  "click #addComponentModal #save-component": function (evt, inst) {
    let partname = $('#addComponentModal #part').val();
    let category = $('#addComponentModal #category-select option:selected').text();
    let type = $('#addComponentModal #type-select option:selected').text();
    let place = $('#addComponentModal #place-input').val();
    //let yearlyrecurr = $('#yearlyrecurr').;
    let description = $('#addComponentModal #description_text').val();
    let quantity = $('#addComponentModal #quantity-val').val();
    let unit = $('#addComponentModal #unit-select option:selected').text();
    let estimate = $('#addComponentModal #estimate-val').val();
    let realcost = $('#addComponentModal #realcost-val').val();
    let inflation = $('#addComponentModal #inflation-val').val();
    let purchaseyear = $('#addComponentModal #purchase').val();
    let lastupdateyear = $('#addComponentModal #lastupdate').val();
    let lifespan = $('#addComponentModal #lifespan-val').val();
    let addedyear = $('#addComponentModal #addedyear-val').val();
    let whyadded = $('#addComponentModal #whyadded_text').val();
    let activatemoms = $('#addComponentModal #activatemoms').is(':checked');
    let yearlyrecurr = $('#addComponentModal #yearlyrecurr').is(':checked');
    let prologlifespan = $('#addComponentModal #prologlifespan').is(':checked');
    let k3component = $('#addComponentModal #k3component').is(':checked');

    let document = [];
    inst.documentpath.get().forEach(function (doc) {
      delete doc.newadded;
      document.push (doc);
    });
    let completed = false;
    let newentry = {partname, category, type, place, description, quantity, unit, estimate, realcost, inflation, purchaseyear,
      lastupdateyear, lifespan, addedyear, whyadded, document, completed, k3component, prologlifespan, yearlyrecurr, activatemoms};
    //console.log (newentry);
    let newid = Parts.insert(newentry);
    //console.log (newid);
    if (document) {
      Meteor.call('move-file', inst.documentpath.get(), newid, (err, result) => {
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
    let activatemoms = $('#editComponentModal #activatemoms').is(':checked');
    let yearlyrecurr = $('#editComponentModal #yearlyrecurr').is(':checked');
    let prologlifespan = $('#editComponentModal #prologlifespan').is(':checked');
    let k3component = $('#editComponentModal #k3component').is(':checked');
    let document = [];
    inst.documentpath.get().forEach(function (doc) {
      delete doc.newadded;
      document.push (doc);
    });
    let completed = true;
    let newentry = {partname, category, type, place, description, quantity, unit, estimate, realcost, inflation, purchaseyear,
      lastupdateyear, lifespan, addedyear, whyadded, completed, k3component, prologlifespan, yearlyrecurr, activatemoms};
    if (document) {
      newentry.document = document;
    }
    console.log (newentry);
    Parts.update({_id: componentid}, {$set:newentry});
    //console.log (newid);
    if (document) {
      Meteor.call('move-file', inst.documentpath.get(), componentid, (err, result) => {
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
          var doclist = inst.documentpath.get();
          console.log (doclist);
          doclist.push ({filename : file.name, date: new Date(), comment: ''});
          inst.documentpath.set(doclist);
        }
      });
    };
    reader.readAsDataURL(file);
  },

  "change #editComponentModal #inputDoc": function (evt, inst) {
    //var func = this;
    var file = evt.currentTarget.files[0];
    var reader = new FileReader();
    reader.onload = function(fileLoadEvent) {
      Meteor.call('file-upload', file.name, fileLoadEvent.target.result, (err, result) => {
        if (result) {
          var doclist = inst.documentpath.get();
          console.log (doclist);
          doclist.push ({filename : file.name, date: new Date()});
          inst.documentpath.set(doclist);
        }
      });
    };
    reader.readAsDataURL(file);
  },

  "change .uploaded-comment": function (evt, inst) {
    var doclist = inst.documentpath.get();
    console.log (doclist);
    var docid = evt.target.dataset.docid;
    console.log (docid);
    doclist[docid].comment = evt.target.value;
    inst.documentpath.set(doclist);
  },

  "change #addComponentModal #category-select": function (evt, inst) {
    let category = evt.target.options[evt.target.selectedIndex].value;
    inst.curcategory.set(category);
  }
});