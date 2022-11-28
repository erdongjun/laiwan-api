
import Router from '@koa/router'
const router = new Router()

import adminRouter from './admin'
import apiRouter from './api'

router.use('/admin',adminRouter.routes(),adminRouter.allowedMethods())
router.use('/api',apiRouter.routes(),apiRouter.allowedMethods())

export default router