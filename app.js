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
// -----------------

// with dotenv required inside file
// require('dotenv').config(); // or use in cmd: node -r dotenv/config app.js;
// const port = process.env.port;
// const host = process.env.host;

// inport external module that contain the dotenv variable
// const ex_env = require('./config_env'); // inporting module that contain the enviornamental variable
// const port = ex_env.port;
// const host = ex_env.host;

// you can use the destructuring to pull out what you need
const {port, host} = require('./config_env');


const express = require('express');
const app = express();

process.env.v8 = 'local enviornamental variable - assigned using process.env';


app.get('/', (req, res) => {
    res.send('Hello World')
});

app.listen(port, () => console.log(`Server ready - http://${host}:${port}/`));

//https://nodejs.dev/learn/nodejs-accept-arguments-from-the-command-line
const args = process.argv.slice(2);
const args_min = require('minimist')(process.argv.slice(2));

//https://nodejs.dev/learn/output-to-the-command-line-using-nodejs
const doSomething = () => console.log('test')
const mesureDoingSomething = () => {
    console.time('doSomething()')
    doSomething()
    console.timeEnd('doSomething()')
}
mesureDoingSomething()

setTimeout(() => {
    console.log(process.env.USER_ID)
    console.log(process.env.USER_KEY)
    console.log(process.env.v8)
    
    args.forEach((val, index) => {
        console.log(`${index}: ${val}`)
    });
    console.log(args_min['name']);


    process.kill(process.pid, 'SIGTERM');

}, 1000);

