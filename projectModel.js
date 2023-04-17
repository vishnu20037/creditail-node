const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    salesRepId: {
      type: String,
      required: true,
    },
    salesmanName: {
      type: String,
      required: true,
    },
    invoiceAmount: {
      type: Number,
      required: true,
    },
    retailerId: {
      type: String,
      required: true,
    },
    retailerName: {
      type: String,
      required: true,
    },
    retailerPhone: {
      type: Number,
      required: true,
    },
    invoiceDate: {
      type: String,
      required: true,
    },
    billNo: {
      type: String,
      required: true,
    },
    pendingAmount: {
      type: Number,
      required: true,
    },
    collectionDate: {
      type: String,
      required: true,
    },
    payments: {
      type: Array,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
const Invoice = mongoose.model("Invoices", schema);
module.exports = Invoice;
