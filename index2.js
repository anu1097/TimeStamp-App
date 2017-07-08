var express = require('express')
var app = express()
var moment = require('moment')
var path = require('path')
// var cool = require('cool-ascii-faces');

app.listen(process.env.PORT || 5000), function(err){
    if(err){
        throw err
    }
})

app.get('/', function(req, res){
    var fileName = path.join(__dirname,'index.html')
    res.sendFile(fileName, function(err){
        if(err){
            console.error(err)
            res.setHeader(401)
            // res.status(err.status).end();
        }
        else {
            console.log('Sent:', fileName);
        }
    })
})

app.get("/:datestring", function(req, res){
    var time 
    if(/^\d{8,}$/.test(req.params.datestring)){
        time = moment(req.params.datestring,'X')
    }
    else{
        time = moment(req.params.datestring, "MMMM D, YYYY")
    }
    if(time.isValid){
        res.json({
            unixtime : time.format("X"),
            normal_time: time.format("MMMM D, YYYY")
        })
    }
    else{
        res.json({
            unixtime : null,
            normal_time: null
        })
    }

})

// app.get('/cool', function(request, response) {
//   response.send(cool());
// });

// app.get('/times', function(request, response) {
//     var result = ''
//     var times = process.env.TIMES || 5
//     for (i=0; i < times; i++)
//       result += i + ' ';
//   response.send(result);
// });


