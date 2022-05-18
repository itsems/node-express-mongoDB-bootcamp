const fs = require('fs')
const http = require('http');
const url = require('url');

// Files

// Blocking, sync way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
// console.log(textIn);
// const textOut = `this is ${textIn} \n asdfasdf ${Date.now()}`
// fs.writeFileSync('./txt/output.txt', textOut)

// Non-blocking, async way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
//   console.log(data);
// })
// console.log('will read file!');

// Server
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
  
const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === '/')
    res.end('hello from server')
  else if (pathName === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json'});
    res.end(data)
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello emma'
    });
    res.end('<h1>Page not found!</h1>')
  }
})

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening on 8000');
})