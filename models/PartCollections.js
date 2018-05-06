
Parts = new Mongo.Collection('parts');

// Deny all client-side updates
Parts.allow({
  insert(userId, ent) {
    if (ent.userId == userId) {
      return true;
    } else {
      return false;
    }
  },
  update(userId, ent) {
    if (ent.userId == userId) {
      return true;
    } else {
      return false;
    }
  },
  remove(userId, ent) {
    if (ent.userId == userId) {
      return true;
    } else {
      return false;
    }
  },
});
Parts.schema = new SimpleSchema({
  '_id': {type: String, regEx: SimpleSchema.RegEx.Id},
  'userId': {type: String, regEx: SimpleSchema.RegEx.Id},
  'createdAt': {type: Date},
  'modifiedAt': {type: Date},
  partname: {
    type: String,
    label: "Part Name"
  },
  createdBy: {
    type: String,
    label: "CreatedBy"
  },
  category: {
    type: String,
    label: "Category"
  },
  type: {
    type: String,
    label: "Type"
  },
  ActivateVAT: {
    type: String,
    label: "ActivateVAT"
  },
  place: {
    type: String,
    label: "Place"
  },
  yearlyrecurr: {
    type: Boolean,
    label: "Yearly Recurrent"
  },
  description: {
    type: String,
    label: "Description"
  },
  quantity: {
    type: Number,
    label: "Quantity"
  },
  estimate: {
    type: Number,
    label: "Estimated Cost"
  },
  realcost: {
    type: Number,
    label: "Real Cost"
  },
  VAT: {
    type: String,
    label: "VAT"
  },
  inflation: {
    type: String,
    label: "Yearly inflation"
  },
  purchaseyear: {
    type: Date,
    label: "Purchase Year"
  },
  latestyear: {
    type: String,
    label: "Latest Year"
  },
  lifespan: {
    type: String,
    label: "Lifespan"
  },
  addedyear: {
    type: Number,
    label: "Added Year"
  },
  prolonglifespan: {
    type: String,
    label: "Prolong Lifespan"
  },
  whyadded: {
    type: String,
    label: "Why Added Year"
  },
  k3component: {
    type: Boolean,
    label: "K3 Component"
  },
  uploadedfile: {
    type: String,
    label: "Upload Documents"
  },

});

Parts.publicFields = {
  userId: true,
  createdAt: true,
  modifiedAt: true,
  createdBy: true,
  partname: true,
  category: true,
  type: true,
  ActivateVAT: true,
  place: true,
  yearlyrecurr: true,
  description: true,
  quantity: true,
  estimate: true,
  realcost: true,
  VAT: true,
  inflation: true,
  purchaseyear: true,
  latestyear: true,
  lifespan: true,
  addedyear: true,
  prolonglifespan: true,
  whyadded: true,
  k3component: true,
  uploadedfile: true
};
