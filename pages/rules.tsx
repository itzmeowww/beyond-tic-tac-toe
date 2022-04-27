import Head from "next/head";
import { animated, useSpring } from 'react-spring'
import Icon from "../components/Icon";
const Rules = () => {

    const fadeIn = useSpring({ to: { opacity: 1, y: 0 }, from: { opacity: 0, y: -100 }, delay: 0 })

    const fade = (delay: number) => useSpring({ to: { opacity: 1, x: 0 }, from: { opacity: 0, x: -100 }, delay: delay })

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-start py-20  bg-teal-500">
            <Head>
                <link rel="icon" href="/icon.jpeg" />
                <title>How to Play - Beyond Tic Tac Toe</title>
                <meta name="title" content="How to Play - Beyond Tic Tac Toe" />
                <meta name="description" content="An upgraded tic-tac-toe, more challenging and more fun!" />


                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://beyond-tic-tac-toe.vercel.app" />
                <meta property="og:title" content="How to Play - Beyond Tic Tac Toe" />
                <meta property="og:description" content="An upgraded tic-tac-toe, more challenging and more fun!" />
                <meta property="og:image" content="https://beyond-tic-tac-toe.vercel.app/preview.jpeg" />


                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://beyond-tic-tac-toe.vercel.app" />
                <meta property="twitter:title" content="How to Play - Beyond Tic Tac Toe" />
                <meta property="twitter:description" content="An upgraded tic-tac-toe, more challenging and more fun!" />
                <meta property="twitter:image" content="https://beyond-tic-tac-toe.vercel.app/preview.jpeg" />
            </Head>
            <h1 className="text-3xl font-semibold">
                How To Play
            </h1>
            <h1 className="text-lg font-semibold mb-10 text-white">
                Beyond-tic-tac-toe
            </h1>

            <animated.main className="max-w-lg flex flex-col items-center justify-start gap-6 w-full px-4">
                <animated.div style={fade(200)} className="flex flex-col items-center w-full" >
                    <div className="flex w-full">
                        <h1 className="bg-black text-white pl-3 w-10 rounded-l-xl flex items-center justify-start">1</h1>
                        <div className="bg-white w-full px-4 py-2 rounded-r-xl -ml-3 shadow flex gap-2 items-center">
                            <h1 className="">There are 5 different sizes of <b>X</b> and
                                <b> O</b> marks</h1>
                        </div>
                    </div>
                    <div className="flex gap-2 my-2">
                        {[1, 2, 3, 4, 5].map((size) => {
                            return <Icon name="x" size={size} />
                        })}
                    </div>
                    <div className="flex gap-2 my-2">
                        {[1, 2, 3, 4, 5].map((size) => {
                            return <Icon name="o" size={size} />
                        })}
                    </div>
                </animated.div>


                <animated.div style={fade(300)} className="flex flex-col items-center gap-4 w-full" >
                    <div className="flex w-full">
                        <h1 className="bg-black text-white pl-3 w-10 rounded-l-xl flex items-center justify-start">2</h1>
                        <div className="bg-white w-full px-4 py-2 rounded-r-xl -ml-3 shadow flex gap-2 items-center">
                            <h1> Like a normal tic-tac-toe, you can place your mark on an empty space</h1>
                        </div>
                    </div>
                    <div className="relative w-10 h-10 flex items-center justify-center mb-4">
                        <div className="absolute top-2 border-4 p-2 border-white">
                            <Icon name="o" size={1} />
                        </div>
                    </div>
                </animated.div>

                <animated.div style={fade(400)} className="flex flex-col items-center gap-4 w-full" >
                    <div className="flex w-full">
                        <h1 className="bg-black text-white pl-3 w-10 rounded-l-xl flex items-center justify-start">3</h1>
                        <div className="bg-white w-full px-4 py-2 rounded-r-xl -ml-3 shadow flex gap-2 items-center">
                            <h1> You can place your mark on your opponent's mark if their mark is <b>smaller</b>. </h1>
                        </div>
                    </div>
                    <div className="relative w-10 h-10 flex items-center justify-center mb-4">
                        <div className="absolute top-2 border-4 p-2 border-white">
                            <Icon name="o" size={1} />
                        </div>
                        <div className="absolute top-2">
                            <Icon name="x" size={4} isWhite={false} />
                        </div>
                    </div>
                </animated.div>
                <animated.div style={fade(500)} className="flex flex-col items-center gap-4 w-full">
                    <div className="flex w-full" >
                        <h1 className="bg-black text-white pl-3 w-10 rounded-l-xl flex items-center justify-start">4</h1>
                        <div className="bg-white w-full px-4 py-2 rounded-r-xl -ml-3 shadow flex gap-2 items-center">
                            If you matched 3 marks in row, column, or diagonal, you win!
                        </div>
                    </div>
                    <table className="border-2 border-white table-auto border-collapse relative">
                        <tbody>
                            {[["x_2", "x_1", "o_4"], ["x_3", "", ""], ["x_4", "", ""]].map((row, rowIdx) => {
                                return <tr className="grid grid-cols-3">
                                    {row.map((col, colIdx) => {
                                        return <td className="text-xl h-16 w-16 border-white border-2 flex items-center justify-center">
                                            <Icon name={col.split('_')[0]} size={+col.split('_')[1]} select={false} />
                                        </td>
                                    })}
                                </tr>
                            })}
                        </tbody>

                        <div className="absolute top-2 w-1 h-44 left-8 bg-yellow-300"></div>
                    </table>
                    <h1 className="text-2xl font-semibold underline text-white">X won</h1>
                </animated.div>

                <div className="w-full flex justify-end items-center">
                    <a href="/" className="border-2 border-neutral-800 px-3 py-1 rounded bg-neutral-700 hover:bg-neutral-800 text-white shadow-md font-semibold transition-colors">Go Back</a>
                </div>
            </animated.main>



        </div>
    );
}

export default Rules;