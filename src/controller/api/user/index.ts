import { Context } from 'koa'

import { userService } from '../../../service'
export default {
  list: async (ctx: Context) => {
    const list = await userService.list()
    console.log({list})
    ctx.send({
      data: list
    })
  },

  add: async (ctx: Context) => {
    console.log({})
    ctx.send({
      test: 'test'
    })
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
