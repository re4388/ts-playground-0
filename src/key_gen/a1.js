const express = require('express');
const Redis = require('ioredis');

const app = express();
const redis = new Redis(); // Connect to the default Redis server

// Endpoint to generate and return a new incrementing key
app.get('/generate-key', async (req, res) => {
  try {
    // const newKey = await redis.incr('key_counter');
    // console.log("=====> new Date().getTime(): ", new Date().getTime());
    let timestamp = Math.floor(new Date().getTime())
    let machineId = '0001'
    let newKey = await generate_unique_key(redis, `${timestamp}-${machineId}`)
    console.log("=====> newKey: ", newKey);
    res.json({ key: newKey });
  } catch (error) {
    console.error('Error generating key:', error);
    res.status(500).json({ error: 'Failed to generate key' });
  }
});

async function generate_unique_key(redis, prefix) {
  console.log("=====> prefix: ", prefix);
  return prefix + await redis.incr(prefix)
}






const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
