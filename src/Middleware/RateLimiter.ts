import cache from "../Modules/RateCache";

function RateLimiter(req: any, res: any, next: any) {
    const ip = req.ip;

    const foundIp = cache.get(ip);

    if (!foundIp) {
        cache.set(ip, 1);
        next();
    } else {
        cache.set(ip, foundIp + 1);
        let newIp = foundIp + 1;
        
        if (newIp > 25) {
            return res.status(429).json({ error: "You have sent to many requests per minute" });
        }

        next();
    }
}

export default RateLimiter;