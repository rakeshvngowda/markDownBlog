const express = require('express');
const app = express();
const bycrypt = require('bcrypt');
const passport = require('passport')

const initializePassport = require('./passport-config')
initializePassport(passport)

app.set('view engine','ejs');
app.use(express.urlencoded({ extended: true }))

let users = []

app.get('/',(req,res)=> {
    res.render('index')
})

app.get('/login',(req,res)=> {
    res.render('login')
})

app.post('/login',(req,res)=> {
    
})

app.get('/register', (req,res)=> {
    res.render('register')
})

app.post('/register',async (req,res)=> {
    try {
        let hasPassword = await bycrypt.hash(req.body.password,10)
        users.push({
            id:Date.now().toString(),
            name:req.body.name,
            email:req.body.email,
            password:hasPassword
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
    console.log(users);
})

app.listen(process.env.PORT || 5000)