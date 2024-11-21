const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;
// mongoose.connect(URI);
const DBConnection = mongoose
  .connect(URI)
  .then(() => {
    console.log(
      "💻 ================= Welcome Wizard DataBase  Is Connected to Server ============== 💻"
    );
  })
  .catch((err) => {
    console.log("Error Connecting Database!", err);
  });

module.exports = DBConnection;
