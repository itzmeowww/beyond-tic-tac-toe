
import { NextApiRequest, NextApiResponse } from "next";
import { choiceType } from "../../types/choiceType";
import { random } from "../../utils/random";


export default function handler(req: NextApiRequest, res: NextApiResponse<choiceType>) {

    const { board, player } = req.query

    const boardStatus = JSON.parse(Array.isArray(board) ? board[0] : board)
    const choice = random(boardStatus, player == 'x' ? 'x' : 'o')
    console.log(choice)
    res.status(200).json(choice)
}