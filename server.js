var express = require('express');  
var path = require("path");   
var bodyParser = require('body-parser');  
var mongo = require("mongoose");  

var crypto = require('crypto');

var db = mongo.connect("mongodb://localhost:27017/bikeSharing", function(err, response){  
   if(err){ console.log(err); }  
   else{ console.log('Connected to ' + db, ' + ', response); }  
});
     
var app = express();  
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
  
var UserBikeSchema = new Schema({      
 nomeUtente: { type: String, required: true },       
 passwordUtente: { type: String, required: true },
 tipoUtente: { type: String },
 // admin: { type: Boolean },
},{ versionKey: false });

var modelUser = mongo.model('usersBike', UserBikeSchema, 'usersBike');

app.post("/api/SaveUser/",function(req,res) {	
 var modUser = new modelUser(req.body);  
 //if(req.body.mode =="Save") {  
    modUser.save(function(err,data) {  
      if(err) {  
         res.send(err);                
      } else {
         res.send({data:"new User has been Inserted..!!"});  
      }  
	}); 
	/*	
	} else {
		model.findByIdAndUpdate(req.body.id, { nome: req.body.nome, 
								latitudine: req.body.latitudine, longitudine: req.body.longitudine},  
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

app.get("/api/getAllUser", function(req,res) {  
	modelUser.find({}, function(err,data){  
		if(err){  
			res.send(err);  
		}  
		else{ 
			res.send(data);  
		}  
	})  
})

app.post("/api/FindUser/", function(req,res) {	
 var findUser = new modelUser(req.body);  
 modelUser.findOne({nomeUtente : findUser.nomeUtente}, function (err, data) {
	 if (err) {
		 next(err);
	 } else {
		 res.send(data);
	 }
 })
})
  
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
  /*
    app.post("/api/InsBike",function(req,res){   
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
	*/

var BikeSchema = new Schema({      
 nome: { type: String, required: true },       
 latitudine: { type: Number, required: true },   
 longitudine: { type: Number, required: true },
 stato: { type: String }
},{ versionKey: false });    
	 
var model = mongo.model('bikes', BikeSchema, 'bikes'); 
  
app.post("/api/SaveBike/",function(req,res) {   
 var mod = new model(req.body);  
 if(req.body.mode =="Save") {  
    mod.save(function(err,data){  
      if(err) {  
         res.send(err);                
      } else {    
         res.send({data:"Record has been Inserted..!!"});  
      }  
	});  
} else {
	model.findByIdAndUpdate(req.body.id, { nome: req.body.nome, 
							latitudine: req.body.latitudine, longitudine: req.body.longitudine,
							stato: req.body.stato},  
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

app.post("/api/deleteBike", function(req,res) {      
	model.remove({ _id: req.body.id }, function(err) {    
		if(err){    
			res.send(err);    
		}    
		else{      
			res.send({data:"Record has been Deleted..!!"});               
		}    
	})    
})

app.post("/api/modifyStateBike", function(req,res) {      
	model.findByIdAndUpdate(req.body.id, { stato: req.body.stato }, function(err) {    
		if(err){    
			res.send(err);    
		}    
		else{      
			res.send({data:"Stato bici modificato"});               
		}    
	})    
})
  
app.get("/api/getAllBike", function(req,res) {  
	model.find({},function(err,data){  
		if(err){  
			res.send(err);  
		}  
		else{     		
			res.send(data);  
		}  
	})  
})
  
app.listen(8080, function () {  
 console.log('Example app listening on port 8080!')
})