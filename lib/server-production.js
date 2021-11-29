// https://nodejs.dev/learn/an-introduction-to-the-npm-package-manager#running-tasks
const {port, host} = require('../config_env');

const express = require('express');
const app = express();
const chalk = require('chalk');

app.get('/', (req, res) => {
    res.send('Hello World')
});

app.listen(port, () => console.log(`${chalk.green('Server ready')} - http://${host}:${port}/`));