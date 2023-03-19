const express = require('express')
const router = express.Router()
const { getRecipeByQuery, getDisplayRecipe, increaseClick, resetClicks, getTop10, getTopClicks, sitemap} = require('../controllers/recipeController')

//router.post('/', registerUser)
//router.post('/login', loginUser)
router.route('/search/').post(getRecipeByQuery)
router.route('/display/:query').get(getDisplayRecipe)
router.route('/click/:query').put(increaseClick)
router.route('/clicks/reset').put(resetClicks)
router.route('/top10').get(getTop10)
router.route('/topclicks').get(getTopClicks)
router.route('/gensitemap').get(sitemap)
module.exports = router