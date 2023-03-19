const mongoose = require('mongoose')

const recipeUSchema = mongoose.Schema({
    _id:{
        type: Number  
    },
    title:{
        type: String
    },
    link:{
        type: String
    },
    keywords:{
        type: String
    },
    img:{
        type: String
    },
    image_flag:{
        type: Boolean
    },
    keys:{
        type: String
    }
},{
    timestamps: true   
})

module.exports = mongoose.model('RecipeU', recipeUSchema, 'jos_levintallinks')