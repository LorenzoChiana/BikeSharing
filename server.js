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
})

var BikeSchema = new Schema({      
 codice: { type: String, required: true },       
 latitudine: { type: Number, required: true },   
 longitudine: { type: Number, required: true },
 stato: { type: String },
 rack: { type: String },
 totKm: { type: Number }, 
},{ versionKey: false });    
	 
var modelBike = mongo.model('bikes', BikeSchema, 'bikes'); 
  
app.get("/api/getAllBike", function(req,res) {  
	modelBike.find({},function(err,data){  
		if(err){  
			res.send(err);  
		}  
		else{     		
			res.send(data);  
		}  
	})  
})
  
app.post("/api/getBike", function(req,res) {
	modelBike.findById(req.body._id, function(err, data) {    
		if(err){    
			res.send(err);    
		}    
		else{	
			res.send(data);                 
		}    
	})
})
  
app.post("/api/getRackBike", function(req,res) {
	modelBike.find({ $and: [ {stato: { $eq: "libero" }}, {rack: req.body.rackCode} ] },function(err,data){
		if(err){  
			res.send(err);  
		}  
		else{
			res.send(data);  
		}  
	})  
})

app.post("/api/getUseBike", function(req,res) {
	modelBike.find({ $and: [ {stato: { $ne: "libero" }}, {rack: req.body.rackCode} ] },function(err,data){
		if(err){  	
			res.send(err);  
		}  
		else{
			res.send(data);  
		}  
	})  
})

// tutte le bici di quel rack
app.post("/api/getRackBikeAll", function(req,res) {
	modelBike.find({rack: req.body.rackCode},function(err,data){
		if(err){  
			res.send(err);  
		}  
		else{
			res.send(data);  
		}  
	})  
})

app.post("/api/getUserBike", function(req,res) {  
	modelBike.find({stato: req.body.stato},function(err,data){  
		if(err){  
			res.send(err);  
		}  
		else{     		
			res.send(data);  
		}  
	})  
})
  

app.post("/api/SaveBike/",function(req,res) {   
 var mod = new modelBike({codice: req.body.codice,
							latitudine: req.body.latitudine, longitudine: req.body.longitudine,
							rack: req.body.rack, stato: req.body.stato, totKm: req.body.totKm});
							
    mod.save(function(err,data){  
      if(err) {  
         res.send(err);                
      } else {    
         res.send({data:"Record has been Inserted..!!"});  
      }  
	});  
})

app.post("/api/UpdateBike/",function(req,res) {
	modelBike.findByIdAndUpdate(req.body._id, { codice: req.body.codice, 
							latitudine: req.body.latitudine, longitudine: req.body.longitudine,
							stato: req.body.stato, rack: req.body.rack, totKm: req.body.totKm},  
   function(err,data) {
	   if (err) {  
		res.send(err);         
	   }  
   else{        
		  res.send({data:"Record has been Updated..!!"});  
	 }  
 });
})

app.post("/api/deleteBike", function(req,res) {      
	modelBike.remove({ _id: req.body._id }, function(err) {    
		if(err){    
			res.send(err);    
		}    
		else{      
			res.send({data:"Record has been Deleted..!!"});               
		}    
	})    
})

app.post("/api/modifyStateBike", function(req,res) {      
	modelBike.findByIdAndUpdate(req.body._id, { stato: req.body.stato, rack: req.body.rack }, function(err) {    
		if(err){    
			res.send(err);    
		}    
		else{
			res.send({data:"Stato bici modificato"});               
		}    
	})    
})

var RackSchema = new Schema({      
 codice: { type: String, required: true },       
 latitudine: { type: Number, required: true },   
 longitudine: { type: Number, required: true },
 indirizzo: { type: String, required: true },
 numBike: { type: Number, required: true },
 numPlace: { type: Number, required: true },
},{ versionKey: false });    
	 
var modelRack = mongo.model('rackes', RackSchema, 'rackes'); 
 

app.get("/api/getAllRack", function(req,res) { 
	modelRack.find({},function(err,data){  
		if(err){  
			res.send(err);  
		}  
		else{     		
			res.send(data);  
		}  
	})  
})
  
app.post("/api/getRack", function(req,res) {      
	modelRack.findById(req.body._id, function(err, data) {    
		if(err){    
			res.send(err);    
		}    
		else{
			res.send(data);                 
		}    
	})    
})

app.post("/api/getRackByCode", function(req,res) {      
	modelRack.find({codice: req.body.codeRack}, function(err,data){
		if(err){    
			res.send(err);    
		}    
		else{
			res.send(data);                 
		}    
	})    
})

app.post("/api/SaveRack/",function(req,res) { 
	var mod = new modelRack({codice: req.body.codice,
							latitudine: req.body.latitudine, longitudine: req.body.longitudine, 
							indirizzo: req.body.indirizzo, numBike: req.body.numBike, 
							numPlace: req.body.numPlace});  
	  mod.save(function(err,data){  
		  if(err) {  
			 res.send(err);                
		  } else {   
			 res.send({data:"Record has been Inserted..!!"});  
		  }  
	});
})  

app.post("/api/UpdateRack/",function(req,res) {		
	modelRack.findByIdAndUpdate(req.body._id, { codice: req.body.codice,
								latitudine: req.body.latitudine, longitudine: req.body.longitudine, 
								indirizzo: req.body.indirizzo, numBike: req.body.numBike, numPlace: req.body.numPlace},  
	function(err,data) {
		if (err) {  
			res.send(err);         
		}  
		else{ 
		  res.send({data:"Record has been Updated..!!"});  
		}  
	});
})

app.post("/api/deleteRack", function(req,res) {      
	modelRack.remove({ _id: req.body._id }, function(err) {    
		if(err){    
			res.send(err);    
		}    
		else{      
			res.send({data:"Record has been Deleted..!!"});               
		}    
	})    
})

var RentSchema = new Schema({ 
 data: { type: String, required: true },   
 nameUser: { type: String, required: true }, 
 codeBike: { type: String, required: true },
 timeInit: { type: String, required: true },       
 timeEnd: { type: String },
 fromRack: { type: String },
 toRack: { type: String },
 totKm: { type: Number, required: true },
 tempo: { type: Number, required: true },
 costo: { type: Number, required: true },
},{ versionKey: false });    
	 
var modelRent = mongo.model('rent', RentSchema, 'rent'); 

app.post("/api/getUserRent", function(req,res) {  
	modelRent.find({nameUser: req.body.nomeUtente}, function(err,data){
	 if (err) {
		 next(err);
	 } else {
		 res.send(data);
	 }
 })    
})

app.post("/api/getBikeRent", function(req,res) {
	modelRent.find({ $and: [ {nameUser: req.body.nomeUtente}, {codeBike: req.body.codeBike},
							 {timeEnd: req.body.timeEnd} ] }
		,function(err,data){
	 if (err) {
		 next(err);
	 } else {
		 res.send(data);
	 }
 })    
})
app.get("/api/getAllRent", function(req,res) {  
	modelRent.find({},function(err,data){  
		if(err){  
			res.send(err);  
		}  
		else{
			res.send(data);  
		}  
	})  
})

app.post("/api/SaveRent/",function(req,res) {
	var mod = new modelRent({data: req.body.data,
							nameUser: req.body.nameUser, codeBike: req.body.codeBike, 
							timeInit: req.body.timeInit, timeEnd: req.body.timeEnd,
							fromRack: req.body.fromRack, toRack: req.body.toRack, totKm: req.body.totKm,
							tempo: req.body.tempo, costo: req.body.costo});  
	mod.save(function(err,data) {
		if (err) {  
			res.send(err);         
		}  
		else{
		  res.send({data:"Record has been Inserted..!!"});  
		}  
	});  
})

app.post("/api/UpdateRent/",function(req,res) {		
	modelRent.findByIdAndUpdate(req.body._id, { data: req.body.data,
								nameUser: req.body.nameUser, codeBike: req.body.codeBike, 
								timeInit: req.body.timeInit, timeEnd: req.body.timeEnd,
								fromRack: req.body.fromRack, toRack: req.body.toRack, totKm: req.body.totKm,
								tempo: req.body.tempo, costo: req.body.costo},  
	function(err,data) {
		if (err) {  
			res.send(err);         
		}  
		else{ 
		  res.send({data:"Record has been Updated..!!"});  
		}  
	});
})

app.post("/api/deleteRent", function(req,res) {      
	modelRent.remove({ _id: req.body._id }, function(err) {    
		if(err){    
			res.send(err);    
		}    
		else{      
			res.send({data:"Record has been Deleted..!!"});               
		}    
	})    
})

app.post("/api/modifyStateRent", function(req,res) {      
	modelRent.findByIdAndUpdate(req.body._id, { timeInit: req.body.timeInit }, { timeEnd: req.body.timeEnd },
	function(err) {    
		if(err){    
			res.send(err);    
		}    
		else{      
			res.send({data:"Stato rent modificato"});               
		}    
	})    
})

var CommentSchema = new Schema({ 
 data: { type: String, required: true },   
 nameUser: { type: String, required: true }, 
 codeBike: { type: String, required: true },
 testo: { type: String },
 icona: { type: String },
},{ versionKey: false });
  
var modelComment = mongo.model('comments', CommentSchema, 'comments'); 
	
app.post("/api/SaveComment/",function(req,res) {
	var mod = new modelComment({data: req.body.data,
							nameUser: req.body.nameUser, codeBike: req.body.codeBike, 
							testo: req.body.testo, icona: req.body.icona}); 
					
	mod.save(function(err,data) {
		if (err) {  
		  res.send(err);         
		}  
		else{
		  res.send({data:"Record has been Inserted..!!"});  
		}  
	});  
})
  
app.get("/api/getAllComment", function(req,res) {
	modelComment.find({},function(err,data){  
		if(err){  
			res.send(err);  
		}  
		else{
			res.send(data);  
		}  
	})  
})
  
app.post("/api/getBikeComment", function(req,res) {
	modelComment.find({codeBike: req.body.codeBike}
			,function(err,data){
		 if (err) {
			 next(err);
		 } else {
			 res.send(data);
		 }
	})    
})
  
app.listen(8080, function () {  
 console.log('Example app listening on port 8080!')
})