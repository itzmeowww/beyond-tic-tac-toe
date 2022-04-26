
import { animated, useSpring } from 'react-spring'

type Props = {
    winner: string
    reset: any
}

const PopUpCard = ({ winner, reset }: Props) => {
    const gameEnd = useSpring({ opacity: winner == '' ? 0 : 1, y: winner == '' ? '100%' : '0' })
    return (
        <animated.div style={gameEnd} className="flex flex-col justify-end mb-12 items-center z-10 absolute w-full h-full ">
            <div className="w-4/5 max-w-md h-36 md:h-48 bg-white gap-6 flex flex-col justify-center items-center rounded shadow-lg" >
                {winner == 'draw' &&
                    <h1 className="text-xl font-semibold">
                        Draw
                    </h1>
                    // <Icon name="x" select={false} size={1} />
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
    );
}

export default PopUpCard;