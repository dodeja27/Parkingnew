const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 2727;
app.use(cors());

app.use(express.json());
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useFindAndModify: false });
const connection = mongoose.connection;
connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", function() {
  console.log("db connected");
});
// .then(() => console.log("database connection successfull"))
// .catch(err => console.log("error"))
//console.log(connection);
const userrouter = require("./routes/users");
const spotrouter = require("./routes/spots");
app.use("/users", userrouter);
app.use("/spots", spotrouter);

app.listen(port, () => console.log("listening at "+port));
