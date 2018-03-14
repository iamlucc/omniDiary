var express = require("express"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    mongoose = require("mongoose"),
    app = express();
    
// config
mongoose.connect("mongodb://localhost/diaryapp");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));


// DB schema
var diarySchema = new mongoose.Schema({
    title: String,
    image: String,
    content: String,
    date: {type: Date, default: Date.now}
});

var Diary = mongoose.model("Diaryapp", diarySchema);

// for test
// Diary.create({
//     title: "Cheers!",
//     image: "https://images.unsplash.com/photo-1496134732667-ae8d2853a045?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e4dd1c9106a69065ccfa21a36cfb53b1&auto=format&fit=crop&w=1050&q=80",
//     content: "What a nice day!"
// });

// RESTful
// landing
app.get("/", function(req, res){
   res.redirect("/diary");
});

// index
app.get("/diary", function(req, res){
   Diary.find({}, function(err, diaries){
       if(err){
           console.log(err);
       }else{
           res.render("index", {diaries: diaries});
       }
   });
});

// new
app.get("/diary/new", function(req, res){
   res.render("new");
});

// create
app.post("/diary", function(req, res){
    // sanitize 
    req.body.diary.content = req.sanitize(req.body.diary.content);
    // console.log(req.body);
    
    // create a new diary and redierct to index
    Diary.create(req.body.diary, function(err, diaries){
       if(err){
           res.render("new");
       }else{
           res.redirect("/diary");
       }
    });
});

// show
app.get("/diary/:id", function(req, res){
   Diary.findById(req.params.id, function(err, foundDiary){
       if(err){
           res.redirect("/diary");
           console.log(err);
       }else{
           res.render("show", {diary: foundDiary});
       }
   });
});

// edit
app.get("/diary/:id/edit", function(req, res){
    Diary.findById(req.params.id, function(err, foundDiary){
      if(err){
          res.redirect("/diary");
          console.log(err);
      }else{
          res.render("edit", {diary: foundDiary});
      }
    });
});

// update
app.put("/diary/:id", function(req, res){
    // sanitize
    req.body.diary.content = req.sanitize(req.body.diary.content);
    
    // updata a specific diary and redirect to updated version
    Diary.findByIdAndUpdate(req.params.id, req.body.diary,function(err, updatedDiary){
      if(err){
          res.redirect("/diary");
          console.log(err);
      }else{
          res.redirect("/diary/" + req.params.id);
      }
    });
});

// delete
app.delete("/diary/:id", function(req, res){
   // remove the specific diary and redirect to index
   Diary.findByIdAndRemove(req.params.id,function(err, updatedDiary){
      if(err){
          res.redirect("/diary");
          console.log(err);
      }else{
          res.redirect("/diary");
      }
    });
});

// listen
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Diary has worked!"); 
});
