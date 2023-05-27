import Redis from "ioredis";
// Create a Redis client
const redis = new Redis("6380");

export function lua_script_redis() {
  // Define a Lua script
  const luaScript = `
  local key = KEYS[1]
  local value = ARGV[1]

  -- Set the value in Redis
  redis.call('SET', key, value)

  -- Get the value from Redis
  local result = redis.call('GET', key)

  return result
`;

  async function runLuaScript(key: string, value: string) {
    try {
      // Run the Lua script using EVAL
      const result = await redis.eval(luaScript, 1, key, value);

      console.log("Result:", result);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // Close the Redis connection
      redis.quit();
    }
  }

  // Call the function with a key and value
  runLuaScript("QQ_key", "QQ_value");
}
