import { LRUCache } from "lru-cache";

export const cache = new LRUCache({
  max: 50,
  ttl: 1000 * 60,
});
