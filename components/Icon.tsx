import { is } from '@react-spring/shared'
import { useSpring, animated } from 'react-spring'
type Props = {
    name: string
    size: number
    select?: boolean
    isWhite?: boolean
}

type IconProps = {
    size: number
    isWhite: boolean
}

const XIcon = ({ size, isWhite }: IconProps) => {
    if (size == 1)
        return <div className='h-6 pt-[11px]'>
            <div className={`w-6 h-1 ${isWhite ? 'bg-white' : 'bg-black'} rotate-45 `} />
            <div className={`w-6 h-1 ${isWhite ? 'bg-white' : 'bg-black'} -rotate-45 -mt-1`} />
        </div>
    else if (size == 2)
        return <div className='h-8 pt-[15px]'>
            <div className={`w-8 h-1 ${isWhite ? 'bg-white' : 'bg-black'} rotate-45 `} />
            <div className={`w-8 h-1 ${isWhite ? 'bg-white' : 'bg-black'} -rotate-45 -mt-1`} />
        </div>
    else if (size == 3)
        return <div className='h-10 pt-[18px]'>
            <div className={`w-10 h-1 ${isWhite ? 'bg-white' : 'bg-black'} rotate-45 `} />
            <div className={`w-10 h-1 ${isWhite ? 'bg-white' : 'bg-black'} -rotate-45 -mt-1`} />
        </div>
    else if (size == 4)
        return <div className='h-12 pt-[22px]'>
            <div className={`w-12 h-1 ${isWhite ? 'bg-white' : 'bg-black'} rotate-45 `} />
            <div className={`w-12 h-1 ${isWhite ? 'bg-white' : 'bg-black'} -rotate-45 -mt-1`} />
        </div>
    else if (size == 5)
        return <div className='h-14 pt-[27px]'>
            <div className={`w-14 h-1 ${isWhite ? 'bg-white' : 'bg-black'} rotate-45 `} />
            <div className={`w-14 h-1 ${isWhite ? 'bg-white' : 'bg-black'} -rotate-45 -mt-1`} />
        </div>
    else return <></>
}



const OIcon = ({ size, isWhite }: IconProps) => {
    if (size == 1)
        return <div className={`w-6 h-6 rounded-full border-4 ${isWhite ? 'border-white' : 'border-black'}`} />
    else if (size == 2)
        return <div className={`w-8 h-8 rounded-full border-4 ${isWhite ? 'border-white' : 'border-black'}`} />
    else if (size == 3)
        return <div className={`w-10 h-10 rounded-full border-4 ${isWhite ? 'border-white' : 'border-black'}`} />
    else if (size == 4)
        return <div className={`w-12 h-12 rounded-full border-4 ${isWhite ? 'border-white' : 'border-black'}`} />
    else if (size == 5)
        return <div className={`w-14 h-14 rounded-full border-4 ${isWhite ? 'border-white' : 'border-black'}`} />
    else return <></>
}

const Icon = ({ name, size, select = false, isWhite = true }: Props) => {
    const fadeIn = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, delay: 0 })

    const styles = useSpring({ opacity: select ? 1 : 0 })
    if (name == 'x') {
        return <animated.div style={fadeIn} className={` flex flex-col items-center justify-center`}>
            {select && <animated.div style={styles} className="bg-yellow-400 rounded-full h-2 w-2 mt-1" />}
            <XIcon size={size} isWhite={isWhite} />

        </animated.div>
    }
    else {

        return <animated.div style={fadeIn} className={`flex flex-col items-center justify-center`}>
            <OIcon size={size} isWhite={isWhite} />
            {select && <animated.div style={styles} className="bg-yellow-400 rounded-full h-2 w-2 mt-2" />}
        </animated.div>
    }
}

export default Icon;