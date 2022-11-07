import Head from "next/head";

import Game from "../components/Game";

const Play = () => {
    return (
        <div className="relative flex h-screen flex-col items-center justify-center bg-teal-500 overflow-hidden">
            <a href="/" className='border-2 my-4 border-neutral-800 px-3 py-1 rounded bg-neutral-700 hover:bg-neutral-800 text-white shadow-md font-semibold transition-colors text-xs'>
                Go Back
            </a>
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
            <Game />
        </div >
    );
}

export default Play;