const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Invoice = require("./projectModel");
// Date object
const date = new Date();
let currentDay = String(date.getDate()).padStart(2, "0");
let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
let currentYear = date.getFullYear();
// we will display the date as DD/MM/YYYY
let currentDate = `${currentDay}/${currentMonth}/${currentYear}`;
const uri =
  "mongodb+srv://admin:123456creditail@cluster.am1c5a5.mongodb.net/projectDB?retryWrites=true&w=majority";
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//API to insert invoice details to create a new invoice
app.post("/insert_invoice", async (req, res) => {
  try {
    const thisBill = await Invoice.find({
      billNo: req.body.billNo,
      collectionDate: req.body.collectionDate,
    });
    //preventing user to add same invoice of same collection date
    if (thisBill.length) {
      return res.status(409).json({
        message: `can not add invoice details with billNo of same collection data. Please change billNo or collection date `,
      });
    }
    const invoice = await Invoice.create(req.body);
    res.status(200).json(invoice);
    console.log(req.body);
    res.send(req.body);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
//API to read all invoices of today 
app.get("/all_invoices", async (req, res) => {
  try {
    const invoices = await Invoice.find({ collectionDate: currentDate });
    res.status(200).json(invoices);
    console.log(req.body);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
//api to update the pendingamount of the invoice and record payment against the invoice
app.put("/update_invoice", async (req, res) => {
  try {
    const billNo = req.query.billNo; //get the billNo from query parameter
    const details = await Invoice.findOneAndUpdate(
      { billNo: billNo },
      req.body
    );
    if (!details) {
      return res.status(404).json({
        message: `can not find invoice details with billNo ${billNo}`,
      });
    }
    const updatedDetails = await Invoice.find({ billNo: billNo });
    res.status(200).json(updatedDetails);
    console.log(req.body);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
mongoose.set("strictQuery", false);
mongoose
  .connect(uri)
  .then(() => {
    console.log("connect to mongodb");
    app.listen(3000, () => {
      console.log("server connecting....");
    });
  })
  .catch((error) => {
    console.log(error);
  });
