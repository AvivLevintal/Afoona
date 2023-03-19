const GlossaryM = require('../model/glossaryModel')
const asyncHandler = require('express-async-handler')
const dotenv = require('dotenv').config()

// @desc Handle autocomplete
// @route GET /api/ingrids/autocomplete/:query
// @access Public
const autocomplete = asyncHandler(async(req, res) => {

const glossary = await GlossaryM.find({$or: [{name: {$regex: req.params.query}}]}).limit(10)

    if(!glossary){
        res.status(404)
        throw new Error('Ingrid not found')
    }
    res.status(200).json(glossary)
})



module.exports = {
    autocomplete
}