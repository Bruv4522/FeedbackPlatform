import Router from "express";
import prisma from "../Modules/prisma";
import "dotenv/config"

const ReviewRouter = Router();

ReviewRouter.get("/", async (req, res) => {
    const reviews = await prisma.review.findMany({
        where: {
            isPublic: true
        },

        orderBy: {
            dateTime: 'desc'
        }
    });

    return res.json(reviews);
});

ReviewRouter.post("/create", async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: "Body cannot be null" });
    }

    const { rating, isPublic, body } = req.body;
    const invalid = !rating || isPublic == null || !body || typeof rating !== "number" || typeof isPublic !== "boolean" || typeof body !== "string";

    if (invalid) {
        return res.status(400).json({ error: "Invalid request body" });
    }

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    await prisma.review.create({
        data: {
            rating,
            isPublic,
            body
        }
    });

    return res.status(201).json({ message: `Review of rating ${rating} successfully created` });
});

export default ReviewRouter;