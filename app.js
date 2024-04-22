const dotenv = require ("dotenv");
dotenv.config();
const express = require ("express");
const mongoose =require("mongoose")
const session =require ("express-session");
const userroute = require('./routes/user')

const app =express();
const PORT =process.env.PORT ;
//database connection

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log('connected to the database');
    app.listen(PORT,()=>{
        console.log('Server is running on port 3001...')
    });
  
}).catch(err=>{
    console.log('Error connecting to database:',err.message)
})


app.get('/add', (req, res) => {
    res.render('add_users', { title: "Add users" });
}); 
app.post('/add', (req, res) => {
    const data = req.body;
    res.sendStatus(200);
  }); 
  app.get('/users', function(req, res) {
    let message = {
        type: 'success',
        message: 'Ceci est un message de succès.'
    };
    // Rendre la vue en passant la variable message
    res.render('index', { message: message });
});
app.get('/', function(req, res) {
    let title = 'Titre de votre page';
    res.render('index', { title: title });
});
  app.get('/users', (req, res) => {
    // Get the list of users from the database or an array
    res.render('index', { title: "Home" });
  
    // Send the list of users back to the client
    res.json(users);
  }); 


//middlwares
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(session({
    secret:"my secret key",
    saveUninitialized:true,
    resave :false ,
})) ;
//router prefix
app.use("/api/auth",require("./routes/user"));
app.use((req,res,next) =>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

app.use(express.static("uploads"));
//set templetes engine 
app.set("view engine","ejs");

app.use('/auth',userroute);


module.exports = app;
 
 
