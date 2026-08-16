import express from "express";
import "dotenv/config";
import ReviewRouter from "./Routers/ReviewRouter";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/", ReviewRouter);

app.get("/ai", async (req, res) => {
    const response = await ai.interactions.create({
        model: "gemini-3.6-flash",
        input: "Answer quickly and don't give anything but the answer. What is 9^9?",
    });

    return res.json({ "message": response.output_text });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});