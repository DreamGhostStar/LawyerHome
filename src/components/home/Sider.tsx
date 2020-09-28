import React from 'react'
import 'styles/home/sider.scss'
import siderData from 'static/sider.json'
import { IconFont } from 'components/common/utils'

const stylePrefix = 'home-sider'

interface SiderConfig {
    activeIndex: number
    setActiveSiderIndex: React.Dispatch<React.SetStateAction<number>>
}

export default function Sider({ activeIndex, setActiveSiderIndex }: SiderConfig) {
    return (
        <div className={`${stylePrefix}-layout`}>
            {
                siderData.map((siderItem, index) => {
                    return <div
                        key={index}
                        className={`${stylePrefix}-sider-item`}
                        onClick={() => setActiveSiderIndex(index)}
                    >
                        <IconFont type={siderItem.icon} className={`${stylePrefix}-sider-icon`} />
                        <p className={`${stylePrefix}-sider-title`}>{siderItem.title}</p>
                    </div>
                })
            }
            <div
                className={`${stylePrefix}-shadow`}
                style={{
                    top: 60 * activeIndex
                }}
            >
            </div>
        </div>
    )
}
