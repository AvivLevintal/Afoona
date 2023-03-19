const asyncHandler = require('express-async-handler')
const RecipeU = require('../model/recipeuModel')
const axios = require('axios')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const glossary_db = require('./glossary-db.json')
const { createWriteStream } = require('fs');
const { SitemapStream } = require('sitemap');

// @desc Get recipes by text query
// @route POST /api/recipes/search/
// @access Public
const getRecipeByQuery = asyncHandler(async(req, res) => {
    
    console.log(req.body.data.query)
    let body = req.body
    let range = 0
    
    if(body.data.query.page !== undefined)
        range = body.data.query.page

    let search = ([body.data.query.search, body.data.query.ingrids, body.data.query._ingrids])
    if(range == 1 || range == 0)
        range = 0
    else
        range = (parseInt(range) - 1)*10
    
    if(search.join('').length === 0){
        const total = await RecipeU.find().countDocuments()
        let recipe = await RecipeU.find().skip(range).limit(10).sort({imageScore: -1, clicks: -1 }).select('title url img abstract ingrids difficulty clicks clicks_day imgFile imageScore')

        let results = {
            recipe: recipe,
            total: total
        }
        res.status(200).json(results)
    }
    else
    {
        let options = []
        if(search[0] !== "" && search[0] !== undefined){
            options.push({ title: {$regex: search[0]}})
        }
        if(search[1] !== ""){
            try {
                let temp = search[1].split(',')
                for (let i = 0; i < temp.length; i++){
                    options.push({ingrids: {$in: [temp[i]]}})
                }
            } catch (error) {
                res.status(500)
                throw new Error(error)
            }
    
        }
        if(search[2] !== ""){
            try {
                let temp = search[2].split(',')
                for (let i = 0; i < temp.length; i++){
                    options.push({ingrids: {$nin: [temp[i]]}})
                }
            } catch (error) {
                res.status(500)
                throw new Error(error)
            }
        }
        const total = await RecipeU.find().and(options).countDocuments()
        console.log(total)
        let recipe = await RecipeU.find().and(options).skip(range).limit(10).sort({imageScore: -1,clicks: -1 }).select('title url img abstract ingrids difficulty clicks clicks_day imgFile imageScore')
        if(!recipe){
            res.status(404).json('Recipe not found')

        }
        
        let results = {
    
            recipe: recipe,
            total: total
        }
        res.status(200).json(results)

    }
    
})

// @desc Get recipe for page display
// @route GET /api/recipes/display/:query
// @access Public
const getDisplayRecipe = asyncHandler(async(req, res) => {
    
    let page_id =  new mongoose.mongo.ObjectId(req.params.query)

    const recipe = await RecipeU.findById({_id: page_id}).select('title url img abstract ingrids difficulty site clicks clicks_day imgFile imageScore')
    if(!recipe){
        res.status(404).json('Recipe not found')

    }
    let links = await shuffleLinks(recipe.ingrids, recipe.title, page_id)
    let response = {
        recipe: recipe,
        links: links
    }

    res.status(200).json(response)
})

// @desc Get recipe for page display
// @route GET /api/recipes/top10
// @access Public
const getTop10 = asyncHandler(async(req, res) => {

    const recipe = await RecipeU.find().limit(10).sort({clicks_day: -1}).select('title url img abstract ingrids difficulty clicks clicks_day imgFile imageScore')

    if(!recipe){
        res.status(404).json('Recipe not found')

    }


    res.status(200).json(recipe)
})


// @desc Get total amount of clicks
// @route GET /api/recipes/topclicks
// @access Public
const getTopClicks = asyncHandler(async(req, res) => {

    const recipe = await RecipeU.find().limit(10).sort({clicks: -1}).select('title url img abstract ingrids difficulty clicks clicks_day imgFile imageScore')

    if(!recipe){
        res.status(404).json('Recipe not found')

    }


    res.status(200).json(recipe)
})

// @desc Update recipe click counter
// @route PUT /api/recipes/click/:query
// @access Public
const increaseClick = asyncHandler(async(req, res) => {
    const recipe = await RecipeU.findByIdAndUpdate(req.params.query, {$inc: {'clicks': 1, 'clicks_day': 1}})

    if(!recipe){
        res.status(404).json('Recipe not found')

    }

    res.status(200).json(recipe.title)
})




// @desc Update recipe click counter
// @route PUT /api/recipes/clicks/reset
// @access Public
const resetClicks = asyncHandler(async(req, res) => {

    const recipe = await RecipeU.updateMany({}, {'clicks_day': 0})

    if(!recipe){
        res.status(404)
        throw new Error('Recipe not found')
    }
    res.status(200).json(recipe)
})

// @desc Output uuid for sitemap
// @route PUT /api/recipes/sitemap
// @access Public
const sitemap = asyncHandler(async(req, res) => {

    const recipe = await RecipeU.find()

    let links = []

    for(let i = 0; i < recipe.length; i++){
        links.push(recipe[i]._id)
    }

    res.status(200).json(links)
})


const shuffleLinks = asyncHandler(async(ingrids, title, page_id, req,res) =>{

    let links = []
    let by_name_ingrids = []
    let recipe_counter = 10

    for(let i = 0; i < glossary_db.length; i++){
        if(title.includes(glossary_db[i]['name']) && !by_name_ingrids.includes(glossary_db[i]['cannon']))
            by_name_ingrids.push(glossary_db[i]['cannon'])
    }
    for(let i = 0; i < by_name_ingrids.length; i++){

        let isPresent = false
        let recipe = await RecipeU.find().and([{ingrids: {$in: by_name_ingrids[i]}}, {title: {$ne: title}}]).limit(5).sort({imageScore: -1 })
        .select('title url img abstract ingrids difficulty site clicks clicks_day imgFile imageScore')
        for(let i = 0; i < recipe.length; i++)
            if(recipe[i]._id.toString() === page_id.toString()){
                isPresent = true
                break
            }
        if(isPresent)
            recipe = await RecipeU.find().and([{ingrids: {$in: by_name_ingrids[i]}}, {title: {$ne: title}}]).skip(5).limit(5).sort({imageScore: -1 })

        if(recipe.length === 5 && recipe_counter !== 0){
            recipe_counter -= recipe.length
            for(let i=0; i < 5; i++){
                links.push(recipe[i])
            }
        }
    }

    if(recipe_counter !== 0){
            for(let i = 0; i < ingrids.length; i++){
                let isPresent = false
                if(!by_name_ingrids.includes(ingrids[i])){
                    let recipe = await RecipeU.find().and([{ingrids: {$in: ingrids[i]}}, {title: {$ne: title}}]).limit(5).sort({imageScore: -1 })
                    .select('title url img abstract ingrids difficulty site clicks clicks_day imgFile imageScore')
                    
                    for(let i = 0; i < recipe.length; i++)
                        if(recipe[i]._id.toString() === page_id.toString()){
                            isPresent = true
                            break
                        }
                    if(isPresent)
                        recipe = await RecipeU.find().and([{ingrids: {$in: ingrids[i]}}, {title: {$ne: title}}]).skip(5).limit(5).sort({imageScore: -1 })

                    if(recipe.length === 5 && recipe_counter !== 0){
                        recipe_counter -= recipe.length
                        for(let i=0; i < 5; i++){
                            links.push(recipe[i])
                        }   
                    }
                if(recipe_counter === 0)
                    break

                }
        }
    }



    return links
    })


module.exports = {
    getRecipeByQuery,
    getDisplayRecipe,
    increaseClick,
    resetClicks,
    getTop10,
    getTopClicks,
    sitemap

}