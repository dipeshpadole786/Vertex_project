const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/stackit', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
console.log('✅ MongoDB connected');



const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: String,
    password: { type: String, required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);


