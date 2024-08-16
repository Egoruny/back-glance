const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')

router.get('/',brandController.getAll)
router.get('/tb',brandController.getBt)


module.exports = router