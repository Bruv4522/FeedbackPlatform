import Router from "express";
import AdminWare from "../Middleware/AdminWare";
import prisma from "../Modules/prisma";
import { analyze, solution } from "../Services/AIService";

const AdminRouter = Router();

AdminRouter.use(AdminWare);

AdminRouter.get("/", async (req, res) => {
    const reviews = await prisma.review.findMany({
        orderBy: {
            dateTime: 'desc'
        }
    });
    return res.json(reviews);
});

AdminRouter.post("/reply/:id", async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: "Body cannot be null" });
    }

    const id = Number(req.params.id);
    const { reply } = req.body;

    if (!reply) {
        return res.status(400).json({ error: "Reply cannot be null" });
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
            admins: {
                push: reply
            }
        }
    });

    return res.json({ message: `Successfully created new reply to review of id ${id} with the text '${reply}'` });
});

AdminRouter.get("/analyze/:id", async (req, res) => {

    const id = Number(req.params.id);

    const foundReview = await prisma.review.findUnique({
        where: {
            id: id
        }
    });

    if (!foundReview) {
        return res.status(404).json({ error: `Review of id ${id} does not exist` });
    }

    const output = await analyze(foundReview.body);
    return res.json({ message: output });
});

AdminRouter.get("/solution/:id", async (req, res) => {

    const id = Number(req.params.id);

    const foundReview = await prisma.review.findUnique({
        where: {
            id: id
        },
    });

    if (!foundReview) {
        return res.status(404).json({ error: `Review of id ${id} does not exist` });
    }

    const output = await solution(foundReview.body);
    return res.json({ message: output });
});


export default AdminRouter;