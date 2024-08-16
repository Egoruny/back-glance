const Router = require('express')
const router = new Router()
const orderingController = require('../controllers/orderingController')

router.post('/',orderingController.create)


module.exports = router