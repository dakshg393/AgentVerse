import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL!); // stored in .env.local

export default redis;
