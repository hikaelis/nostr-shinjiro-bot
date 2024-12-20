import { OpenAI } from "openai";
import { OPENAI_API_KEY, llmModel } from "./config";
import { generatePrompt } from "./generatePrompt";
import { filterWords } from "./config"


export const askGPT = async(): Promise<string> => {
	const prompt: string = await generatePrompt();
	const openai = new OpenAI({
		apiKey: OPENAI_API_KEY
	})
	const completion = await openai.chat.completions.create({
			model: llmModel,
			messages: [{ "role": "user", "content": prompt }],
		});
	const res = completion.choices[0].message.content ?? "";
	console.log(res);
	return res;
}


// askGPT();