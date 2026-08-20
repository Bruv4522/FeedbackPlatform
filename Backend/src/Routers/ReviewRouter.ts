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

ReviewRouter.post("/report/:id", async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: "Body cannot be null" });
    }

    const id = Number(req.params.id);
    const { report } = req.body;

    if (!report) {
        return res.status(400).json({ error: "Report cannot be null" });
    }

    const foundReview = await prisma.review.findUnique({
        where: {
            id: id
        }
    });

    if (!foundReview) {
        return res.status(404).json({ error: `Review of id ${id} does not exist` });
    }

    await prisma.review.update({
        where: {
            id: id
        },

        data: {
            reports: {
                push: report
            }
        }
    });

    return res.json({ message: `Successfully reported review of id ${id}, we will get back to your shortly` });
});

export default ReviewRouter;