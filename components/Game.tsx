import Head from "next/head";

import { useEffect, useRef, useState } from "react";
import { useSpring, animated } from 'react-spring'
import Icon from "../components/Icon";
import PopUpCard from "./PopUpCard";

type Props = {
    xPlayer?: string
    oPlayer?: string
}

const minimax = (depth: number, myMark: string, isMax: boolean, gameSettings: { tableHeight: number, tableWidth: number, goal: number, sizes: number[] }, table: string[][], usedO: boolean[], usedX: boolean[], nextPlayer: string) => {

    const tableHeight = gameSettings.tableHeight;
    const tableWidth = gameSettings.tableWidth;
    const sizes = gameSettings.sizes
    let bestVal = 0;
    if (isMax) {
        bestVal = -Infinity
    }
    else {
        bestVal = Infinity

    }

    const res = evaluateBoard(gameSettings, table, usedO, usedX, nextPlayer)
    console.log('minimax', res)
    if (res.status == '') {

    }
    else if (res.status == myMark) {
        return 1;
    }
    else if (res.status == 'draw') {
        return 0;
    }
    else if (res.status != myMark) {
        return -1;
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
        if (isMax) {
            for (let i = 0; i < tableHeight; i++) {
                for (let j = 0; j < tableWidth; j++) {
                    if (table[i][j] == '' || (table[i][j].split('_')[0] != nextPlayer && sizes[+table[i][j].split('_')[1]] < sizes[idx])) {
                        table[i][j] = `${nextPlayer}_${idx}`
                        let score = minimax(depth + 1, myMark, !isMax, gameSettings, table, usedO, usedX, nextPlayer == 'x' ? 'o' : 'x')
                        bestVal = Math.max(score, bestVal)
                    }
                }
            }
        }
        else {

            for (let i = 0; i < tableHeight; i++) {
                for (let j = 0; j < tableWidth; j++) {
                    if (table[i][j] == '' || (table[i][j].split('_')[0] != nextPlayer && sizes[+table[i][j].split('_')[1]] < sizes[idx])) {
                        table[i][j] = `${nextPlayer}_${idx}`
                        let score = minimax(depth + 1, myMark, !isMax, gameSettings, table, usedO, usedX, nextPlayer == 'x' ? 'o' : 'x')
                        bestVal = Math.min(score, bestVal)
                    }
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

    return bestVal;
}

const bestMove = (myMark: string, gameSettings: { tableHeight: number, tableWidth: number, goal: number, sizes: number[] }, table: string[][], usedO: boolean[], usedX: boolean[], player: string) => {
    let bestVal = -Infinity;
    let move = { 'r': -1, 'c': -1, 'idx': -1 }
    const sizes = gameSettings.sizes
    for (let idx = 0; idx < sizes.length; idx++) {
        if (usedO[idx]) {
            continue
        }
        usedO[idx] = true
        for (let i = 0; i < gameSettings.tableHeight; i++) {
            for (let j = 0; j < gameSettings.tableWidth; j++) {
                if (table[i][j] == '' || (table[i][j].split('_')[0] != player && sizes[+table[i][j].split('_')[1]] < sizes[idx])) {
                    table[i][j] = `${player}_${idx}`
                    let score = minimax(0, myMark, false, gameSettings, table, usedO, usedX, player == 'x' ? 'o' : 'x')
                    table[i][j] = ''
                    if (score > bestVal) {
                        move = {
                            'r': i,
                            'c': j,
                            'idx': idx,
                        }
                        bestVal = score
                    }
                }
            }
        }
        usedO[idx] = false
    }
    return move
}

const evaluateBoard = (gameSettings: { tableHeight: number, tableWidth: number, goal: number, sizes: number[] }, table: string[][], usedO: boolean[], usedX: boolean[], nextPlayer: string) => {
    // console.log('evaluating...')
    // console.log(table)
    // console.log(usedO)
    // console.log(usedX)
    // console.log(nextPlayer)
    const tableHeight = gameSettings.tableHeight;
    const tableWidth = gameSettings.tableWidth;
    const goal = gameSettings.tableHeight;
    const sizes = gameSettings.sizes
    let ret = {
        status: '',
        completedLine: -1
    }
    for (let i = 0; i < tableHeight; i++) {
        for (let j = 0; j < tableWidth; j++) {
            if (i + goal - 1 < tableHeight) {
                let couX = 0;
                let couO = 0;
                for (let k = 0; k < goal; k++) {
                    if (table[i + k][j].split('_')[0] == 'x') {
                        couX++;
                    }
                    if (table[i + k][j].split('_')[0] == 'o') {
                        couO++;
                    }
                }
                if (couX >= goal) {
                    ret.status = 'x'
                }
                if (couO >= goal) {
                    ret.status = 'o'
                }
                if (couO >= goal || couX >= goal) {
                    ret.completedLine = j;
                }
            }
            if (j + goal - 1 < tableWidth) {
                let couX = 0;
                let couO = 0;
                for (let k = 0; k < goal; k++) {
                    if (table[i][j + k].split('_')[0] == 'x') {
                        couX++;
                    }
                    if (table[i][j + k].split('_')[0] == 'o') {
                        couO++;
                    }
                }
                if (couX >= goal) {
                    ret.status = 'x'
                }
                if (couO >= goal) {
                    ret.status = 'o'
                }
                if (couO >= goal || couX >= goal) {
                    ret.completedLine = i + 3;
                }
            }


        }
    }

    for (let i = 0; i < tableHeight; i++) {
        for (let j = 0; j < tableWidth; j++) {
            if (i + goal - 1 < tableHeight && j + goal - 1 < tableWidth) {
                let couX = 0;
                let couO = 0;
                for (let k = 0; k < goal; k++) {
                    if (table[i + k][j + k].split('_')[0] == 'x') {
                        couX++;
                    }
                    if (table[i + k][j + k].split('_')[0] == 'o') {
                        couO++;
                    }
                }
                if (couX >= goal) {
                    ret.status = 'x'
                }
                if (couO >= goal) {
                    ret.status = 'o'
                }
                if (couO >= goal || couX >= goal) {
                    ret.completedLine = 6;
                }
            }

            if (i + goal - 1 < tableHeight && j - (goal - 1) >= 0) {
                let couX = 0;
                let couO = 0;
                for (let k = 0; k < goal; k++) {

                    if (table[i + k][j - k].split('_')[0] == 'x') {
                        couX++;
                    }
                    if (table[i + k][j - k].split('_')[0] == 'o') {
                        couO++;
                    }
                }
                if (couX >= goal) {
                    ret.status = 'x'
                }
                if (couO >= goal) {
                    ret.status = 'o'
                }
                if (couO >= goal || couX >= goal) {
                    ret.completedLine = 7;
                }
            }

        }
    }

    if (ret.status != '') return ret

    let maxSize = -1;
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

    let can = false;
    table.forEach((row) => {
        row.forEach((col) => {
            if (col == '') {
                can = true
            }
            else if (sizes[+col.split('_')[1]] < maxSize && col.split('_')[0] != nextPlayer) {
                can = true;
            }
        })
    })

    if (!can || !have) {
        ret.status = 'draw'
    }

    return ret
}

const Game = ({ xPlayer = 'human', oPlayer = 'human' }: Props) => {
    const isMounted = useRef(false);

    const initialBoardStatus = {
        table: [["", "", ""], ["", "", ""], ["", "", ""]],
        usedX: [false, false, false, false, false],
        usedO: [false, false, false, false, false]
    }
    const fadeIn = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, delay: 0 })

    const [completedLines, setCompletedLines] = useState([false, false, false, false, false, false, false, false])

    const [boardStatus, setBoardStatus] = useState(initialBoardStatus)
    const [player, setPlayer] = useState("x")
    const [winner, setWinner] = useState("")

    const [sizeIdx, setSizeIdx] = useState(-1)

    const gameSettings = { tableWidth: 3, tableHeight: 3, goal: 3, sizes: [1, 2, 3, 4, 5] }
    const sizes = gameSettings.sizes



    const placeTable = (row: number, col: number, idxOfSize: number) => {
        console.log('placing...', row, col, idxOfSize)
        const currentPlayer = boardStatus.table[row][col] == '' ? '' : boardStatus.table[row][col].split('_')[0];
        const currentSize = boardStatus.table[row][col] == '' ? 0 : sizes[+boardStatus.table[row][col].split('_')[1]];

        // not selected or more than idx
        if (idxOfSize == -1 || idxOfSize >= sizes.length) return;
        // place on the same mark or on not on the smaller size.
        if (currentPlayer == player || sizes[idxOfSize] <= currentSize) return;
        // already use the size 
        if ((player == 'x' && boardStatus.usedX[idxOfSize] == true) || (player == 'o' && boardStatus.usedO[idxOfSize] == true)) return

        setBoardStatus((prevState) => {
            prevState.table[row][col] = `${player}_${idxOfSize}`
            if (player == 'x') {
                prevState.usedX[idxOfSize] = true
            }
            else if (player == 'o') {
                prevState.usedO[idxOfSize] = true
            }

            return { ...prevState }
        })

    }

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true
            return
        }
        const ret = evaluateBoard(gameSettings, [...boardStatus.table], [...boardStatus.usedO], [...boardStatus.usedX], player == 'x' ? 'o' : 'x')
        if (ret.status == 'x') {
            setWinner('x')
            setCompletedLines((prev) => {
                prev[ret.completedLine] = true
                return prev
            })
        }
        else if (ret.status == 'o') {
            setWinner('o')
            setCompletedLines((prev) => {
                prev[ret.completedLine] = true
                return prev
            })
        }
        else if (ret.status == 'draw') {
            setWinner('draw')
        }
        else {
            togglePlayer()
            setSizeIdx(-1)
        }
        console.log(boardStatus)
    }, [boardStatus])


    useEffect(() => {
        if (player == 'o' && oPlayer == 'random' && winner == '') {
            let availableIdx: number[] = []
            boardStatus.usedO.forEach((value, _idx) => {
                if (value == false) {
                    availableIdx.push(_idx)
                }
            })

            let botSelectedIdx = availableIdx[Math.floor(Math.random() * availableIdx.length)]

            let availablePos: { i: number; j: number }[] = []
            boardStatus.table.forEach((row, _r) => {
                row.forEach((col, _c) => {
                    if (sizes[+col.split('_')[1]] < sizes[botSelectedIdx]) {
                        availablePos.push({ i: _r, j: _c })
                    }
                    else if (col == '') {
                        availablePos.push({ i: _r, j: _c })
                    }
                })
            })
            setSizeIdx(botSelectedIdx)
            // console.log(botSelectedIdx)
            let botSelectedPos = availablePos[Math.floor(Math.random() * availablePos.length)]
            console.log(botSelectedIdx, botSelectedPos)
            setTimeout(() => {
                placeTable(botSelectedPos.i, botSelectedPos.j, botSelectedIdx)
            }, 500)

        }
        else if (player == 'o' && oPlayer == 'minimax' && winner == '') {
            let table = Array.from(Array(gameSettings.tableHeight), () => new Array(gameSettings.tableWidth))

            for (let i = 0; i < gameSettings.tableHeight; i++) {

                for (let j = 0; j < gameSettings.tableWidth; j++) {
                    table[i][j] = boardStatus.table[i][j]
                }
            }

            let usedO = [...boardStatus.usedO]
            let usedX = [...boardStatus.usedX]

            const ret = bestMove('o', gameSettings, table, usedO, usedX, 'o')
            console.log('best move', ret)
            let botSelectedIdx = ret.idx;
            setSizeIdx(botSelectedIdx)
            // console.log(botSelectedIdx)
            let botSelectedPos = {
                i: ret.r, j: ret.c
            };
            console.log(botSelectedIdx, botSelectedPos)
            setTimeout(() => {
                placeTable(botSelectedPos.i, botSelectedPos.j, botSelectedIdx)
            }, 500)

        }
    }, [player])



    const togglePlayer = () => {
        if (player == 'x') {
            setPlayer('o')
        }
        else {
            setPlayer('x')
        }
    }

    const reset = () => {
        setWinner('')
        setBoardStatus(initialBoardStatus)
        setCompletedLines([false, false, false, false, false, false, false, false])
    }
    return (
        <div className="relative flex h-screen flex-col items-center justify-center bg-teal-500 overflow-hidden">
            <Head>
                <link rel="icon" href="/icon.jpeg" />
                <title>Play - Beyond Tic Tac Toe</title>
                <meta name="title" content="Play - Beyond Tic Tac Toe" />
                <meta name="description" content="An upgraded tic-tac-toe, more challenging and more fun!" />


                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://beyond-tic-tac-toe.vercel.app" />
                <meta property="og:title" content="Play - Beyond Tic Tac Toe" />
                <meta property="og:description" content="An upgraded tic-tac-toe, more challenging and more fun!" />
                <meta property="og:image" content="https://beyond-tic-tac-toe.vercel.app/preview.jpeg" />


                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://beyond-tic-tac-toe.vercel.app" />
                <meta property="twitter:title" content="Play - Beyond Tic Tac Toe" />
                <meta property="twitter:description" content="An upgraded tic-tac-toe, more challenging and more fun!" />
                <meta property="twitter:image" content="https://beyond-tic-tac-toe.vercel.app/preview.jpeg" />
            </Head>
            <PopUpCard reset={reset} winner={winner} />
            <animated.div style={fadeIn} className="">
                {/* <a href="/" onClick={reset} className='border-2 border-neutral-800 px-3 py-1 rounded bg-neutral-700 hover:bg-neutral-800 text-white shadow-md font-semibold transition-colors text-xs'>
                    Go Back
                </a> */}
                <div className="shadow-md" >
                    <div className={`w-full border-white h-24 border-4 border-b-0 flex items-center justify-between px-4 ${player == 'o' ? 'bg-teal-600' : 'bg-transparent'}`}>

                        {sizes.map((size, _idx) =>
                            <div onClick={() => { if (player == 'o') setSizeIdx(_idx) }} className={`hover:cursor-pointer flex flex-col items-center justify-end ${boardStatus.usedO[_idx] && 'invisible'}`} >
                                <Icon name="o" select={sizeIdx == _idx && player == 'o'} size={size} />
                            </div>
                        )}

                    </div>
                    <table className="relative border-2 border-white table-auto border-collapse">
                        <tbody>
                            {boardStatus.table.map((row, rowIdx) => {
                                return <tr className="grid grid-cols-3">
                                    {row.map((col, colIdx) => {
                                        return <td key={`t-${rowIdx}-${colIdx}`} onClick={() => {
                                            placeTable(rowIdx, colIdx, sizeIdx);
                                        }} className="text-xl h-24 w-24 border-white border-2 flex items-center justify-center">
                                            <Icon name={col.split('_')[0]} size={sizes[+col.split('_')[1]]} select={false} />
                                        </td>
                                    })}
                                </tr>
                            })}
                        </tbody>

                        {completedLines[0] && <div className="h-72 left-12 w-1 bg-yellow-300 absolute top-0"></div>}
                        {completedLines[1] && <div className="h-72 left-36 w-1 bg-yellow-300 absolute top-0"></div>}
                        {completedLines[2] && <div className="h-72 right-12 w-1 bg-yellow-300 absolute top-0"></div>}

                        {completedLines[3] && <div className="h-1 left-0 w-72 bg-yellow-300 absolute top-12"></div>}
                        {completedLines[4] && <div className="h-1 left-0 w-72 bg-yellow-300 absolute top-36"></div>}
                        {completedLines[5] && <div className="h-1 left-0 w-72 bg-yellow-300 absolute bottom-12"></div>}
                        {completedLines[6] && <div className="rotate-45 w-96 -left-12 h-1 bg-yellow-300 absolute top-36"></div>}
                        {completedLines[7] && <div className="-rotate-45 w-96 -left-12 h-1 bg-yellow-300 absolute top-36"></div>}
                    </table>
                    <div className={`w-full h-24 border-white border-4 border-t-0 flex justify-between items-center px-4 ${player == 'x' ? 'bg-teal-600' : 'bg-transparent'}`}>
                        {sizes.map((size, _idx) =>
                            <div className={`hover:cursor-pointer flex flex-col items-center justify-end ${boardStatus.usedX[_idx] && 'invisible'}`} onClick={() => { if (player == 'x') setSizeIdx(_idx) }}>
                                <Icon name="x" select={sizeIdx == _idx && player == 'x'} size={size} />
                            </div>
                        )}


                    </div>

                </div>
            </animated.div >
        </div >
    );
}

export default Game;