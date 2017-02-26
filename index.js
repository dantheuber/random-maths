
'use strict';

var path = require('path');
var express = require('express');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(80, function() {
  console.log('Listening on port 80!');
});

