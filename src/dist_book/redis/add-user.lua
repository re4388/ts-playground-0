

--you’re going to build a waiting lobby for a multiplayer game.
--When players attempt to join a game, they are added to the lobby.
--If enough players have been added to the lobby, four players in this case, then the players are removed from the lobby and a game is created.
--A hash is created to contain a collection of actively running games and the players within them.


--The Lua scripting environment provided by Redis comes with two global arrays for accessing arguments provided to the script.
--The first is called KEYS, which contains the list of Redis keys,
--and the second is ARGV, which contains the normal arguments.

-- KEYS[1], KEYS[2], ARGV[1] is user defined variable

-- The first key is assigned to a variable named LOBBY. This is a Redis set that contains a list of player identifiers.
local LOBBY = KEYS[1]   -- Set

-- The second key is assigned to the variable GAME, which is a hash containing active games.
local GAME = KEYS[2]    -- Hash

-- Finally, the only argument to the script is assigned to USER_ID, which is the ID of the player that was just added to the lobby.
local USER_ID = ARGV[1] -- String

-- The Redis Lua environment provides the method redis.call() that allows Lua to call Redis commands.
redis.call('SADD', LOBBY, USER_ID)  -- add member into a set, sadd key member

if redis.call('SCARD', LOBBY) == 4 then -- get set count,   SMEMBERS setKey to get all members for that set's key
    -- This list of players is converted into a comma-separated string using the Lua table.concat() function.
    local members = table.concat(redis.call('SMEMBERS', LOBBY), ",")
    redis.call('DEL', LOBBY) -- empty lobby
    local game_id = redis.sha1hex(members) -- an identifier for the game is generated

    -- the field name is the game ID and the value is a comma-separated list of player IDs.
    redis.call('HSET', GAME, game_id, members) -- hset key field value


    -- Finally, an array (table) with two elements is returned,
    -- where the first is the game ID and the second is the list of players.
    -- Scripts can return data of different types between runs, and in this case, the script returns either a table or a nil.
    return {game_id, members}
end

-- will come here if member is not equal 4 and ret nil
-- nil is converted to null in ioredis
return nil


-- This script atomically adds players to a lobby and creates games.
-- It does require that both the lobby and the game hash be stored in the same Redis instance.
-- You can ensure this happens either by using a single Redis instance or by using curly braces when naming keys.
-- Normally, Redis chooses which instance to host a key on by hashing the key.
-- However, if you wrap a subset of the key name in curly braces, only the value inside of the curly braces is used for the hash.
-- In this case, if the lobby key was named lobby{pvp} and the game key was named game{pvp}, then the keys would always end up together.



-- locally, we run above in my docker redis, from load lua to run all and quite, took 0.04 s or 40ms