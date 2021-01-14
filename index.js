var express = require('express');
var bodyParser = require("body-parser");

var app = express();

var task = ["buy socks", "practise with nodejs"];
var complete = ["finish jquery"];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(3000, function() {
    console.log('Example app listening on port 3000')
});

app.get('/', function(req, res) {
    res.render('index', { tas: task, complete: complete });
});

app.post('/addtask', function(req, res) {
    var newTask = req.body.newtask;
    task.push(newTask);

    res.redirect("/");
});

app.post("/removetask", function(req, res) {
    var completeTask = req.body.check;

    //check for the "typeof" the different completed task, then add into the complete task
    if (typeof completeTask === "string") {
        complete.push(completeTask);
        //check if the completed task already exist in the task when checked, then remove using the array splice method
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("/");
});