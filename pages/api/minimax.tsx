

import { NextApiRequest, NextApiResponse } from "next";
import { gameSettings } from "../../components/Game";
import { choiceType } from "../../types/choiceType";
import { bestMove } from "../../utils/bestMove";



export default function handler(req: NextApiRequest, res: NextApiResponse<choiceType>) {

    const { board, player } = req.query

    if (board == undefined) {
        return res.status(400)
    }

    const boardStatus = JSON.parse(Array.isArray(board) ? board[0] : board)
    let table = Array.from(Array(gameSettings.tableHeight), () => new Array(gameSettings.tableWidth))

    for (let i = 0; i < gameSettings.tableHeight; i++) {
        for (let j = 0; j < gameSettings.tableWidth; j++) {
            table[i][j] = boardStatus.table[i][j]
        }
    }
    let usedO = [...boardStatus.usedO]
    let usedX = [...boardStatus.usedX]

    const choice = bestMove(player == 'x' ? 'x' : 'o', gameSettings, table, usedO, usedX, player == 'x' ? 'x' : 'o')
    console.log(choice)
    res.status(200).json(choice)
}