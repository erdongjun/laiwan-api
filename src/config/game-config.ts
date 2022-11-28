
type GameTypes = {
  [key: number|string]: {
    type: number
    text: string
    actionType?: string
  }
}

export const GAME_TYPE: GameTypes = {
  // 100x 游戏状态
  // 200x 游戏动作
  // 300x 榜单动作
  '开始': {
    type: 1001,
    text: '开始游戏',
  },
  '暂停': {
    type: 1002,
    text: '暂停游戏',
  },
  '退出': {
    type: 1003,
    text: '再来一局',
  },
  '重开': {
    type: 1004,
    text: '继续游戏',
  },
  '回退': {
    type: 1005,
    text: '回退上一步',
  },
 
  '左转': {
    type: 2001,
    text: '左转',
    actionType: 'TURNLEFT',
  },
  '右转': {
    type: 2002,
    text: '右转',
     actionType: 'TURNRIGHT',
  },
  '上': {
    type: 2003,
    text: '向上一步',
    actionType: 'TOP',
  },
  '下': {
    type: 2004,
    text: '向下一步',
    actionType: 'BOTTOM',
  },
  '左': {
    type: 2005,
    text: '向左一步',
    actionType: 'LEFT',
  },
  '右': {
    type: 2006,
    text: '向右一步',
    actionType: 'RIGHT',
  },
  
  3001: {
    type: 3001,
    text: '恭喜你勇夺第一名！继续加油！冲冲冲！',
  },
  3002: {
    type: 3002,
    text: '继续加油',
  },
  3003: {
    type: 3003,
    text: '恭喜成为',
  },
  3004: {
    type: 3004,
    text: '你被击败',
  },
  3005: {
    type: 3005,
    text: '恭喜你击杀成功！',
  },
  3006: {
    type: 3006,
    text: '退出游戏',
  },
  3007: {
    type: 3007,
    text: '加入游戏',
  },
}