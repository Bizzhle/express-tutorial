var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BookSchema = Schema({
  title: { type: String, required: true },
  author: { type: Schema.ObjectId, ref: "Author", required: true }, // Represents specific instances of a model in the database.
  summary: { type: String, required: true },
  isbn: { type: String, required: true },
  genre: [{ type: Schema.ObjectId, ref: "Genre" }],
});

// Virtual properties are document properties that you can get and set but that do not get persisted to MongoDB.
// The getters are useful for formatting or combining fields,
// while setters are useful for de-composing a single value into multiple values for storage
// Note: We will use a virtual property in the library to define a unique URL for each model record using a path and the record's _id value
// Virtual for book's URL
BookSchema.virtual("url").get(function () {
  return "/catalog/book/" + this._id;
});

//Export model
module.exports = mongoose.model("Book", BookSchema);
