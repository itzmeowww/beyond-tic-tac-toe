import Head from "next/head";

import Game from "../../components/Game";

const Play = () => {
    const title = 'Play With AI (Easy) - Beyond Tic Tac Toe'
    return (
        <div className="relative flex h-screen flex-col items-center justify-center bg-teal-500 overflow-hidden">
            <Head>
                <link rel="icon" href="/icon.jpeg" />
                <title>{title}</title>
                <meta name="title" content={title} />
                <meta name="description" content="An upgraded tic-tac-toe, more challenging and more fun!" />


                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://beyond-tic-tac-toe.vercel.app" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content="An upgraded tic-tac-toe, more challenging and more fun!" />
                <meta property="og:image" content="https://beyond-tic-tac-toe.vercel.app/preview.jpeg" />


                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://beyond-tic-tac-toe.vercel.app" />
                <meta property="twitter:title" content={title} />
                <meta property="twitter:description" content="An upgraded tic-tac-toe, more challenging and more fun!" />
                <meta property="twitter:image" content="https://beyond-tic-tac-toe.vercel.app/preview.jpeg" />
            </Head>
            <a href="/" className='border-2 my-4 border-neutral-800 px-3 py-1 rounded bg-neutral-700 hover:bg-neutral-800 text-white shadow-md font-semibold transition-colors text-xs'>
                Go Back
            </a>
            <Game oPlayer="random" xPlayer="random" />
        </div >
    );
}

export default Play;