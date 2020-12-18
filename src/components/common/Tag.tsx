import React from 'react'
import 'styles/common/tag.scss'
import classnames from 'classnames'
const stylePrefix = 'common-tag'
type IType = 'green' | 'blue' | 'red' | 'yellow' | 'orange' | 'purple';
interface TagConfig {
    text: string;
    type: IType;
}

export default function Tag({ text, type }: TagConfig) {

    return (
        <div className={classnames(`${stylePrefix}-layout`, {
            [`${stylePrefix}-${type}`]: type
        })} >
            {text}
        </div>
    )
}