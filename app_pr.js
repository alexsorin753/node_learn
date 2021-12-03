// https://nodejs.dev/learn/an-introduction-to-the-npm-package-manager#running-tasks
const {port, host} = require('./config_env');

const express = require('express');
const app = express();
const chalk = require('chalk');
const path = require('path');
const pug = require('pug');



// static files - https://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))
// app.use('/static', express.static('public'));
// app.use('/static', express.static(path.join(__dirname, 'public')))

// view engine setup - https://expressjs.com/en/guide/using-template-engines.html
app.set('views', './views');
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('test', { pageTitle: 'Express' });
});

app.listen(port, () => console.log(`${chalk.green('Server ready')} - http://${host}:${port}/`));