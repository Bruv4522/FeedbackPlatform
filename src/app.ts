import express from "express";
import "dotenv/config";
import ReviewRouter from "./Routers/ReviewRouter";
import AdminRouter from "./Routers/AdminRouter";
import cors from "cors";
import RateLimiter from "./Middleware/RateLimiter";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use(RateLimiter);
app.use("/", ReviewRouter);
app.use("/admin", AdminRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});