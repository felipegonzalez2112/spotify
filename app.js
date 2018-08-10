var express = require('express');
var request = require('request'); 
var app = express();
var path = require('path');

var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = '4438af57cde94ec29a0ae00a7b195924'; // Your client id
var client_secret = '1446ab31e5754a37ba64468590a9354f'; // Your secret
var redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri

app.use(express.static(path.join(__dirname, 'public'))); //  "public" off of current is root
app.use(cors());
app.use(cookieParser());

// viewed at http://localhost:3000
app.get('/', function(req, res) {
    res.sendFile(path.join('index.html'));
});

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

app.get('/login', function(req, res) {
  console.log('Redirigiendo al login')
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});



app.listen(3000, function () {
  console.log('Levantando en el puerto 3000!');
});
