const mongoose = require('mongoose')


const recipeSchema = mongoose.Schema({
    title:{
        type: String
    },
    url:{
        type: String
    },
    img:{
        type: String
    },
    abstract:{
        type: String
    },
    ingrids:{
        type: Array
    },
    difficulty:{
        type: String
    },
    instructions:{
        type: Array
    },
    clicks:{
        type: Number
    },
    clicks_day:{
        type: Number
    },
    site:{
        type: String
    }
},{
    timestamps: true   
})



module.exports = mongoose.model('Recipe', recipeSchema, 'recipe-db')