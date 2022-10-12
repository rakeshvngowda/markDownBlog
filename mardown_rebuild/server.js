const express = require('express');
const mongoose = require('mongoose');
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express();


mongoose.connect('mongodb://localhost:27017/mydb');

const Article = require('./models/articles')
app.set('view engine','ejs');

app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))
app.use('/articles',articleRouter)

app.get('/',async (req,res)=>{
    const articles = await Article.find().sort({createdAt:'desc'});
    res.render('articles/index',{ articles: articles })
})

app.listen(5000)