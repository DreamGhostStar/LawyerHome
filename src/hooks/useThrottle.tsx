import { useCallback } from "react"

export default function UseThrottle(
    func: any,
    delay: number
) {
    let timer: NodeJS.Timeout | null = null
    return useCallback((...args) => {
        if (!timer) {
            timer = setTimeout(() => {
                timer = null
            }, delay)
            func(...args)
        }
    }, [timer])
}
