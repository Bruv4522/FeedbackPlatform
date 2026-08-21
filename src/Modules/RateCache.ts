import { LRUCache } from "lru-cache";

const cache = new LRUCache<string, number>({
    max: 1000,
    ttl: 1000 * 60 * 1
});

export default cache;