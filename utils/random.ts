import { availableMoveType } from '../types/availableMoveType'
import { boardStatusType } from '../types/boardStatusType'
import { choiceType } from '../types/choiceType'
import { playerType } from '../types/player'
import { getAvailableMove } from './getAvailableMove'

export const random = (
  boardStatus: boardStatusType,
  player: playerType
): choiceType => {
  let availableMove: availableMoveType = getAvailableMove(boardStatus)

  const choice =
    availableMove[player][
      Math.floor(Math.random() * availableMove[player].length)
    ]

  return choice
}
