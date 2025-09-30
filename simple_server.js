const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Simple server is working' }));
});

server.listen(3003, '0.0.0.0', () => {
  console.log('Simple server running on port 3003');
});

server.on('error', (err) => {
  console.error('Server error:', err);
});