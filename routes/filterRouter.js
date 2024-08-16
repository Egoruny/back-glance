const Router = require('express')
const router = new Router()
const filterController = require('../controllers/filterController')

router.get('/',()=> {})
router.get('/:catalogId',filterController.getfilters)

module.exports = router