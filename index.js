const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const postsApi = require('./server/posts');
const loginApi = require('./server/login');

app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cookieParser());
app.use(postsApi);
app.use(loginApi);

const db = 'mongodb+srv://admin:admintechni123@cluster0.zfvtf.mongodb.net/techni?retryWrites=true&w=majority';

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
  console.log('Connected with database');
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server up and running on port ${process.env.PORT || 8080}`);
});

//npm i http=proxy-middleware -s 
//npm i mongoose -s
