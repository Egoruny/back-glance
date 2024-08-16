const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')

router.get('/',deviceController.getAllByDiscount)
router.get('/:id',deviceController.getOne)
router.get('/catalog/:catalogId',deviceController.getProducts)
router.post('/search',deviceController.getSearch)


module.exports = router