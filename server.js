const express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary');
const bodyParser = require('body-parser')();
const fileParser = require('connect-multiparty')();
const path = require("path");
const multer = require("multer");
const upload = multer();
const credentials = require("./credentials");
const Document = require("./document");
const port = Number(process.env.PORT || 8000);

cloudinary.config({
    cloud_name: credentials.cloud_name,
    api_key: credentials.api_key,
    api_secret: credentials.api_secret
});

mongoose.connect("mongodb://mustapha:mIccS155pL5KNhWr@oralnotes-shard-00-00-1dlzq.mongodb.net:27017,oralnotes-shard-00-01-1dlzq.mongodb.net:27017,oralnotes-shard-00-02-1dlzq.mongodb.net:27017/test?ssl=true&replicaSet=oralnotes-shard-0&authSource=admin&retryWrites=true", { useNewUrlParser: true });

var corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: true,
    optionsSuccessStatus: 200
}

var app = express();
app.use(express.static(__dirname + '/public'));

/**
 * Middleware
 */
app.use(bodyParser);

/**
 * Index page
 */

app.get('/', cors(corsOptions), function(req, res) {
    res.sendFile(path.join(__dirname, '/public/html/signup.html'));
});

app.get('/dashboard', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/html/dashboard.html'));
});

app.post('/dashboard', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/html/dashboard.html'));
});

app.post('/login', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/html/login.html'));
});

app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/html/login.html'));
});

app.get('/note', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/html/index.html'));
});



app.post('/upload', fileParser, function(req, res) {
    var file = req.files.image; //TOD: Get file to send from client side
    var filename = file.originalFilename;

    cloudinary.uploader.upload(file.path, function(result) {
        if (result.url) {
            /*
             * TODO: save url to database to and display later.
             */
            const document = new Document({
                _id: new mongoose.Types.ObjectId(),
                name: filename,
                url: result.url
            });
            document.save().then(results => {
                console.log("Uploaded ");
            }).catch(err => {
                console.error("Error occured " + err);
            });

            res.sendFile(path.join(__dirname, '/public/html/dashboard.html'));

        } else {
            /*
             * There was an error and the file did not upload.
             */

            console.log('Error uploading to cloudinary: ', result);
            res.send('did not get url');
        }
    }, {
        public_id: filename,
        resource_type: "raw",
        raw_convert: "aspose"
    });
});

app.get('/documents', function(req, res) {
    Document.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                message: "Error occured",
                error: err
            })
        });
});

// 404
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '/public/html/404.html'));
    // res.status(404).send("Sorry can't find that!")
});

// 500
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

app.listen(port, () => {
    console.log(`App running at http://localhost:8000`)
});