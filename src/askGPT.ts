import { OpenAI } from "openai";
import { OPENAI_API_KEY } from "./config";
import { generatePrompt } from "./generatePrompt";

export const askGPT = async(): Promise<string> => {
	const message: string = await generatePrompt();
	const openai = new OpenAI({
		apiKey: OPENAI_API_KEY
	})
	const completion = await openai.chat.completions.create({
			model: "gpt-4",
			messages: [{ "role": "user", "content": message }],
		});
	console.log(completion.choices[0].message.content);
	return completion.choices[0].message.content ?? "null";
}

// askGPT();