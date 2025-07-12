const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: String,
    password: String,
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    answers: [
        {
            questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
            text: String,
            createdAt: { type: Date, default: Date.now }
        }
    ],
    votes: [
        {
            questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
            answerIndex: Number, // index in the answers array of the question
            voteType: String, // "up" or "down"
        }
    ],
    role: { type: String, enum: ['user', 'admin'], default: 'user' },


}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
