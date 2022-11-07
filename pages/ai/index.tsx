import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { animated, useTransition, useSpring } from 'react-spring'

type BtnProps = {
  y: number,
  delay: number,
  href: string,
  label: string
}
const Home: NextPage = () => {
  const router = useRouter()
  const fadeIn = useSpring({ to: { opacity: 1, y: 0 }, from: { opacity: 0, y: -100 }, delay: 0 })
  const [buttons, setButtons] = useState<BtnProps[]>([])
  const transitions = useTransition(buttons, {
    from: { x: -100, y: 800, opacity: 0 },
    enter: button => (next) => (
      next({ x: 0, y: button.y, delay: button.delay, opacity: 1 })
    ),
    leave: button => (next) => (
      next({ x: 100, y: 800, delay: button.delay, opacity: 0 })
    )
  })

  useEffect(() => {
    setButtons([{
      href: '/ai/easy',
      label: 'Easy',
      y: 0, delay: 150
    }, {
      href: '/ai/medium',
      label: 'Medium',
      y: 0, delay: 300
    }])
  }, [])

  const goTo = (url: string) => {
    setButtons([])
    setTimeout(() => {
      router.push(url)
    }, 600)

  }
  const title = 'Play With AI - Beyond Tic Tac Toe'
  return (
    <div className="flex overflow-hidden h-screen flex-col items-center justify-center py-2 bg-teal-500">
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

      <main className="flex w-full flex-1 flex-col items-center justify-center text-center">
        <animated.h1 style={fadeIn} className='text-4xl font-semibold text-white mb-20'>
          Play With AI
        </animated.h1>
        {/* TODO: re-design */}
        <div className='flex flex-col gap-6'>

          {transitions((style, button) =>
            button ? <animated.button onClick={() => goTo(button.href)} style={style} className='border-2 border-neutral-800 px-3 py-1 rounded bg-neutral-700 hover:bg-neutral-800 text-white shadow-md font-semibold transition-colors'>
              {button.label}
            </animated.button> : ''
          )}




        </div>
      </main>

      <footer className="flex flex-col h-24 w-full  text-white  items-center justify-center border-t bg-teal-500 ">
        <h1>Code is available on <a href='https://github.com/itzmeowww/beyond-tic-tac-toe' target='_blank' className='text-sm underline'>GitHub</a></h1>
        <h1>This project was inspired by this <a href='https://youtu.be/3q8Gh3yA9pw' target='_blank' className='text-sm underline'>video</a></h1>

      </footer>
    </div>
  )
}

export default Home
function useSprings(number: any, arg1: any) {
  throw new Error('Function not implemented.')
}

