const mongoose = require("mongoose");
const User = require("./User");
mongoose.connect('mongodb://localhost:27017/stackit', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
console.log('✅ MongoDB connected');


const questionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    tags: [String],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);


