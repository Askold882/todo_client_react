var express = require('express');
var path = require('path');

app = express();
app.use(express.static(__dirname + "/dist"));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

var port = process.env.PORT || 5000;
app.listen(port);

console.log('server started '+ port);