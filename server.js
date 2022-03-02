require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const router = express.Router();
const getWhyNextReasons = require('./lib/api')
router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/html/index.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/about',function(req,res){
    res.sendFile(path.join(__dirname+'/html/about.html'));
});

router.post('/rsvp',jsonParser, function(req,res){
    const name = req.body.name;
    const email = req.body.email;
    getWhyNextReasons(name, email);
    res.status(200)
    res.send({status:true, name })
});

//add the router
app.use('/', router);
app.use(express.static(__dirname + '/html'));
app.use(express.json());

app.listen(process.env.port || 3000);

console.log('Running at Port 3000');