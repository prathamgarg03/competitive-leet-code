import { createClient } from 'redis';

const redis = createClient({
  url: process.env.REDIS_URL || 
       `redis${process.env.REDIS_USE_TLS === 'true' ? 's' : ''}://${process.env.REDIS_USERNAME || ''}${process.env.REDIS_PASSWORD ? `:${process.env.REDIS_PASSWORD}@` : ''}${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  socket: {
    tls: process.env.REDIS_USE_TLS === 'true',
    rejectUnauthorized: false 
  }
});

// Connect to Redis
(async () => {
  try {
    await redis.connect();
    console.log('Successfully connected to Redis');
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
  }
})();

// Error handling
redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});

export { redis };