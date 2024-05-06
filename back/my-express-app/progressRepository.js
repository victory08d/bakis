const db = require("./database");

const Question = (number, completed) => {
  return { number: number, completed: completed };
};

const Badge = (chapter, received) => {
  return { chapter: chapter, received: received };
};

function generateQuestionJson(question_count) {
  let list = [];
  for (let i = 1; i <= question_count; i++) {
    list.push(Question(i, false));
  }
  return list;
}

function createProgress(chapter, question_count, user_id, callback) {
  const sql =
    "INSERT INTO progress (chapter, question, user_id) VALUES (?,?,?)";
  var questions = JSON.stringify(generateQuestionJson(question_count));
  db.run(sql, [chapter, questions, user_id], function (err) {
    if (err) {
      return callback(err);
    }
  });
}

function getProgress(chapter, user_id, callback) {
  const sql = "SELECT QUESTION FROM progress WHERE USER_ID = ? and CHAPTER = ?";
  db.get(sql, [user_id, chapter], function (err, row) {
    if (err) {
      return callback(err);
    }
    callback(null, row);
  });
}

function updateProgress(chapter, number, userId) {
  const sql = "SELECT QUESTION FROM progress WHERE USER_ID = ? and CHAPTER = ?";
  db.get(sql, [userId, chapter], function (err, row) {
    if (err) {
      return callback(err);
    }

    var questions = JSON.parse(row.question);
    var index = questions.findIndex((x) => x.number == number);
    questions[index] = Question(number, true);

    db.run(
      "UPDATE progress set question = ? WHERE user_id = ? and chapter = ?",
      [JSON.stringify(questions), userId, chapter]
    );
  });
}

function getProgressPoints(user_id, callback) {
  const sql = "SELECT QUESTION FROM progress WHERE USER_ID = ?";
  db.all(sql, [user_id], function (err, row) {
    if (err) {
      return callback(err);
    }
    callback(null, { points: calculatePoints(row) });
  });
}

function calculatePoints(row) {
  const rowArray = Array.from(row);
  var points = 0;
  if (rowArray !== undefined) {
    for (var i = 0; i < rowArray.length; i++) {
      const questions = JSON.parse(rowArray[i].question);
      for (var j = 0; j < questions.length; j++) {
        if (questions[j].completed) {
          points++;
        }
      }
    }
  }
  return points;
}

function hasBadge(user_id, callback) {
  const sql = "SELECT * FROM progress WHERE USER_ID = ?";
  db.all(sql, [user_id], function (err, row) {
    if (err) {
      return callback(err);
    }
    callback(null, { badges: calculateIfHasBadge(row) });
  });
}

function calculateIfHasBadge(row) {
  const rowArray = Array.from(row);
  let badges = [];
  if (rowArray !== undefined) {
    for (var i = 0; i < rowArray.length; i++) {
      var completed = 0;
      const questions = JSON.parse(rowArray[i].question);
      for (var j = 0; j < questions.length; j++) {
        if (questions[j].completed) {
          completed++;
        }
      }
      badges.push(Badge(rowArray[i].chapter, completed === 30));
    }
  }
  return badges;
}

module.exports = {
  createProgress,
  getProgress,
  updateProgress,
  getProgressPoints,
  hasBadge,
};
