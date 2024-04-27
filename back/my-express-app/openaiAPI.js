const axios = require('axios');
const openai = require('openai');

/*async function getQuestionFromPrompt(prompt) {
    console.log(prompt)
    const openai = new OpenAI({
        apiKey: 'sk-proj-9P435DgEkO7W5cjubT1IT3BlbkFJb7BYAOpuOlgcGDoIvIjd', // This is the default and can be omitted
    });

    return await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-3.5-turbo',
    });
*/
function getQuestionFromPrompt(prompt) {

    return axios.post('https://api.openai.com/v1/chat/completions',
        {
            "model": "gpt-3.5-turbo",
            "messages": [{ "role": "user", "content": prompt.row.prompt }],
            "temperature": 0.7
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.OPENAI_KEY
            }
        })

}
function parseResponse(message) {
    const seperatedString = message.match(/[^\r\n]+/g);
    const filteredAnswer = seperatedString.filter((item) =>
        item.startsWith("Atsakymas:")
    );
    const filteredQuestionList = seperatedString.filter(
        (item) => !item.startsWith("Atsakymas:")
    );

    if (filteredAnswer.length > 1) {
        throw new Error("There should only be one answer");
        // galima čia implementuoti logiką kad iš naujo pabandytų pasikeipt į chatgpt nes gavo nekorektišką atsakymą
    }
    var answer = null;
    filteredAnswer.forEach((element) => {
        answer = element.substring(10).trim();
    });

    return {
        question: filteredQuestionList.join(" "),
        answer: answer,
    };
}

module.exports = {
    getQuestionFromPrompt,
    parseResponse
};