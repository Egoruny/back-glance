const Router = require('express')
const deviceRouter = require('./deviceRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const filterRouter = require('./filterRouter')
const basketRouter = require('./basketRouter')
const orederRouter = require('./orderingRouter')



const router = new Router()

router.use('/user',userRouter)
router.use('/type',typeRouter)
router.use('/brand',brandRouter)
router.use('/device',deviceRouter)
router.use('/filter',filterRouter)
router.use('/basket',basketRouter)
router.use('/order',orederRouter)


module.exports = router