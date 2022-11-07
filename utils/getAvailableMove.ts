import { boardStatusType } from '../types/boardStatusType'
import { gameSettings } from '../components/Game'
import { availableMoveType } from '../types/availableMoveType'

export const getAvailableMove = (
  boardStatus: boardStatusType
): availableMoveType => {
  const sizes = gameSettings.sizes
  const ret: availableMoveType = {
    x: [],
    o: [],
  }
  boardStatus.usedO.forEach((value, _idx) => {
    if (value == false) {
      boardStatus.table.forEach((row, _r) => {
        row.forEach((col, _c) => {
          if (
            'o' != col.split('_')[0] &&
            sizes[+col.split('_')[1]] < sizes[_idx]
          ) {
            ret['o'].push({ i: _r, j: _c, idx: _idx })
          } else if (col == '') {
            ret['o'].push({ i: _r, j: _c, idx: _idx })
          }
        })
      })
    }
  })

  boardStatus.usedX.forEach((value, _idx) => {
    if (value == false) {
      boardStatus.table.forEach((row, _r) => {
        row.forEach((col, _c) => {
          if (
            'x' != col.split('_')[0] &&
            sizes[+col.split('_')[1]] < sizes[_idx]
          ) {
            ret['x'].push({ i: _r, j: _c, idx: _idx })
          } else if (col == '') {
            ret['x'].push({ i: _r, j: _c, idx: _idx })
          }
        })
      })
    }
  })

  return ret
}
