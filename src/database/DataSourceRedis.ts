import { createClient } from 'redis';

const redisClient = createClient({
  socket: {
    port: Number(process.env.REDIS_PORT ?? 6379),
  }
});

redisClient.on('connect', () => console.log('connect to redis'));

redisClient.on('error', (error) => {
  console.log('error al conectar a redis', error);
});

export default redisClient.connect();