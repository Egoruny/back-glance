const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')

router.get('/',typeController.getAll)
router.get('/test/:catalogId',typeController.gettest)

module.exports = router