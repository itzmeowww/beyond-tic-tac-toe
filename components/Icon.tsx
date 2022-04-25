import { useSpring, animated } from 'react-spring'
type Props = {
    name: string
    size: number
    select: boolean

}

type IconProps = {
    size: number
}

const XIcon = ({ size }: IconProps) => {
    if (size == 1)
        return <div className='h-6 pt-3'>
            <div className="w-6 h-1 bg-white rotate-45" />
            <div className="w-6 h-1 bg-white -rotate-45 -mt-1" />
        </div>
    else if (size == 2)
        return <div className='h-8 pt-4'>
            <div className="w-8 h-1 bg-white rotate-45" />
            <div className="w-8 h-1 bg-white -rotate-45 -mt-1" />
        </div>
    else if (size == 3)
        return <div className='h-10 pt-5'>
            <div className="w-10 h-1 bg-white rotate-45" />
            <div className="w-10 h-1 bg-white -rotate-45 -mt-1" />
        </div>
    else if (size == 4)
        return <div className='h-12 pt-6'>
            <div className="w-12 h-1 bg-white rotate-45" />
            <div className="w-12 h-1 bg-white -rotate-45 -mt-1" />
        </div>
    else if (size == 5)
        return <div className='h-14 pt-7'>
            <div className="w-14 h-1 bg-white rotate-45" />
            <div className="w-14 h-1 bg-white -rotate-45 -mt-1" />
        </div>
    else return <></>
}



const OIcon = ({ size }: IconProps) => {
    if (size == 1)
        return <div className={`w-6 h-6 rounded-full border-4`} />
    else if (size == 2)
        return <div className={`w-8 h-8 rounded-full border-4`} />
    else if (size == 3)
        return <div className={`w-10 h-10 rounded-full border-4`} />
    else if (size == 4)
        return <div className={`w-12 h-12 rounded-full border-4`} />
    else if (size == 5)
        return <div className={`w-14 h-14 rounded-full border-4`} />
    else return <></>
}

const Icon = ({ name, size, select }: Props) => {
    const fadeIn = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, delay: 0 })

    const styles = useSpring({ opacity: select ? 1 : 0 })
    if (name == 'x') {
        return <animated.div style={fadeIn} className={` flex flex-col items-center justify-center`}>
            <XIcon size={size} />
            {select && <animated.div style={styles} className="bg-yellow-400 rounded-full h-2 w-2 mt-1" />}
        </animated.div>
    }
    else {

        return <animated.div style={fadeIn} className={`flex flex-col items-center justify-center`}>
            <OIcon size={size} />
            {select && <animated.div style={styles} className="bg-yellow-400 rounded-full h-2 w-2 mt-2" />}
        </animated.div>
    }
}

export default Icon;