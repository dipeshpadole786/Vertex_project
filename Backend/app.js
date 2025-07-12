const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Models
const User = require("./Models/User");
const Question = require("./Models/Quetions");
const Answer = require("./Models/Answer")

const app = express();

// 🔗 MongoDB Connection
mongoose.connect('mongodb://localhost:27017/stackit', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
console.log('✅ MongoDB connected');

// 🔐 Passport Config
passport.use(new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username });
    if (!user) return done(null, false, { message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return done(null, false, { message: 'Invalid password' });

    return done(null, user);
}));

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((id, done) => User.findById(id).then(user => done(null, user)));

// 🌐 Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(session({
    secret: 'stackit_secret',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// 🔐 Auth Routes
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existing = await User.findOne({ username });
        if (existing) {
            return res.status(400).json({ message: "Username already taken" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(200).json({ message: "User registered", user: newUser.username });

    } catch (error) {
        console.error("❌ Registration error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


app.patch('/questions/:questionId/answers/:answerId/vote', async (req, res) => {
    const { questionId, answerId } = req.params;
    const { type, username } = req.body;  // ✅ get username

    try {
        const question = await Question.findById(questionId);
        if (!question) return res.status(404).json({ message: 'Question not found' });

        const answer = question.answers.id(answerId);
        if (!answer) return res.status(404).json({ message: 'Answer not found' });

        if (type === 'agree') {
            if (answer.agreedBy?.includes(username)) {
                return res.status(400).json({ message: 'You already agreed!' });
            }
            answer.agreeVotes = (answer.agreeVotes || 0) + 1;
            answer.agreedBy = [...(answer.agreedBy || []), username];
        } else if (type === 'disagree') {
            if (answer.disagreedBy?.includes(username)) {
                return res.status(400).json({ message: 'You already disagreed!' });
            }
            answer.disagreeVotes = (answer.disagreeVotes || 0) + 1;
            answer.disagreedBy = [...(answer.disagreedBy || []), username];
        } else {
            return res.status(400).json({ message: 'Invalid vote type' });
        }

        await question.save();

        res.status(200).json({
            message: 'Vote recorded',
            agreeVotes: answer.agreeVotes,
            disagreeVotes: answer.disagreeVotes,
            agreedBy: answer.agreedBy,
            disagreedBy: answer.disagreedBy
        });
    } catch (err) {
        console.error('❌ Vote error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});









app.post('/login', passport.authenticate('local'), (req, res) => {
    // ✅ Send both username and role
    const { username, role } = req.user;
    res.status(200).json({
        message: 'Logged in',
        user: { username, role }
    });
});

app.delete('/questions/:id', async (req, res) => {
    try {



        // 3. Find and delete question
        const deletedQuestion = await Question.findByIdAndDelete(req.params.id);

        if (!deletedQuestion) {
            return res.status(404).json({ message: "Question not found." });
        }

        res.status(200).json({ message: "Question deleted successfully." });
    } catch (err) {
        console.error("❌ Delete error:", err);
        res.status(500).json({ message: "Server error" });
    }
});



app.post('/logout', (req, res) => {
    req.logout(err => {
        if (err) return res.status(500).json({ message: 'Logout error' });
        res.json({ message: 'Logged out' });
    });
});

app.get('/me', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ user: req.user.username });
    } else {
        res.status(401).json({ message: 'Not logged in' });
    }
});

app.get('/user/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })
            .select("-password")
            .populate('answers.questionId', 'title') // for answers
            .populate('questions', 'title createdAt'); // ✅ for questions

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            username: user.username,
            email: user.email,
            joined: user.createdAt,
            answers: user.answers,
            questions: user.questions,
        });
    } catch (err) {
        console.error("❌ Profile fetch error:", err);
        res.status(500).json({ message: "Server error" });
    }
});




// ❓ Question Routes
app.get('/questions', async (req, res) => {
    try {
        const questions = await Question.find()
            .populate('owner', 'username')
            .sort({ createdAt: -1 });
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

app.get('/questions/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id)
            .populate('owner', 'username')
            .lean();

        if (!question) return res.status(404).json({ message: "Question not found" });

        question.answers = question.answers || [];
        res.json(question);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

app.post('/questions', async (req, res) => {
    const { title, description, tags, username } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: "User not found." });

        const question = await Question.create({
            title,
            description,
            tags,
            owner: user._id,
        });

        user.questions.push(question._id);
        await user.save();

        res.status(201).json({ message: "Question posted", question });
    } catch (error) {
        console.error("❌ Question post error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// 💬 Answers (embedded)
app.post('/questions/:id/answers', async (req, res) => {
    const questionId = req.params.id;
    const { text, username } = req.body;

    try {
        const question = await Question.findById(questionId);
        if (!question) return res.status(404).json({ message: "Question not found" });

        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: "User not found" });

        // ✅ Create answer in Answer model (not embedded)
        const answer = await Answer.create({
            content: text,
            question: question._id,
            author: user._id,
            agreeVotes: 0,
            disagreeVotes: 0,
        });

        // Optionally: push answer reference to user.answers
        user.answers.push({
            questionId: question._id,
            text,
            createdAt: new Date(),
        });
        await user.save();

        res.status(201).json({
            message: "Answer posted",
            answer: {
                _id: answer._id,
                text: answer.content,
                username: user.username,
                createdAt: answer.createdAt,
                agreeVotes: 0,
                disagreeVotes: 0,
            },
        });
    } catch (error) {
        console.error("❌ Answer post error:", error);
        res.status(500).json({ message: "Server error" });
    }
});





// 🚀 Start Server
app.listen(3000, () => {
    console.log('✅ Server running on http://localhost:3000');
});
