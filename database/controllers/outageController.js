const Outage = require("../models/outage");
const constants = require("../constant");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs-extra");
const moment = require("moment");

const request = require("request");
// get Method
exports.index = async (req, res, next) => {
  const result = await Outage.find().sort({ _id: -1 });
  try {
    if (result) res.status(200).json(result);
  } catch (error) {
    res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
  }
};

// edit Method
exports.modify = async (req, res, next) => {
  try {
    let result = await Outage.findOne({ id: req.params.id });
    if (result) {
      res.json(result);
    } else {
      res.json({});
    }
  } catch (error) {
    res.json({});
  }
};

// Upload Image
uploadImage = async (files, doc) => {
  if (files.image != null) {
    var fileExtention = files.image.name.split(".")[1];
    doc.image = `${doc.id}.${fileExtention}`;
    var newpath =
      // path.resolve(__dirname + "/uploaded/images/") + "/" + doc.image;
      path.resolve ("./uploaded/images/") + "/" + doc.image;

    console.log(newpath);

    if (fs.exists(newpath)) {
      await fs.remove(newpath);
    }
    await fs.moveSync(files.image.path, newpath);

    // Update database
    let result = Outage.update( {   id: doc.id  },{ image: doc.image });
    return result;
  }
};

// insert
exports.insert = async (req, res, next) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (error, fields, files) => {
      //text
      let result = await Outage.create(fields);
      // image
      let result2 = await uploadImage(files, result);

  
console.log(result.nameOrg);

      // const token = "b8LpKyFbRPYD2cpbpZJTs6jmZPDV52nmj6wWycyNVwy";


      

      res.json({
        result: constants.kResultOk,
        message: JSON.stringify(result),
        // message: JSON.stringify(field.typeOrg),
      });
    });
  } catch (error) {
    res.json({
      result: constants.kResultNok,
      message: JSON.stringify(error),
    });
  }
};

// charge
exports.charge = async (req, res, next) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (error, fields, files) => {
      // let result3 = await Outage.updateMany(fields, { id: fields.id });
      let result3 = await Outage.updateMany({id: fields.id}, fields);

      result3 = await uploadImage(files, fields);
      let result4 = fields;
      // O6FzulYUtaoBcdjWC1SY4ZMTyEt8B4OviYXUTlmfcXd บอทจ่ายไฟ
      const token = "O6FzulYUtaoBcdjWC1SY4ZMTyEt8B4OviYXUTlmfcXd";

      let memoName = fields;
      if (memoName.reporterName == "ศูนย์ควบคุมการจ่ายไฟฟ้า เขต 2 ภาคเหนือ")
        memoName.reporterName = "ศูนย์ฯ พิษณุโลก";
      if (memoName.reporterName == "ศูนย์ควบคุมการจ่ายไฟฟ้า เขต 3 ภาคเหนือ")
        memoName.reporterName = "ศูนย์ฯ ลพบุรี นะจ๊ะ";

      let message =
        "\n" +
        "วันที่ " +
        moment(new Date(result4.outageDate)).format("DD/MM/YYYY HH:mm") +
        " น." +
        "\n" +
        "หน่วยงาน:  " +
        result4.typeOrg +
        "\n" +
        "สถานีไฟฟ้า:  " +
        result4.nameOrg +
        "\n" +
        "ปริมาณโหลด: " +
        Number(result4.load).toLocaleString() +
        " MW" +
        "\n" +
        "สถานะ: จ่ายไฟฟ้าได้บางส่วน" +
        "\n" +
        "วันที่ " +
        moment(new Date(result4.firstChargeDate)).format("DD/MM/YYYY HH:mm") +
        " น." +
        "\n" +
        "ระยะเวลาไฟฟ้าดับ " +
        result4.hoursFristCharge +
        " ชั่วโมง " +
        result4.minutesFirstCharge +
        " นาที " +
        "\n" +
        memoName.reporterName;

      request({
        method: "POST",
        uri: "https://notify-api.line.me/api/notify",

        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          bearer: token,
        },
        form: {
          message: message,
        },
      });

      res.json({
        result: constants.kResultOk,
        message: JSON.stringify(result3),
      });
    });
  } catch (error) {
    res.json({
      result: constants.kResultNok,
      message: JSON.stringify(error),
    });
  }
};

// restore
exports.restore = async (req, res, next) =>{
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (error, fields, files) => {
      let result3 = await Outage.updateMany({id: fields.id}, fields);
      result3 = await uploadImage(files, fields);
      let result4 = fields;
      // O6FzulYUtaoBcdjWC1SY4ZMTyEt8B4OviYXUTlmfcXd บอทจ่ายไฟ
      const token = "O6FzulYUtaoBcdjWC1SY4ZMTyEt8B4OviYXUTlmfcXd";

      let memoName = fields;
      if (memoName.reporterName == "ศูนย์ควบคุมการจ่ายไฟฟ้า เขต 2 ภาคเหนือ")
        memoName.reporterName = "ศูนย์ฯ พิษณุโลก";
      if (memoName.reporterName == "ศูนย์ควบคุมการจ่ายไฟฟ้า เขต 3 ภาคเหนือ")
        memoName.reporterName = "ศูนย์ฯ ลพบุรี ครับผม";

      let message =
        "\n" +
        "วันที่ " +
        moment(new Date(result4.outageDate)).format("DD/MM/YYYY HH:mm") +
        " น." +
        "\n" +
        "หน่วยงาน:  " +
        result4.typeOrg +
        "\n" +
        "สถานีไฟฟ้า:  " +
        result4.nameOrg +
        "\n" +
        "ปริมาณโหลด: " +
        Number(result4.load).toLocaleString() +
        " MW" +
        "\n" +
        "สถานะ: จ่ายไฟฟ้าได้ทั้งหมด" +
        "\n" +
        "วันที่ " +
        moment(new Date(result4.restoreDate)).format("DD/MM/YYYY HH:mm") +
        " น." +
    
        "\n" +
  
        "ระยะเวลาไฟฟ้าดับ " +
        result4.hoursRestore +
        " ชั่วโมง " +
        result4.minutesRestore +
        " นาที " +
        "\n" +
        memoName.reporterName;

      request({
        method: "POST",
        uri: "https://notify-api.line.me/api/notify",

        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          bearer: token,
        },
        form: {
          message: message,
        },
      });

      res.json({
        result: constants.kResultOk,
        message: JSON.stringify(result3),
      });
    });
  } catch (error) {
    res.json({
      result: constants.kResultNok,
      message: JSON.stringify(error),
    });
  }
}

// delete
exports.delete = async (req, res, next) =>{
  try {
    const { id } = req.params;
    const result = await Outage.findOne({ id  });
    result = await Outage.remove({  id: id  });


    res.json({
      result: constants.kResultOk,
      message: JSON.stringify(result),
    });
  } catch (error) {
    res.json({
      result: constants.kResultNok,
      message: JSON.stringify(error),
    });
  }
}