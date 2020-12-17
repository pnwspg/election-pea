const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = new mongoose.Schema(
  {
    id: { type: Number },
   

    nameOrg: { type: String },
    weather: { type: String },   
    outageDate: { type: String },
// ใหม่ *******************************************
    province: { type: String },
    feeder: { type: String },
    volt: { type: String },
    typeElection: { type: String },
    namePlace: { type: String },
    cause: { type: String },


    reporterName: { type: String },
    


  },
  {
    collection: "outages", // collection ต้องตรงใน mongodb เลย 
  }
);

 schema.plugin(AutoIncrement, {id:'id_seq',inc_field: 'id'});



const outage = mongoose.model("Outages", schema);

module.exports = outage;
