import Koa from 'koa'
import { createServer } from 'http'
import Views from 'koa-views'

import router from './router'
import { initSocket } from './controller/socket'

const app = new Koa()

const render = Views(__dirname + '/views', {
  extension: 'hbs',
  map: { hbs: 'handlebars' }
})

app.use(render)
app.use(router.routes())



const httpServer = createServer(app.callback())

initSocket(httpServer)

httpServer.listen(7000, () => {
  console.log('server start')
})