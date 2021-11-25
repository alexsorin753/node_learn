// imported env variables from module
const {port, host, user_id, user_key} = require('./config_env');

const express = require('express');
const app = express();
const chalk = require('chalk');
const ProgressBar = require('progress');

process.env.v8 = 'local enviornamental variable - assigned using process.env';


app.get('/', (req, res) => {
    res.send('Hello World')
});

app.listen(port, () => console.log(`Server ready - http://${host}:${port}/`));

//https://nodejs.dev/learn/nodejs-accept-arguments-from-the-command-line
const args = process.argv.slice(2); // use 'key=value' in cmd
const args_min = require('minimist')(process.argv.slice(2)); // use '--key=value' in cmd

//https://nodejs.dev/learn/output-to-the-command-line-using-nodejs


const doSomething = () => {
    let num = 0;
    for(let e = 0; e < 3000; e++) {
        num++;
        console.log(num)
    }
};
const measureDoingSomething = () => {
    console.time(chalk.green('doSomething'));
    doSomething()
    console.timeEnd(chalk.green('doSomething'));
}


const bar = new ProgressBar(':bar', { total: 10})
const timer = setInterval(() => {
    bar.tick();
    if(bar.complete) {
        clearInterval(timer)
    }
}, 300)


setTimeout(() => {
    measureDoingSomething();
    console.log(process.env.v8);

    args.forEach((val, index) => {
        console.log(`${index}: ${val}`)
    });
    console.log(args_min['name']);
    
    console.log(`${chalk.yellow('Exit user:')} ${user_id} ${chalk.yellow(' key:')} ${user_key}`)

    process.kill(process.pid, 'SIGTERM');
}, 1000);

