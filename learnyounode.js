'use strict';

// WARNING: these solutions use destructuring and other things found only in node 6.9.1
// 1.  HELLO WORLD
// console.log("HELLO WORLD\n");

// 2.  BABY STEPS
// const answerTwoSum = process.argv.slice(2).reduce((acc, item) => {
  // return acc + parseInt(item);
// }, 0);
// console.log(answerTwoSum);

// 3.  My First I/O
// const fs = require('fs');
// const data = fs.readFileSync(process.argv[2], 'utf8');
// console.log(data.split("\n").length - 1);
// //or can toString the buffer like below
// const data = fs.readFileSync(process.argv[2]);
// console.log(data.toString().split("\n").length - 1);

// 4. My First async i/o
// const fs = require('fs');
// fs.readFile(process.argv[2], 'utf8', (err, data) => {
//   if (err) console.error(err);
//   console.log(data.split("\n").length - 1);
// });

// 5. Filtered LS
// const fs   = require('fs');
// const path = require('path');
// let dirname, filetype;
// [dirname, filetype] = process.argv.slice(2);
// fs.readdir(dirname, (err, list) => {
//   if (err) console.error(err);
//   list.filter((item) => path.extname(item) === `.${filetype}`).forEach((item) => console.log(item));
// });

// 6. Make it modular
// const filter = require('./learnyounode_module');
// let dirname, filetype;
// [dirname, filetype] = process.argv.slice(2);
// filter(dirname, filetype, (err, data) => {
//   if (err) console.error(err);
//   data.forEach((item) => console.log(item));
// });

// 7. HTTP Client
// const http = require('http');
// const url = process.argv[2];
// http.get(process.argv[2], (response) => {
//   response.setEncoding('utf8');
//   response.on('data', console.log);
//   response.on('error', console.error);
// });

// 8. HTTP Collect
// const http = require('http');
// const url = process.argv[2];
// http.get(process.argv[2], (response) => {
//   let allData = '';
//   response.setEncoding('utf8');
//   response.on('data', (data) => allData += data);
//   response.on('error', console.error);
//   response.on('end', () => {
//     console.log(allData.length);
//     console.log(allData);
//   });
// });

// 9. Juggling Async
// const http = require('http');
// const urls = process.argv.slice(2);
// const responses = urls.map(() => '');
// let countdownLatch = urls.length;

// urls.forEach((url, index) => {
//   http.get(url, (response) => {
//     response.setEncoding('utf8');
//     response.on('error', console.error);
//     response.on('data', (data) => responses[index] += data);
//     response.on('end', () => {
//       countdownLatch--;
//       if (countdownLatch === 0) {
//         responses.forEach((resp) => console.log(resp));
//       }
//     });
//   });
// });

// 10. Time Server
// const port = process.argv[2];
// const net = require('net');
// const pad = (num, size=2) => {
//   let s = num + "";
//   while (s.length < size) s = '0' + s;
//   return s;
// };
// const server = net.createServer((socket) => {
//   const date = new Date();
//   socket.end(`${pad(date.getFullYear())}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}\n`);
// });
// server.listen(port);

// 11. HTTP File Server
// const fs = require('fs');
// const http = require('http');
// let port, filename;
// [port, filename] = process.argv.slice(2);

// const server = http.createServer((req, res) => {
//   res.writeHead(200, {'content-type': 'text/plain'});
//   const readStream = fs.createReadStream(filename);
//   readStream.on('open', () => readStream.pipe(res));
//   readStream.on('error', res.end);
// });
// server.listen(port);

// 12. HTTP Uppercaserer
// const http = require('http');
// let port = process.argv[2];

// const server = http.createServer((req, res) => {
//   if (req.method === 'POST') {
//     const body = [];
//     req.on('error', (err) => console.error);
//     req.on('data', (chunk) => body.push(chunk))
//     req.on('end', () => {
//       const bodyString = Buffer.concat(body).toString().toUpperCase();

//       res.setHeader('Content-Type', 'text/plain');
//       res.statusCode = 200;
//       res.write(bodyString);
//       res.end();
//     });
//   } else {
//     res.statusCode = 404;
//     res.end();
//   }
// });
// server.listen(port);

// Their solution:
/*
var http = require('http')
var map = require('through2-map')

var server = http.createServer(function (req, res) {
  if (req.method !== 'POST') {
    return res.end('send me a POST\n')
  }

  req.pipe(map(function (chunk) {
    return chunk.toString().toUpperCase()
  })).pipe(res)
})

server.listen(Number(process.argv[2]))
*/

// 15. HTTP Json API Server
// const http = require('http');
// const url  = require('url');
// let port = process.argv[2];

// const server = http.createServer((req, res) => {
//   if (req.method === 'GET') {
//     const parsed = url.parse(req.url, true);
//     const date = new Date(parsed.query.iso);
//     let result;
//     if (/^\/api\/parsetime/.test(req.url)) {
//       result = {
//         hour: date.getHours(),
//         minute: date.getMinutes(),
//         second: date.getSeconds()
//       };
//     } else if (/^\/api\/unixtime/.test(req.url)) {
//       result = {
//         unixtime: date.getTime()
//       };
//     } else {
//       result = {};
//     }

//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify(result));
//   } else {
//     res.statusCode = 404;
//     res.end();
//   }
// });
// server.listen(port);
