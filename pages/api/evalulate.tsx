import { NextApiRequest, NextApiResponse } from "next";


export default function handler(req: NextApiRequest, res: NextApiResponse) {

    // evaluateBoard(gameSettings, boardStatus.table, boardStatus.usedO, boardStatus.usedX, player == 'x' ? 'o' : 'x')


    res.status(200).json({ name: 'John Doe' })
}