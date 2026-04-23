// Simple in-memory rate limiter (can be replaced with express-rate-limit later)
const rateLimitStore = new Map();
const isDevelopment = process.env.NODE_ENV !== 'production';

export const createRateLimiter = (windowMs, maxRequests, message) => {
    return (req, res, next) => {
        // Skip rate limiting in development for easier testing
        // Set NODE_ENV=production to enable rate limiting
        if (isDevelopment) {
            return next();
        }

        // Use a more reliable key for rate limiting
        const key = req.ip || req.connection?.remoteAddress || req.socket?.remoteAddress || 'development';
        const now = Date.now();
        const windowStart = now - windowMs;

        // Get or create entry for this key
        let requests = rateLimitStore.get(key) || [];

        // Filter out old requests
        requests = requests.filter(timestamp => timestamp > windowStart);

        if (requests.length >= maxRequests) {
            return res.status(429).json({
                message: message || "Too many requests, please try again later"
            });
        }

        // Add current request
        requests.push(now);
        rateLimitStore.set(key, requests);

        next();
    };
};

// Clean up old entries periodically (simple implementation)
setInterval(() => {
    const now = Date.now();
    const oneHourAgo = now - (60 * 60 * 1000);

    for (const [key, requests] of rateLimitStore.entries()) {
        const recentRequests = requests.filter(timestamp => timestamp > oneHourAgo);
        if (recentRequests.length === 0) {
            rateLimitStore.delete(key);
        } else {
            rateLimitStore.set(key, recentRequests);
        }
    }
}, 60 * 60 * 1000); // Clean up every hour