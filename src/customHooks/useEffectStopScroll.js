import { useEffect } from 'react'

export const useEffectStopScroll = () => {
    useEffect(() => {
        document.body.classList.add('no-scroll')
        return () => document.body.classList.remove('no-scroll')
    }, [])
}
