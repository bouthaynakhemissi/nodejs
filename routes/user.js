const express = require('express');
const router = express.Router();
const User = require('../models/users'); // Assuming you have a User model in '../models/users'
const bodyParser = require('body-parser');

// Use body-parser middleware to parse request bodies
router.use(bodyParser.urlencoded({ extended: true }));

// Insert a user into the database route
router.post('/add', async (req, res) => {
    try {
        console.log(req.body)
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
        });

        // Save the user using async/await
        await user.save();
console.log(user);
        // If successful, set the session message
        req.session.message = {
            type: 'success',
            message: 'User added successfully!',
        };

        // Redirect to the home page
        res.redirect('/add'); // Change to '/users' to match the route for getting all users
    } catch (err) {
        // Handle errors and respond with JSON
        res.json({ message: err.message, type: 'danger' });
    }
});

//Get all users
router.get('/users', async (req, res) => {
    try {
        // Utilisation de async/await pour une meilleure gestion des promesses
        const users = await User.find().exec();

        // Rendre la page avec les utilisateurs récupérés
        res.render('index', {
            title: 'Home Page',
            users: users,
        });
    } catch (err) {
        // Gestion des erreurs et renvoi d'une réponse JSON
        res.status(500).json({ message: err.message });
    }
});



module.exports = router;