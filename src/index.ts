import Koa from 'koa'
import { createServer } from 'http'
import Views from 'koa-views'
import cors from 'koa2-cors'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'
import helmet from 'koa-helmet'
import koaBody from 'koa-body'
import serve from 'koa-static'

import { initSocket } from './controller/socket'
import { config } from './config'
import routers from './router'

import { initModel } from './utils'


import {
  sendDataMiddleware
} from './middlewares'

const app = new Koa()
initModel('laiwan')

const render = Views(__dirname + '/views', {
  extension: 'hbs',
  map: { hbs: 'handlebars' }
})
app.use(sendDataMiddleware)
app.use(render)
app.use(routers.routes())
app.use(routers.allowedMethods())

app.use(cors({
  allowMethods: ['POST', 'GET'],
  allowHeaders: ['authorization', 'Content-Type'],
  credentials: true,
}))
app.use(koaBody({ multipart: true }))

// body / files
app.use(bodyParser())

// static public
app.use(serve(config.staticPath))

// compress
app.use(compress({
  threshold: 2048,
}))

// helmet
app.use(helmet())

// error-handling
process.on('uncaughtException', (err: any, origin: any) => {
  console.error(`${process.stderr.fd}, Caught exception: ${err}, Exception origin: ${origin}`)
})

process.on('unhandledRejection', (reason: any, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
})

app.on('error', err => {
  console.error(err)
})

const httpServer = createServer(app.callback())

initSocket(httpServer)

httpServer.listen(config.port, () => {
  console.log(`server start http://127.0.0.1:${config.port}`)
})