import Router from '@koa/router'
import { user } from '../../controller/api'

const router = new Router()

router.get('/', user.list)

export default router