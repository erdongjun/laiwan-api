import { Server } from 'socket.io'
import { GAME_TYPE } from '../../config/game'

const ROOM = 'game'
// 冠军id
let firstId = ''
// 上一步冠军id
let lastFirstId = ''
const onLineUsers: any = {}
const sockets: any = {}
let onLineCount: number = 0
// 0-未开始/失败 1-进行中
let gameStatus = 0

function updateTip(id: string,data: any) {
  const socket = sockets[id]
  if (socket) {
    socket.to(ROOM).emit('data', {
      ...data,
      ...GAME_TYPE[data.text],
    })
    socket.to(ROOM).emit('game-data', {
      onLineUsers,
      onLineCount,
      gameStatus,
    })
  }
}

function updateGameScore(socketId: string,score: number) {
  const socket = sockets[socketId]
  if (socket) {
    socket.to(ROOM).emit('game-data', {
      onLineUsers,
      onLineCount,
      gameStatus,
    })
    if (score === 200) {
      // 击杀敌人
      socket.to(ROOM).emit('data', {
        name: onLineUsers[socketId].name,
        socketId,
        ...GAME_TYPE[3005]
      })
    }
    // 检测第一名是否发生变化
    lastFirstId = firstId
    let temp = 0
    // 获取当前第一名
    Object.keys(onLineUsers).forEach(key => {
      if (onLineUsers[key].count > temp) {
        temp = onLineUsers[key].count
        firstId = key
      }
    })
    if (temp!== 0 && firstId !== lastFirstId) {
       socket.to(ROOM).emit('data', {
        name: onLineUsers[firstId].name,
        socketId,
        ...GAME_TYPE[3001]
      })
    }
  }
}


export const initSocket = (httpServer: any) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      credentials: false,
    },
    path:'/socket/game'
  })
  io.on('connection', (socket: any) => {
    if (!sockets[socket.id]) {
      sockets[socket.id] = socket
    }
    socket.join(ROOM)
    socket.on('data', (data: any) => {
      // console.log('connection data', data)
      // 如果是退出游戏则清除积分榜单
      if (data.type === 1003) {
        firstId = ''
        lastFirstId = ''
        Object.keys(onLineUsers).forEach(key => {
          onLineUsers[key].count = 0
        })
      }
      updateTip(data.socketId,data)
    })
    // 加入游戏
    socket.on('login', (data: any) => {
      // console.log('login data', data)
      if (!onLineUsers[data.socketId]) {
        onLineUsers[data.socketId] = {
          count: 0,
          name: data.name
        }
        onLineCount+=1
      }
      updateTip(data.socketId,data)
    })
    // 分数变化
    socket.on('score', (data: {socketId: string,score:number}) => {
      console.log('score data', data)
      if (!onLineUsers[data.socketId]) {
        return false;
      }
      if (data.score < 0 && onLineUsers[data.socketId].count < Math.abs(data.score)) {
        onLineUsers[data.socketId].count = 0
      } else {
        onLineUsers[data.socketId].count = onLineUsers[data.socketId].count + data.score
      }
      updateGameScore(data.socketId, data.score)
    })

    // 基础连接被关闭
    socket.conn.on("close", (reason: any) => {
      // console.log('close', reason)
      socket.to(ROOM).emit('data', {
        ...GAME_TYPE[3006],
        // name: onLineUsers[socket.id]?.name
      })
      delete onLineUsers[socket.id]
      onLineCount -= 1
      delete sockets[socket.id]
      socket.to(ROOM).emit('game-data', {
        onLineUsers,
        onLineCount,
        gameStatus
      })
    });
  })
}

