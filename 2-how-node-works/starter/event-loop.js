const fs = require('fs');
const crypto = require('crypto')

const start = Date.now()
process.env.UV_THREADPOOL_SIZE = 4;

setTimeout(() =>  console.log('setTimeout1'), 0);
setImmediate(() => console.log('setImmediate1'))

fs.readFile('test-file.txt', () =>  {
  console.log('I/O')
  console.log('------ top level code ends ----');

  setTimeout(() =>  console.log('setTimeout2'), 0);
  setTimeout(() =>  console.log('setTimeout3'), 3000);
  setImmediate(() => console.log('setImmediate2'))

  process.nextTick(()=>console.log('Process.nextTick'))

  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512')
  console.log(Date.now() - start, 'crypto');

  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512')
  console.log(Date.now() - start, 'crypto');

  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512')
  console.log(Date.now() - start, 'crypto');

  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512')
  console.log(Date.now() - start, 'crypto');

})

console.log('top-level code');

