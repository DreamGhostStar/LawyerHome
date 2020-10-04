import React from 'react'
import 'styles/common/loading2.scss'

const stylePrefix = 'common-loading2'

interface LoadingConfig {
    backgroundColor?: string
}
// TODO: 需要修改loading样式
export default function Loading2({ backgroundColor = '#fff' }: LoadingConfig) {
    return (
        <div
            className={`${stylePrefix}-layout`}
            style={{
                backgroundColor: (backgroundColor)
            }}
        >
            <div className={`${stylePrefix}-item ${stylePrefix}-item-1`}></div>
            <div className={`${stylePrefix}-item ${stylePrefix}-item-2`}></div>
            <div className={`${stylePrefix}-item ${stylePrefix}-item-3`}></div>
            <div className={`${stylePrefix}-item ${stylePrefix}-item-4`}></div>
            <div className={`${stylePrefix}-item ${stylePrefix}-item-5`}></div>
        </div>
    )
}
