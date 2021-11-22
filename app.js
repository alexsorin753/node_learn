// const http = require('http');

// const hostname = '127.0.0.1'
// const port = 3000

// const server = http.createServer((req, res) => {
//     res.statusCode = 200
//     res.setHeader('Content-Type', 'text/plain')
//     res.end('Hello World\n')
// });

// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}`)
// });


// // exit program after 10 seconds
// setTimeout(() => {
//     process.exitCode = 1;
//     process.exit(1)
// }, 10000);


require('dotenv').config(); // or use in cmd: node -r dotenv/config app.js;

const express = require('express');
const app = express();

process.env.v8 = 'local enviornamental variable - assigned using process.env';

app.get('/', (req, res) => {
    res.send('Hello World')
});

app.listen(process.env.port, () => console.log(`Server ready - http://${process.env.host}:${process.env.port}/`));

setTimeout(() => {
    console.log(process.env.USER_ID)
    console.log(process.env.USER_KEY)
    console.log(process.env.v8)
    process.kill(process.pid, 'SIGTERM');
}, 1000);

