const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .on("open", () => {
    console.log("Mongoose connection open");
  })
  .on("error", (err) => console.log(`Connection error: ${err.message}`));

const app = require("./app");
// require('./models/Registration');

const server = app.listen(3000, function () {
  console.log(`Express is running on port ${server.address().port}`);
});
