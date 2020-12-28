import { InputNumber } from 'antd'
import React from 'react'

interface CouterStepConfig {
    value: number;
    callback: (value: number) => void;
}

export default function CouterStep({ value, callback }: CouterStepConfig) {
    const onChange = (inputValue: number | string | undefined) => {
        callback(inputValue as number)
    }
    return (
        <InputNumber size="small" min={1} max={100} value={value} onChange={onChange} />
    )
}
