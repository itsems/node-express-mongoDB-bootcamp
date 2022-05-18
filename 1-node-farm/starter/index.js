const fs = require('fs')

// Blocking, sync way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
// console.log(textIn);
// const textOut = `this is ${textIn} \n asdfasdf ${Date.now()}`
// fs.writeFileSync('./txt/output.txt', textOut)

// Non-blocking, async way
fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
  console.log(data);
})
console.log('will read file!');