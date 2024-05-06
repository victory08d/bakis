const cors = require("cors");
const express = require("express");
const userRepository = require("./userRepository");
const openai = require("./openaiAPI");
const promptsRepository = require("./promptsRepository");
const progressRepository = require("./progressRepository");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  userRepository.createUser(username, password, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(user);
  });
});

app.get("/register", (req, res) => {
  const { username, password } = req.query;
  userRepository.getUser(username, password, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(user);
  });
});

app.post("/progress", (req, res) => {
  const { chapter, count, userId } = req.body;
  progressRepository.createProgress(chapter, count, userId, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201);
  });
});

app.get("/progress", (req, res) => {
  const { chapter, userId } = req.query;
  progressRepository.getProgress(chapter, userId, (err, questions) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(questions);
  });
});

app.get("/points", (req, res) => {
  const { userId } = req.query;
  console.log(userId);
  progressRepository.getProgressPoints(userId, (err, points) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(points);
  });
});

app.get("/questions", (req, res) => {
  promptsRepository.getPromptByID(req.query.id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const resultgpt = openai.getQuestionFromPrompt(result);
    resultgpt.then(function (response) {
      res
        .status(200)
        .json(openai.parseResponse(response.data.choices[0].message.content));
    });
  });
});

app.put("/progress", (req, res) => {
  const { userId, chapter, number } = req.body;
  progressRepository.updateProgress(chapter, number, userId, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200);
  });
});

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
