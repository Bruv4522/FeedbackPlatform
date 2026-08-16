import Router from "express";
import AdminWare from "../Middleware/adminware";

const AdminRouter = Router();

AdminRouter.use(AdminWare);

AdminRouter.get("/protected-route", (req, res) => {
    return res.json({ message: "Hello world!" });
});

export default AdminRouter;