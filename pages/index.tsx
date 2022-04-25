import type { NextPage } from 'next'
import Head from 'next/head'
const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-teal-500">
      <Head>
        <title>Beyond Tic Tac Toe</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center text-center">
        <h1 className='text-4xl font-semibold text-white mb-14'>
          Beyond Tic Tac Toe
        </h1>
        {/* TODO: re-design */}
        <div className='flex flex-col gap-6'>


          <a href='/play' className='border-2 border-neutral-800 px-3 py-1 rounded bg-neutral-700 hover:bg-neutral-800 text-white shadow-md font-semibold transition-colors'>
            Play Against Your Friend
          </a>
          <a href='/ai' className='border-2 border-neutral-800 px-3 py-1 rounded bg-neutral-700 hover:bg-neutral-800 text-white shadow-md font-semibold transition-colors'>
            Play Against AI
          </a>


        </div>
      </main>

      {/* <footer className="flex h-24 w-full items-center justify-center border-t">

      </footer> */}
    </div>
  )
}

export default Home
