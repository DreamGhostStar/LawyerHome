import React from 'react'
import 'styles/main/header.scss'
import classnames from 'classnames'
import navList from 'static/navList.json'

const stylePrefix = 'main-header'

interface HeaderProps {
    scrollIndex: number;
    setScrollIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function Header({ scrollIndex, setScrollIndex }: HeaderProps) {
    const callback = (key: any) => {
        console.log(key);
    }
    return (
        <div className={`${stylePrefix}-layout`} >
        <h2 className={`${stylePrefix}-header-title`} >律政云</h2>
            <div className={`${stylePrefix}-nav-layout`} >
                {
                    navList.map((nav, index) => {
                        return <nav
                            key={index}
                            className={classnames(`${stylePrefix}-nav-item`, {
                                [`${stylePrefix}-nav-item-active`]: scrollIndex === index
                            })}
                            onClick={() => setScrollIndex(index)}
                        >
                            {nav}
                        </nav>
                    })
                }
            </div>
        </div>
    )
}
