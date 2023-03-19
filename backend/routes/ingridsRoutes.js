const express = require('express')
const router = express.Router()
const { autocomplete } = require('../controllers/ingridsController')


router.route('/autocomplete/:query').get(autocomplete)

module.exports = router