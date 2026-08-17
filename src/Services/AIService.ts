import ai from "../Modules/genai";

export async function analyze(text: string) {

    const response = await ai.interactions.create({
        model: "gemini-3.7-flash",
        input: text + " // Please give nothing more or less; a full analysis of the review being described without the solution. If it is positive, describe the elements being described as positive. If it is negative, describe what exactly is being described as negative. If not enough info is provided, simply say that. I'm basically asking you to give me a full analysis of this review without the solution if it's a pronlem."
    });

    return response.output_text;
}

export async function solution(text: string) {

    const response = await ai.interactions.create({
        model: "gemini-3.7-flash",
        input: text + "// Please give a full solution to this. If it is positive, please explain how to keep the quality that way. If it is negative, please explain how to fix and prevent it from happening again. If the review does not contain enough info, simply state that."
    });

    return response.output_text;
}
