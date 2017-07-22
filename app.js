var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

var login = require('./public/js/login'); 
var register = require('./public/js/register'); 
var getEquipmentInfo = require('./public/js/getEquipmentInfo'); 

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'build')));


app.post('/api/login',login.verify);
app.post('/api/register',register.addNewUser);
app.post('/api/getEquipmentList',getEquipmentInfo.getEquipmentList);
app.post('/api/addEquipment',getEquipmentInfo.addEquipment);

app.listen(3000);
console.log('Server is running..');