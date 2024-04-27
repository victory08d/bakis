const cors = require('cors');
const express = require('express');
const userRepository = require('./userRepository');
const openai = require('./openaiAPI');
const promptsRepository = require('./promptsRepository');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  userRepository.createUser(username, password, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(user);
  });
});

app.get('/questions', (req, res) => {
  promptsRepository.getPromptByID(req.query.id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const resultgpt = openai.getQuestionFromPrompt(result)
    resultgpt.then(function (response) {
      console.log(response.data.choices[0].message)
      res.status(200).json(openai.parseResponse(response.data.choices[0].message.content));
    })
  });
})

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
