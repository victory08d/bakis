const db = require("./database");

function getPromptByQuestionNumberAndChapter(
  questionNumber,
  chapter,
  callback
) {
  const sql = "SELECT prompt FROM questions where question = ? and chapter = ?";
  console.log(questionNumber, chapter);
  db.get(sql, [questionNumber, chapter], function (err, row) {
    if (err) {
      return callback(err);
    }
    console.log(row);
    callback(null, { row });
  });
}

module.exports = {
  getPromptByQuestionNumberAndChapter,
};
