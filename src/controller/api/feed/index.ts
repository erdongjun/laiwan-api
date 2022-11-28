import { Context } from 'koa'
export default {
  list: async  (ctx: Context) => {
   ctx.send({})
 }
}


// router.get('/add', async(ctx: Context) => {
//   await ctx.render('index', {
//     title: '直播间'
//   })
// })

// router.get('/del', async(ctx: Context) => {
//   await ctx.render('index', {
//     title: '直播间'
//   })
// })

// router.get('/edit', async(ctx: Context) => {
//   await ctx.render('index', {
//     title: '直播间'
//   })
// })
