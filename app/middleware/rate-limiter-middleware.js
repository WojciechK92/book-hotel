import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 40,
  duration: 1,
});

const rateLimiterMiddleware = (req, res, next) => {
  rateLimiter.consume(req)
    .then(() => next())
    .catch(() => {
      res.status(429).send('Too many requests!');
    });
};

export default rateLimiterMiddleware;