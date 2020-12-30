import { useCallback, useRef } from "react"
interface TimerRefConfig { timer: NodeJS.Timeout | null }

export default function UseThrottle(
    func: any,
    delay: number
) {
    const { current } = useRef<TimerRefConfig>({ timer: null })
    return useCallback((...args) => {
        if (!current.timer) {
            current.timer = setTimeout(() => {
                current.timer = null
            }, delay)
            func(...args)
        }
    }, [current.timer, delay, func])
}
