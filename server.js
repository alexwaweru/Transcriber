const express    = require('express');
const cloudinary = require('cloudinary');
const bodyParser = require('body-parser')();
const fileParser = require('connect-multiparty')();
const path = require("path");
const multer = require("multer");
const upload = multer();
const credentials = require("./credentials");
const port = Number(process.env.PORT || 5000);
var fs = require("fs");


cloudinary.config({
  cloud_name: credentials.cloud_name,
  api_key:    credentials.api_key,
  api_secret: credentials.api_secret
});

var app = express();
app.use(express.static(__dirname + '/public'));

/**
 * Middleware
 */
app.use( bodyParser );

/**
 * Index page
 */

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/public/html/signup.html'));
});

app.get('/dashboard',function(req,res){
  res.sendFile(path.join(__dirname+'/public/html/dashboard.html'));
});

app.get('/login',function(req,res){
  res.sendFile(path.join(__dirname+'/public/html/login.html'));
});

app.get('/note',function(req,res){
  res.sendFile(path.join(__dirname+'/public/html/index.html'));
});



app.post('/upload', upload.any(), function(req, res){
  console.log(req);
  var imageFile = req.files.image;  //TOD: Get file to send from client side
  var filename = imageFile.name;
  
  cloudinary.uploader.upload(imageFile.path, function(result){
    if (result.url) {
      /*
       * TODO: save url to database to and display later.
       */
      
      res.json(200, {url: result.url});
    } else {
      /*
       * There was an error and the file did not upload.
       */

      console.log('Error uploading to cloudinary: ',result);
      res.send('did not get url');
    }
  }, 
  {
    public_id: filename,
    resource_type: "raw",
    raw_convert: "aspose"
  });
});

// 404
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname+'/public/html/404.html'));
  // res.status(404).send("Sorry can't find that!")
});

// 500
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

app.listen(port, () => {
  console.log(`App running at http://localhost:5000`)
});