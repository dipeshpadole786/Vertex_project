const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/stackit', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

console.log('✅ MongoDB connected');

const answerSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true,
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    agreeVotes: { type: Number, default: 0 },
    disagreeVotes: { type: Number, default: 0 },
    agreedBy: [{ type: String }],      // ✅ usernames who agreed
    disagreedBy: [{ type: String }]    // ✅ usernames who disagreed
}, { timestamps: true });

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
