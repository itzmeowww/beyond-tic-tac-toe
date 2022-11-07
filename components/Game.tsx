import { useEffect, useRef, useState } from "react";
import { useSpring, animated } from 'react-spring'
import Icon from "./Icon";
import PopUpCard from "./PopUpCard";
import { evaluateBoard } from '../utils/evaluate'
import type { boardStatusType } from "../types/boardStatusType";

type Props = {
    xPlayer?: string
    oPlayer?: string
    qTable?: any
}


export const gameSettings = { tableWidth: 3, tableHeight: 3, goal: 3, sizes: [1, 2, 3, 4, 5] }



const Game = ({ xPlayer = 'human', oPlayer = 'human' }: Props) => {
    const isMounted = useRef(false);

    const initialBoardStatus: boardStatusType = {
        table: [["", "", ""], ["", "", ""], ["", "", ""]],
        usedX: [false, false, false, false, false],
        usedO: [false, false, false, false, false]
    }

    const fadeIn = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, delay: 0 })



    const [completedLines, setCompletedLines] = useState([false, false, false, false, false, false, false, false])

    const [boardStatus, setBoardStatus] = useState<boardStatusType>(initialBoardStatus)
    const [player, setPlayer] = useState("x")
    const [winner, setWinner] = useState("")

    const [sizeIdx, setSizeIdx] = useState(-1)


    const sizes = gameSettings.sizes

    const showMarkDown = (delay: number) => useSpring({ to: { opacity: 1, y: 0 }, from: { opacity: 0, y: -100 }, delay: delay, })
    const showMarkUp = (delay: number) => useSpring({ to: { opacity: 1, y: 0 }, from: { opacity: 0, y: 100 }, delay: delay, })

    const placeTable = (row: number, col: number, idxOfSize: number) => {
        // console.log('placing...', row, col, idxOfSize)
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



        const ret = evaluateBoard(gameSettings, boardStatus.table, boardStatus.usedO, boardStatus.usedX, player == 'x' ? 'o' : 'x')

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
        // console.log(boardStatus)
    }, [boardStatus])


    useEffect(() => {
        if (player == 'o' && oPlayer == 'random' && winner == '') {
            fetch(`/api/random?board=${JSON.stringify(boardStatus)}&player=${player}`).then((res) => {
                res.json().then((choice) => {
                    console.log('Random API')
                    console.log(choice)
                    setSizeIdx(choice.idx)
                    setTimeout(() => {
                        placeTable(choice.i, choice.j, choice.idx)
                    }, 500)
                })

            })

        }
        else if (player == 'o' && oPlayer == 'minimax' && winner == '') {

            fetch(`/api/minimax?board=${JSON.stringify(boardStatus)}&player=${player}`).then((res) => {
                res.json().then((choice) => {
                    console.log('Minimax API')
                    console.log(choice)
                    setSizeIdx(choice.idx)
                    setTimeout(() => {
                        placeTable(choice.i, choice.j, choice.idx)
                    }, 500)
                })

            })

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
        <div className="w-full relative flex h-screen flex-col items-center justify-center bg-teal-500 overflow-hidden">

            <PopUpCard reset={reset} winner={winner} />
            <animated.div style={fadeIn} className="">
                {/* <a href="/" onClick={reset} className='border-2 border-neutral-800 px-3 py-1 rounded bg-neutral-700 hover:bg-neutral-800 text-white shadow-md font-semibold transition-colors text-xs'>
                    Go Back
                </a> */}
                {/* <div className="text-white font-mono text-sm text-left px-2 h-6 w-full bg-black border-white border-4 border-b-0">
                    AI
                </div> */}
                <div className="shadow-xl" >
                    <div className={`w-full border-white h-24 border-4 border-b-0 flex items-center justify-between px-4 ${player == 'o' ? 'bg-teal-600' : 'bg-transparent'}`}>

                        {sizes.map((size, _idx) =>
                            <animated.div style={showMarkDown(100 * (1 + _idx))} key={`o-${_idx}`} onClick={() => { if (player == 'o') setSizeIdx(_idx) }} className={`hover:cursor-pointer flex flex-col items-center justify-end ${boardStatus.usedO[_idx] && 'invisible'}`} >
                                <Icon name="o" select={sizeIdx == _idx && player == 'o'} size={size} />
                            </animated.div>
                        )}

                    </div>
                    <div className="relative">
                        <table className=" border-2 border-white table-auto border-collapse">
                            <tbody>
                                {boardStatus.table.map((row, rowIdx) => {
                                    return <tr key={`r-${rowIdx}`} className="grid grid-cols-3">
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
                        </table>
                        {completedLines[0] && <div className="h-72 left-12 w-1 bg-yellow-300 absolute top-0"></div>}
                        {completedLines[1] && <div className="h-72 left-36 w-1 bg-yellow-300 absolute top-0"></div>}
                        {completedLines[2] && <div className="h-72 right-12 w-1 bg-yellow-300 absolute top-0"></div>}

                        {completedLines[3] && <div className="h-1 left-0 w-72 bg-yellow-300 absolute top-12"></div>}
                        {completedLines[4] && <div className="h-1 left-0 w-72 bg-yellow-300 absolute top-36"></div>}
                        {completedLines[5] && <div className="h-1 left-0 w-72 bg-yellow-300 absolute bottom-12"></div>}
                        {completedLines[6] && <div className="rotate-45 w-96 -left-12 h-1 bg-yellow-300 absolute top-36"></div>}
                        {completedLines[7] && <div className="-rotate-45 w-96 -left-12 h-1 bg-yellow-300 absolute top-36"></div>}
                    </div>
                    <div className={`w-full h-24 border-white border-4 border-t-0 flex justify-between items-center px-4 ${player == 'x' ? 'bg-teal-600' : 'bg-transparent'}`}>
                        {sizes.map((size, _idx) =>
                            <animated.div style={showMarkUp(600 - 100 * (1 + _idx))} key={`x-${_idx}`} className={`hover:cursor-pointer flex flex-col items-center justify-end ${boardStatus.usedX[_idx] && 'invisible'}`} onClick={() => { if (player == 'x') setSizeIdx(_idx) }}>
                                <Icon name="x" select={sizeIdx == _idx && player == 'x'} size={size} />
                            </animated.div>
                        )}


                    </div>

                </div>
            </animated.div >
        </div >
    );
}

export default Game;