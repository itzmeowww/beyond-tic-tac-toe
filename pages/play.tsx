import Head from "next/head";
import { useState } from "react";
import { useSpring, animated } from 'react-spring'
import Icon from "../components/Icon";


const Play = () => {
    const fadeIn = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, delay: 0 })
    const moveIn = useSpring({ to: { opacity: 1, y: 0 }, from: { opacity: 0, y: -100 } })



    const [table, setTable] = useState([["", "", ""], ["", "", ""], ["", "", ""]])
    const [player, setPlayer] = useState("x")
    const [winner, setWinner] = useState("")
    const gameEnd = useSpring({ opacity: winner == '' ? 0 : 1, y: winner == '' ? '100%' : '0' })
    const sizes = [1, 2, 3, 4, 5]
    const tableWidth = 3, tableHeight = 3;
    const goal = 3;

    const [usedX, setUsedX] = useState([false, false, false, false, false])
    const [usedO, setUsedO] = useState([false, false, false, false, false])

    const [sizeIdx, setSizeIdx] = useState(-1)

    const placeTable = (row: number, col: number) => {
        const currentPlayer = table[row][col].split('_')[0];
        const currentSizeIdx = +table[row][col].split('_')[1];

        if (sizeIdx == -1) return;
        if (currentPlayer == player || sizes[sizeIdx] <= sizes[currentSizeIdx]) return;
        let newTable = [...table]
        newTable[row][col] = `${player}_${sizeIdx}`
        setTable(newTable)
        let newUsedX = [...usedX]
        let newUsedO = [...usedO]

        if (player == 'x') {
            newUsedX[sizeIdx] = true
            setUsedX(newUsedX)
        }
        else if (player == 'o') {

            newUsedO[sizeIdx] = true
            setUsedO(newUsedO)
        }

        togglePlayer()
        validate()
        checkPossible(newUsedX, newUsedO)
        setSizeIdx(-1)
    }


    const validate = () => {

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
                        setWinner('x')
                    }
                    if (couO >= goal) {
                        setWinner('o')
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
                        setWinner('x')
                    }
                    if (couO >= goal) {
                        setWinner('o')
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
                        setWinner('x')
                    }
                    if (couO >= goal) {
                        setWinner('o')
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
                        setWinner('x')
                    }
                    if (couO >= goal) {
                        setWinner('o')
                    }
                }

            }
        }

    }


    const checkPossible = (newUsedX: boolean[], newUsedO: boolean[]) => {
        let maxSize = -1;
        let have = false
        sizes.forEach((size, _idx) => {
            if (!newUsedO[_idx] || !newUsedX[_idx]) {
                have = true
            }
            if (player == 'o' && !newUsedO[_idx]) {
                maxSize = Math.max(maxSize, size)
            }
            if (player == 'x' && !newUsedX[_idx]) {
                maxSize = Math.max(maxSize, size)
            }
        })

        let can = false;
        table.forEach((row) => {
            row.forEach((col) => {
                if (+col.split('_')[1] < maxSize) {
                    can = true;
                }
                else if (col == '') {
                    can = true
                }
            })
        })

        if (!can || !have) {
            setWinner('Draw')
        }
    }
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
        setTable([["", "", ""], ["", "", ""], ["", "", ""]])
        setUsedO([false, false, false, false, false])
        setUsedX([false, false, false, false, false])
    }
    return (
        <div className="relative flex h-screen flex-col items-center justify-center bg-teal-500 overflow-hidden">
            <Head>
                <title>Play Beyond Tic Tac Toe</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <animated.div style={gameEnd} className="flex flex-col justify-end mb-12 items-center z-10 absolute w-full h-full ">
                <div className="w-4/5 max-w-lg h-48 bg-white gap-6 flex flex-col justify-center items-center rounded shadow-lg" >
                    {winner == 'Draw' &&
                        <h1 className="text-xl font-semibold">
                            Draw
                        </h1>
                    }
                    {winner == 'x' &&
                        <h1 className="text-xl font-semibold">
                            X won
                        </h1>
                        // <Icon name="x" select={false} size={1} />
                    }
                    {winner == 'o' &&
                        <h1 className="text-xl font-semibold">
                            O won
                        </h1>
                        // <Icon name="x" select={false} size={1} />
                    }

                    <button onClick={reset} className='border-2 border-neutral-800 px-3 py-1 rounded bg-neutral-700 hover:bg-neutral-800 text-white shadow-md font-semibold transition-colors'>
                        Play Again
                    </button>
                </div>
            </animated.div>

            <animated.div style={fadeIn} className="">
                {/* <a href="/" onClick={reset} className='border-2 border-neutral-800 px-3 py-1 rounded bg-neutral-700 hover:bg-neutral-800 text-white shadow-md font-semibold transition-colors text-xs'>
                    Go Back
                </a> */}
                <div className="shadow-md" >
                    <div className={`w-full h-24 border-white border-4 border-b-0 flex justify-between items-center px-4 ${player == 'x' ? 'bg-teal-600' : 'bg-transparent'}`}>
                        {sizes.map((size, _idx) =>
                            <div className={`hover:cursor-pointer flex flex-col items-center justify-end ${usedX[_idx] && 'invisible'}`} onClick={() => { if (player == 'x') setSizeIdx(_idx) }}>
                                <Icon name="x" select={sizeIdx == _idx && player == 'x'} size={size} />
                            </div>
                        )}


                    </div>
                    <table className="border-2 border-white table-auto border-collapse">
                        <tbody>
                            {table.map((row, rowIdx) => {
                                return <tr className="grid grid-cols-3">
                                    {row.map((col, colIdx) => {
                                        return <td onClick={() => {
                                            placeTable(rowIdx, colIdx);
                                        }} className="text-xl h-24 w-24 border-white border-2 flex items-center justify-center">
                                            <Icon name={col.split('_')[0]} size={sizes[+col.split('_')[1]]} select={false} />
                                        </td>
                                    })}
                                </tr>
                            })}
                        </tbody>
                    </table>
                    <div className={`w-full border-white h-24 border-4 border-t-0 flex items-center justify-between px-4 ${player == 'o' ? 'bg-teal-600' : 'bg-transparent'}`}>

                        {sizes.map((size, _idx) =>
                            <div onClick={() => { if (player == 'o') setSizeIdx(_idx) }} className={`hover:cursor-pointer flex flex-col items-center justify-end ${usedO[_idx] && 'invisible'}`} >
                                <Icon name="o" select={sizeIdx == _idx && player == 'o'} size={size} />
                            </div>
                        )}

                    </div>
                </div>
            </animated.div >
        </div >
    );
}

export default Play;