var express = require('express');  
var path = require("path");   
var bodyParser = require('body-parser');  
var mongo = require("mongoose");  

var crypto = require('crypto');

var db = mongo.connect("mongodb://localhost:27017/orderingRestaurant", function(err, response){  
   if(err){ console.log( err); }  
   else{ console.log('Connected to ' + db, ' + ', response); }  
});
     
var app = express()  
app.use(bodyParser.json({limit:'5mb'}));   
app.use(bodyParser.urlencoded({extended:true}));  
   
  
app.use(function (req, res, next) {        
     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');    
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
     res.setHeader('Access-Control-Allow-Credentials', true);       
     next();  
 });  
  
 var Schema = mongo.Schema;  
  
var UsersSchema = new Schema({      
 name: { type: String   },       
 address: { type: String   },   
},{ versionKey: false });  
   
  
var model = mongo.model('users', UsersSchema, 'users');  
  
app.post("/api/SaveUser",function(req,res){   
 var mod = new model(req.body);  
 if(req.body.mode =="Save")  
 {  
    mod.save(function(err,data){  
      if(err){  
         res.send(err);                
      }  
      else{        
          res.send({data:"Record has been Inserted..!!"});  
      }  
 });  
}  
else   
{  
 model.findByIdAndUpdate(req.body.id, { name: req.body.name, address: req.body.address},  
   function(err,data) {  
   if (err) {  
   res.send(err);         
   }  
   else{        
          res.send({data:"Record has been Updated..!!"});  
     }  
 });  
  
  
}  
 })  
  
  var regSchema = new mongo.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  hash: String,
  salt: String
});
  
  regSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};
  
  //req.body.password
  
  /*
  module.exports.register = function(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(function(err) {
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
  });

};
  */
  
  // funzionalità per inserimento nuovo utente 
  // come generare la password?
    app.post("/api/InsUser",function(req,res){   
		 var newUser = new regSchema(req.body);  
		 if(req.body.mode =="register")  
		 {  
	 
			newUser.setPassword(req.body.password);
	 
			newUser.save(function(err,data){  
			  if(err){  
				 res.send(err);                
			  }  
			  else{        
				  res.send({data:"Record has been Inserted..!!"});  
			  }  
			});  
		}  
		/*
		else   
		{  
		 model.findByIdAndUpdate(req.body.id, { name: req.body.name, address: req.body.address},  
		   function(err,data) {  
		   if (err) {  
		   res.send(err);         
		   }  
		   else{        
				  res.send({data:"Record has been Updated..!!"});  
			 }  
		 });  
		  
		  
		} 
		*/		
	})
  
 app.post("/api/deleteUser",function(req,res){      
    model.remove({ _id: req.body.id }, function(err) {    
     if(err){    
         res.send(err);    
     }    
     else{      
            res.send({data:"Record has been Deleted..!!"});               
        }    
 });    
   })    
  
 app.get("/api/getUser",function(req,res){  
    model.find({},function(err,data){  
              if(err){  
                  res.send(err);  
              }  
              else{                
                  res.send(data);  
                  }  
          });  
  })  
  
  
app.listen(8080, function () {  
    
 console.log('Example app listening on port 8080!')  
})