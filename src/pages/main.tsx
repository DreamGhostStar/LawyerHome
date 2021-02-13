import Concat from 'components/main/Concat'
import Download from 'components/main/Download'
import Header from 'components/main/Header'
import Introduce from 'components/main/Introduce'
import React, { useEffect, useState } from 'react'
import 'styles/pages/main.scss'
const stylePrefix = 'page-main'

export default function Main() {
    const [scrollIndex, setScrollIndex] = useState(0) // 滚动的索引
    const [height, setHeight] = useState(document.body.clientHeight - 60)
    const handleScroll = (e: any) => {
        if (e.wheelDelta < 0 && scrollIndex !== 2) {
            setScrollIndex(scrollIndex + 1)
        }

        if (e.wheelDelta > 0 && scrollIndex !== 0) {
            setScrollIndex(scrollIndex - 1)
        }
    }
    const handleWindowChange = (e: Event) => {
        const clientHeight = document.body.clientHeight
        setHeight(clientHeight - 60)
    }
    // 监听滚轮滚动
    useEffect(() => {
        window.addEventListener('mousewheel', handleScroll)
        return () => {
            window.removeEventListener('mousewheel', handleScroll)
        }
    }, [scrollIndex])
    useEffect(() => {
        window.addEventListener('resize', handleWindowChange)
        return () => {
            window.removeEventListener('resize', handleWindowChange)
        }
    }, [])
    return (
        <div className={`${stylePrefix}-layout`}>
            <Header
                scrollIndex={scrollIndex}
                setScrollIndex={setScrollIndex}
            />
            <div
                style={{
                    position: 'relative',
                    top: -height * scrollIndex
                }}
                className={`${stylePrefix}-main`}
            >
                <Download height={height} />
                <Introduce height={height} scrollIndex={scrollIndex} />
                <Concat height={height} scrollIndex={scrollIndex} />
            </div>
        </div>
    )
}
