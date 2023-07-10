import net from 'net'


const client = net.connect({port: 8084}, function() {
  console.log('連接到伺服器！');
});

// when server send back, here we defined what we wana do with the data
client.on('data', function(data) {
  console.log(data.toString());

  // client close the connection
  client.end();
});

// when client receive the end event, client log out
client.on('end', function() {
  console.log('斷開與伺服器的連接');
});