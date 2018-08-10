var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'public'))); //  "public" off of current is root

// viewed at http://localhost:3000
app.get('/', function(req, res) {
    res.sendFile(path.join('index.html'));
});


app.listen(3000, function () {
  console.log('Levantando en el puerto 3000!');
});
