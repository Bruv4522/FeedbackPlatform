import Router from "express";
import AdminWare from "../Middleware/adminware";
import prisma from "../Modules/prisma";

const AdminRouter = Router();

AdminRouter.use(AdminWare);

AdminRouter.get("/", async (req, res) => {
    const reviews = await prisma.review.findMany();
    return res.json(reviews);
});

export default AdminRouter;