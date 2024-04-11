require ("dotenv").config();
const express = require ("express");
const mongoose =require("mongoose")
const session =require ("express-session");

const app =express();
const PORT =process.env.PORT ||3000 ;
//database connection
const DB_URL=process.env.DB_URL
mongoose.connect("mongodb+srv://bouthayna123:bouthayna123@cluster0.pth3n.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log('connected to the database')
  
}).catch(err=>{
    console.log('Error connecting to database:',err.message)
})
//middlwares
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(session({
    secret:"my secret key",
    saveUninitialized:true,
    resave :false ,
})) ;

app.use((req,res,next) =>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

app.use(express.static("uploads"));
//set templetes engine 
app.set("view engine","ejs");
 //router prefix
 app.use("",require("./routes/routes"));
 app.listen(3000,()=>{
    console.log('Server is running on port 3000...')
});
