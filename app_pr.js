// https://nodejs.dev/learn/an-introduction-to-the-npm-package-manager#running-tasks
const {port, host} = require('./config_env');

const express = require('express');
const app = express();
const chalk = require('chalk');
const path = require('path');
const pug = require('pug');

// view engine setup
app.set('../views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('test', { pageTitle: 'Express' });
});

app.listen(port, () => console.log(`${chalk.green('Server ready')} - http://${host}:${port}/`));