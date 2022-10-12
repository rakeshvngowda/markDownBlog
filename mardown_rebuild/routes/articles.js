const express = require('express');
const mongoose = require('mongoose')

const Article = require('../models/articles')
const router = express.Router();

router.get('/new',(req,res)=>{
    res.render('articles/new',{ article: new Article()})
})


router.get('/edit/:id',async (req,res)=>{
    const article = await Article.findById(req.params.id);
    res.render('articles/edit',{ article: article})
})

router.get('/:slug',async (req,res)=>{
    const article =  await Article.findOne({ slug: req.params.slug })
    if (article == null) res.redirect('/')
    res.render('articles/show',{article: article})
})

router.post('/',async (req,res,next)=>{
   req.article = new Article();
   next() 
},saveArticleAndredirect('new'))

router.put('/:id',async (req,res,next)=>{
    req.article = await Article.findById(req.params.id)
    next() 
 },saveArticleAndredirect('edit'))

router.delete('/:id',async (req,res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})


function saveArticleAndredirect(path) {
    return async(req,res) => {
        let article = req.article
        article.title=req.body.title
        article.description=req.body.description
        article.markdown= req.body.markdown
    
        try {
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
        } catch (e) {
            console.log(e);
            res.render(`articles/${path}`,{ article: article})
        }
    }
    
}
// exports the router to import in other files 
module.exports = router;

