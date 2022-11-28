import Router from '@koa/router'
import { Context } from 'koa'
const router = new Router()

router.get('/add', async(ctx: Context) => {
  await ctx.render('index', {
    title: '直播间'
  })
})

router.get('/del', async(ctx: Context) => {
  await ctx.render('index', {
    title: '直播间'
  })
})

router.get('/edit', async(ctx: Context) => {
  await ctx.render('index', {
    title: '直播间'
  })
})


export default router