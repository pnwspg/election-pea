const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 8081

// mongodb://localhost:27017/onlineOutageApi
  mongoose.connect('mongodb+srv://smc:snED30Y1CRcXce84@cluster0-pyne4.mongodb.net/onlineOutageApi?retryWrites=true&w=majority', {
// mongoose.connect("mongodb://localhost:27017/onlineOutageApi", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(error => console.log("Cannot connect to MongoDB",error));

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/uploaded"));

app.use("/api/v1", require("./api"));

app.listen(PORT, () => {
  
  console.log(`Server is running.. ${PORT}`);
});

module.exports = app;
