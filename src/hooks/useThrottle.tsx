import { useCallback } from "react"

export default function useThrottle(
    func: (searchText: string) => Promise<void>,
    delay: number,
    searchText: string
) {
    let timer: NodeJS.Timeout | null = null
    return useCallback(function f() {
        if (!timer) {
            timer = setTimeout(() => {
                timer = null
            }, delay)
            func(searchText)
        }
    }, [])
}
