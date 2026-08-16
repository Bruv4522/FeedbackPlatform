import express from "express";
import "dotenv/config";
import ReviewRouter from "./Routers/ReviewRouter";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/", ReviewRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});