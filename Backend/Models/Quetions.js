const mongoose = require("mongoose");
const User = require("./User");
mongoose.connect('mongodb://localhost:27017/stackit', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
console.log('✅ MongoDB connected');
const questionSchema = new mongoose.Schema({
    title: String,
    description: String,
    tags: [String],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    answers: [{
        username: String,
        text: String,
        createdAt: Date
    }]
}, { timestamps: true }); // ✅ this adds createdAt, updatedAt


module.exports = mongoose.model("Question", questionSchema);


