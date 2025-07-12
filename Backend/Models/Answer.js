const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/stackit', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
console.log('✅ MongoDB connected');
const answerSchema = new mongoose.Schema({
    content: { type: String, required: true },
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;