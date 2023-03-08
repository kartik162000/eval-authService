const redis = require('redis');
exports.insertIntoRedis = async(token) => {
  console.log(token);
  const config = {
    socket: {
      host: '127.0.0.1',
      port: 6379,
    },
  };
  const client = redis.createClient(config);
  await client.connect()
  await client.set("token",token);
  const value = await client.get("token");
  await client.disconnect()
  return value;
}