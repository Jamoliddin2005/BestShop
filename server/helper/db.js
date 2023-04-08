const mongoose = require("mongoose");

module.exports = () => {
  const URI = process.env.MONGO_URI;

  mongoose.connect(URI, {
    useNewUrlParser: true
  });

  const db = mongoose.connection;

  db.on("open", () => {
    console.log(`MongoDb running`);
  });

  db.on("error", (err) => {
    console.log(`MongoDb Error:`, err);
  });
};
