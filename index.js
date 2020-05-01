const express = require('express')
const app = express()
const port = 3000

app.use(express.static('portfolio'))
app.get('/', (req,res) => res.sendFile( __dirname + '/portfolio/index.html'))

var fs = require('fs');
var arr = fs.readFileSync('users.txt').toString().split("\n");
var flags = fs.readFileSync('flags.txt').toString().split("\n");

app.get('/users/get', function(req, res) {
  str = ""
  for(i in arr){
      str = str + arr[i] + "<br>"
  }
  res.send(str)
});

app.get('/users/add/:user/:pass', function(req, res) {
  s=req.params.user + " " + req.params.pass
  arr.push(s)
  res.send("Success... Added " + s)
});

app.get('/users/remove', function(req, res) {
  arr.pop()
  res.send("Success")
});


app.get('/status', function(req, res) {
  if(arr.length == 0){
    res.send(flags[0])
  }else if(arr.length > 200){
    res.send(flags[1])
  }else{
    res.send(arr.length.toString())
  }
});

app.listen(port, () => console.log(`App listening at http://locahost:${port}`))
