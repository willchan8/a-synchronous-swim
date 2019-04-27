const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const keypressHandler = require('./keypressHandler');
const messageQueue = require('./messageQueue');
const http = require('http');

var callback = (key) => { messageQueue.enqueue(key); };
keypressHandler.initialize(callback);

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

module.exports.router = (req, res, next = () => { }) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  if (req.method === 'GET') {
    if (req.url === '/') {
      var m = messageQueue.dequeue();
      //console.log('message ', m);
      res.writeHead(200, headers);
      if (m !== undefined) {
        headers['content-type'] = 'plain/text'
        res.write(m);
      }
      res.end();
      return;
    } else if (req.url === '/bg') {
      var content = fs.readFileSync('./spec/water-lg.jpg');
      headers['content-type'] = 'image/jpeg';
      res.writeHead(200, headers);
      res.write(content);
      res.end();
      return;
    }
  }

  if (req.type === 'POST') {
    http.createServer(function (req, res) {
      var body = "";
      req.on('data', function (chunk) {
        body += chunk;
      });
      req.on('end', function () {
        console.log('POSTed: ' + body);
        res.writeHead(200);
        res.end(index.html)
      });
    }).listen(8080);
  }

  res.writeHead(200, headers);
  res.end();
};
