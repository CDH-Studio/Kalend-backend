const express = require('express');
const path = require('path');
const index = require('./routes/index');
const middlewareConfig = require('./config/middlewares');
const helperServer = require('./helper');
const app = express();
const port = 8080;

//Middleware
middlewareConfig(app);

//views
app.set('views',  path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Routes
app.use('/', index);

app.listen(port, () => {
	console.log('Server running on port', port);
});


setInterval(() => {
	helperServer.updateUsersData();
}, 10000);


