import Header from 'components/main/Header'
import Introduce from 'components/main/Introduce'
import React, { useEffect, useState } from 'react'
import 'styles/pages/main.scss'
const stylePrefix = 'page-main'

export default function Main() {
    const [scrollIndex, setScrollIndex] = useState(0)
    const handleScroll = (e: Event) => {
        console.log(e)
    }
    useEffect(() => {
        window.addEventListener('mousewheel', handleScroll)
        return () => {
            window.removeEventListener('mousewheel', handleScroll)
        }
    }, [])
    return (
        <div className={`${stylePrefix}-layout`}>
            <Header />
            <Introduce />
        </div>
    )
}
