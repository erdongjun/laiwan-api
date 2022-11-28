import Router from '@koa/router'
import { Context } from 'koa'
const router = new Router()

router.get('/', async(ctx: Context) => {
  await ctx.render('index', {
    title: '直播间'
  })
})


export default router