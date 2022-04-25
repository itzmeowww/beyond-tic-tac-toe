import Head from "next/head";
import { animated, useSpring } from 'react-spring'
const Rules = () => {
    const fadeIn = useSpring({ to: { opacity: 1, y: 0 }, from: { opacity: 1, y: -100 }, delay: 0 })
    return (
        <animated.div style={fadeIn} className="flex min-h-screen w-full flex-col items-center justify-center py-2 bg-teal-500">
            <Head>
                <title>Beyond Tic Tac Toe</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <a href="/" className="font-mono underline text-white mb-20">return</a>
            <ol className="list-decimal">
                <li className=" text-white">
                    Select the size of X/O
                </li>
                <li className=" text-white">
                    Place X/O on the empty box or over the smaller size
                </li>
                <li className=" text-white">
                    If you have 3 consecutive X/O, you win
                </li>
            </ol>

        </animated.div>
    );
}

export default Rules;