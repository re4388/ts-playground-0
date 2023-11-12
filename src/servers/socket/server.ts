import net from 'net'

const server = net.createServer(function(socket:net.Socket) {
  console.log('client connected');

  // when client call xxx.end, server will handle in below cb
  socket.on('end', function() {
    console.log('客戶端關閉連接');
  });

  socket.write('Hello World!\r\n');

  // socket is stream, so we can use pipe to connect stream
  socket.pipe(socket);
});
server.listen(8084, function() {
  console.log('server is listening');
});