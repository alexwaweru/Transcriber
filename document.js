const mongoose = require("mongoose");

const documentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String, 
    url : String
});

module.exports = mongoose.model("Document", documentSchema);