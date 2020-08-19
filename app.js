//@ts-check
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  console.log(db.listDatabases());
  db.close();
});






