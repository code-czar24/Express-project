// Simple in-memory cache storage map
// Key: request URL string
// Value: object containing response data, timestamp, and HTTP status code
const cacheStore = new Map();

// 1 minute Time-To-Live (TTL) in milliseconds
const TTL = 60 * 1000;

// Caching middleware for GET requests
function cacheMiddleware(req, res, next) {
  // Only cache GET requests
  if (req.method !== 'GET') {
    return next();
  }

  const key = req.originalUrl || req.url;
  const currentTime = Date.now();
  const cachedResponse = cacheStore.get(key);

  // Check if data is already cached and still fresh (under 1 min old)
  if (cachedResponse && (currentTime - cachedResponse.timestamp < TTL)) {
    // Cache HIT: attach header and return cached data directly
    res.setHeader('X-Cache-Status', 'HIT');
    return res.status(cachedResponse.statusCode).json(cachedResponse.data);
  }

  // Cache MISS (either no cache existed or it expired)
  res.setHeader('X-Cache-Status', 'MISS');

  // Intercept res.json to catch the freshly fetched controller response and store it in cache
  const originalJson = res.json.bind(res);

  res.json = function(data) {
    // Only cache successful GET responses
    if (res.statusCode >= 200 && res.statusCode < 300) {
      cacheStore.set(key, {
        data: data,
        statusCode: res.statusCode,
        timestamp: Date.now()
      });
    }
    return originalJson(data);
  };

  next();
}

module.exports = {
  cacheMiddleware,
  cacheStore,
  TTL
};
