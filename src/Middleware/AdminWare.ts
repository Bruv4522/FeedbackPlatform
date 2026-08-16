import "dotenv/config"

async function AdminWare(req: any, res: any, next: any) {
    const allHeaders = req.headers;

    if (!allHeaders || allHeaders["password"]) {
        return res.status(401).json({ error: "Required headers are null" });
        next();
    }

    const password = allHeaders["password"];

    if (password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ error: "Password is incorrect" });
        next();
    }

    next();
}

export default AdminWare;