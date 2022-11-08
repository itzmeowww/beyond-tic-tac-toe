import { choiceType } from '../types/choiceType'
import { evaluateBoard } from './evaluate'

const minimax = (
  depth: number,
  myMark: string,
  isMax: boolean,
  gameSettings: {
    tableHeight: number
    tableWidth: number
    goal: number
    sizes: number[]
  },
  table: string[][],
  usedO: boolean[],
  usedX: boolean[],
  nextPlayer: string
) => {
  const tableHeight = gameSettings.tableHeight
  const tableWidth = gameSettings.tableWidth
  const sizes = gameSettings.sizes
  let bestVal = 0
  if (isMax) {
    bestVal = -Infinity
  } else {
    bestVal = Infinity
  }

  const res = evaluateBoard(gameSettings, table, usedO, usedX, nextPlayer)

  if (res.status == '') {
  } else if (res.status == myMark) {
    return 1
  } else if (res.status == 'draw') {
    return 0
  } else if (res.status != myMark) {
    return -1
  }

  for (let idx = 0; idx < sizes.length; idx++) {
    if (nextPlayer == 'x' && usedX[idx]) {
      continue
    }
    if (nextPlayer == 'o' && usedO[idx]) {
      continue
    }

    if (nextPlayer == 'x') {
      usedX[idx] = true
    }
    if (nextPlayer == 'o') {
      usedO[idx] = true
    }

    for (let i = 0; i < tableHeight; i++) {
      for (let j = 0; j < tableWidth; j++) {
        if (
          table[i][j] == '' ||
          (table[i][j].split('_')[0] != nextPlayer &&
            sizes[+table[i][j].split('_')[1]] < sizes[idx])
        ) {
          table[i][j] = `${nextPlayer}_${idx}`
          let score = minimax(
            depth + 1,
            myMark,
            !isMax,
            gameSettings,
            table,
            usedO,
            usedX,
            nextPlayer == 'x' ? 'o' : 'x'
          )
          if (isMax) bestVal = Math.max(score, bestVal)
          else bestVal = Math.min(score, bestVal)
        }
      }
    }

    if (nextPlayer == 'x') {
      usedX[idx] = false
    }
    if (nextPlayer == 'o') {
      usedO[idx] = false
    }
  }

  return bestVal
}

export const bestMove = (
  myMark: string,
  gameSettings: {
    tableHeight: number
    tableWidth: number
    goal: number
    sizes: number[]
  },
  table: string[][],
  usedO: boolean[],
  usedX: boolean[],
  player: string
): choiceType => {
  let bestVal = -Infinity
  let moves: choiceType[] = []
  const sizes = gameSettings.sizes
  for (let idx = 0; idx < sizes.length; idx++) {
    if (usedO[idx]) {
      continue
    }
    usedO[idx] = true
    for (let i = 0; i < gameSettings.tableHeight; i++) {
      for (let j = 0; j < gameSettings.tableWidth; j++) {
        // console.log(': ', i, j, ' ??', table[i][j])

        if (
          table[i][j] == '' ||
          (table[i][j].split('_')[0] != 'o' &&
            sizes[+table[i][j].split('_')[1]] < sizes[idx])
        ) {
          let newTable = Array.from(
            Array(gameSettings.tableHeight),
            () => new Array(gameSettings.tableWidth)
          )

          for (let i = 0; i < gameSettings.tableHeight; i++) {
            for (let j = 0; j < gameSettings.tableWidth; j++) {
              newTable[i][j] = table[i][j]
            }
          }
          newTable[i][j] = `${player}_${idx}`

          const res = evaluateBoard(
            gameSettings,
            newTable,
            usedO,
            usedX,
            myMark
          )

          if (res.status == myMark) {
            return {
              i: i,
              j: j,
              idx: idx,
            }
          }

          let score = minimax(
            0,
            myMark,
            false,
            gameSettings,
            newTable,
            [...usedO],
            [...usedX],
            'x'
          )
          if (score > bestVal) {
            moves = [
              {
                i: i,
                j: j,
                idx: idx,
              },
            ]
            bestVal = score
          } else if (score == bestVal) {
            moves.push({
              i: i,
              j: j,
              idx: idx,
            })
          }
        }
      }
    }
    usedO[idx] = false
  }
  console.log('moves', moves)
  return moves[Math.floor(Math.random() * moves.length)]
}
