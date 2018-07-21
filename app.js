var  express =require('express');
var bodyParser =require('body-parser');
var path=require('path');
var mongojs = require('mongojs')
var db = mongojs('customerapp', ['users']);



var expressValidator=require('express-validator');

var app = express();
//view Engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//set static path


// app.use(express.static(path.join(__dirname,'public')))


//global vars
app.use(function(req,res,next){
    res.locals.errors=null ;
    next();
});

//express validator
app.use(expressValidator());



app.get('/',function(req,res){
// find everything

db.users.find(function (err, docs) {
   if(err){
       console.log('errors'+err);
   }
   
    console.log(docs);
    res.render('index',{
        title:"customer",
        users:docs
    });

})


var title="Customer"
   
});


var users=[{first_name:"babita",last_name:"bisht"},{first_name:"babita",last_name:"bisht"}]

app.post('/users/add',function(req,res){
   // console.log(req.body.first_name);
req.checkBody('first_name','First Name is required').notEmpty();
req.checkBody('last_name','Last Name is required').notEmpty();
req.checkBody('email','email is required').notEmpty();

var errors =req.validationErrors();
if(errors){
console.log('errors'+errors);
errors.forEach(function(err){
console.log(err);
});


db.users.find(function (err, docs) {
     console.log(docs);
     res.render('index',{
         title:"customer",
         users:docs,
         errors:errors
     });
 
 })

// res.render('index',{
//     title:"customer",
//     users:users ,
//     errors:errors
    
// });
}else{
    var newUser = {
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email :req.body.email
    }
    db.users.insert(newUser, function(err,res){
if(err){
console.log(err);
}
else{
   console.log('success');
}

    });
    res.redirect('/');
}

console.log('success');
});

app.listen(3001,function(){

console.log('Server  started at port 3001')

});