export const evaluateBoard = (
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
  const goal = gameSettings.tableHeight
  const sizes = gameSettings.sizes
  let ret = {
    status: '',
    completedLine: -1,
  }
  for (let i = 0; i < tableHeight; i++) {
    for (let j = 0; j < tableWidth; j++) {
      if (i + goal - 1 < tableHeight) {
        let couX = 0
        let couO = 0
        for (let k = 0; k < goal; k++) {
          if (table[i + k][j].split('_')[0] == 'x') {
            couX++
          }
          if (table[i + k][j].split('_')[0] == 'o') {
            couO++
          }
        }
        if (couX >= goal) {
          ret.status = 'x'
        }
        if (couO >= goal) {
          ret.status = 'o'
        }
        if (couO >= goal || couX >= goal) {
          ret.completedLine = j
        }
      }
      if (j + goal - 1 < tableWidth) {
        let couX = 0
        let couO = 0
        for (let k = 0; k < goal; k++) {
          if (table[i][j + k].split('_')[0] == 'x') {
            couX++
          }
          if (table[i][j + k].split('_')[0] == 'o') {
            couO++
          }
        }
        if (couX >= goal) {
          ret.status = 'x'
        }
        if (couO >= goal) {
          ret.status = 'o'
        }
        if (couO >= goal || couX >= goal) {
          ret.completedLine = i + 3
        }
      }
    }
  }

  for (let i = 0; i < tableHeight; i++) {
    for (let j = 0; j < tableWidth; j++) {
      if (i + goal - 1 < tableHeight && j + goal - 1 < tableWidth) {
        let couX = 0
        let couO = 0
        for (let k = 0; k < goal; k++) {
          if (table[i + k][j + k].split('_')[0] == 'x') {
            couX++
          }
          if (table[i + k][j + k].split('_')[0] == 'o') {
            couO++
          }
        }
        if (couX >= goal) {
          ret.status = 'x'
        }
        if (couO >= goal) {
          ret.status = 'o'
        }
        if (couO >= goal || couX >= goal) {
          ret.completedLine = 6
        }
      }

      if (i + goal - 1 < tableHeight && j - (goal - 1) >= 0) {
        let couX = 0
        let couO = 0
        for (let k = 0; k < goal; k++) {
          if (table[i + k][j - k].split('_')[0] == 'x') {
            couX++
          }
          if (table[i + k][j - k].split('_')[0] == 'o') {
            couO++
          }
        }
        if (couX >= goal) {
          ret.status = 'x'
        }
        if (couO >= goal) {
          ret.status = 'o'
        }
        if (couO >= goal || couX >= goal) {
          ret.completedLine = 7
        }
      }
    }
  }

  if (ret.status != '') return ret

  let maxSize = -1
  let have = false
  // Check if the next player can place on any space or not
  sizes.forEach((size, _idx) => {
    if (!usedO[_idx] || !usedX[_idx]) {
      have = true
    }
    if (nextPlayer == 'o' && !usedO[_idx]) {
      maxSize = Math.max(maxSize, size)
    }
    if (nextPlayer == 'x' && !usedX[_idx]) {
      maxSize = Math.max(maxSize, size)
    }
  })

  let can = false
  table.forEach((row) => {
    row.forEach((col) => {
      if (col == '') {
        can = true
      } else if (
        sizes[+col.split('_')[1]] < maxSize &&
        col.split('_')[0] != nextPlayer
      ) {
        can = true
      }
    })
  })

  if (!can || !have) {
    ret.status = 'draw'
  }

  return ret
}
