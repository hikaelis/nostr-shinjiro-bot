const { OpenAI } = require("openai");
const { generatePrompt } = require("./generatePrompt");
const { OPENAI_API_KEY } = require("./config");

const askGPT = async() => {
	
	const message = generatePrompt();

	const openai = new OpenAI({
		apiKey: OPENAI_API_KEY
	})

	const completion = await openai.chat.completions.create({
			model: "gpt-4",
			messages: [{ "role": "user", "content": message }],
		});
	console.log(completion.choices[0].message.content);
	return completion.choices[0].message.content
}

// askGPT();

module.exports = {askGPT}
