const mongoose=require('mongoose')
  const { marked } = require('marked')
  const slugfiy = require('slugify')
  const createDomPurify = require('dompurify')
  const { JSDOM } = require('jsdom')
  const dompurify = createDomPurify(new JSDOM().window)
const articleSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: string
    },
    markdown: {
        type: string,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    slug:{
        type: string,
        required: true,
        unique: true
    },
    sanitizedHTML:{
        type: string,
        require: true
    }
})

articleSchema.pre('validate', function(next){
    if(this.title){
        this.slug = slugify(this.title,{lower:true, strict: true})
    }
    if(this.markdown){
        this.sanitizedHTML= dompurify.sanitize(marked(this.markdown))
    }


    next()
})


module.exports = mongoose.model('Article',articleSchema)