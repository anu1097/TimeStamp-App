var express = require('express')
var app = express()
var moment = require('moment')
var path = require('path')

app.listen(3000, function(err){
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