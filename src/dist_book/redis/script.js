#!/usr/bin/env node
// npm install ioredis@4.17
const redis = new (require('ioredis'))('localhost:6380');

// the script is aliased to a command named adduser.
redis.defineCommand("adduser", {
  numberOfKeys: 2,
  lua: require('fs').readFileSync(__dirname + '/add-user.lua')
});

const LOBBY = 'lobby';
const GAME = 'game';


(async () => {

  // calls the redis.adduser() method four times to simulate four different players joining the lobby.
  // The arguments to this new method reflect the arguments passed to the Lua script
  // (in this case, the lobby key, the game key, and the player ID).
  console.log(await redis.adduser(LOBBY, GAME, 'alice')); // null
  console.log(await redis.adduser(LOBBY, GAME, 'bob')); // null
  console.log(await redis.adduser(LOBBY, GAME, 'cindy')); // null

  // the final fourth call triggers the game creation logic.
  // When that happens, an array is returned, with the first value being the game ID (gid)
  // and the second returning the list of players (players).
  const [gid, players] = await redis.adduser(LOBBY, GAME, 'tlhunter');


  console.log('GAME ID', gid, 'PLAYERS', players.split(','));

  redis.quit();


})();