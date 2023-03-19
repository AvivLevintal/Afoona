const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema({
    name:{
        type: String
    },
    cannon:{
        type: String
    },
    small_family:{
        type: String
    },
    big_family:{
        type: String
    }
},{
    timestamps: true   
})

module.exports = mongoose.model('Ingrids', recipeSchema, 'glossary-db')