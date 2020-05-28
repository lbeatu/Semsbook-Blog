const express = require("express");
const process = require("process");
const connectDB = require("./config/db");
const path = require("path");
const app = express();

//Connect Database

connectDB();

//app.get("/", (req, res) => res.send("Hello my friend"));
app.use(
  express.json({
    extended: false,
  })
);

// Define Routes
app.use("/api/posts", require("./routes/posts"));
// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
