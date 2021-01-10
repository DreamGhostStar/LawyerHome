import React, { FC } from 'react'
import Loading2 from './Loading2'
interface LoadingConfig {
    loading: boolean
}

const LoadingWidget: FC<LoadingConfig> = (props) => {
    const { children, loading } = props
    return (
        <>
            {
                loading
                    ? <Loading2 />
                    : children
            }
        </>
    )
}

export default LoadingWidget