import React from 'react'
import 'styles/main/concat.scss'
const stylePrefix = 'main-concat'
interface ConcatProps {
    height: number;
}

export default function Concat({ height }: ConcatProps) {
    return (
        <div
            className={`${stylePrefix}-layout`}
            style={{
                height
            }}
        >
            <h2 className={`${stylePrefix}-title`} >联系我们</h2>
        </div>
    )
}
