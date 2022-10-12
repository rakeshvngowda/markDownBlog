const mongoose = require('mongoose');
const slugify = require('slugify');
const marked = require('marked')
// DOM purify part
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

const articleSchema =  new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    description: {
        type:String
    },
    createdAt :{
        type: Date,
        default:Date.now
    },
    markdown :{
        type: String,
        required:true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
})

articleSchema.pre('validate',function(next){
    if (this.title) {
        this.slug = slugify(this.title, { lower:true,
        strict: true
        })
    }
    next()
})


module.exports = mongoose.model('Articles',articleSchema);