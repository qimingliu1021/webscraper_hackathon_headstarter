const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/webscraper", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema for the headings
const headingSchema = new mongoose.Schema({
  heading: String,
  dateScraped: { type: Date, default: Date.now },
});

// Create a model
const Heading = mongoose.model("Heading", headingSchema);

module.exports = Heading;
