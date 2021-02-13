import React, { FC, useEffect, useRef, useState } from 'react'

interface BaseLazyImgProps {
    src: string;
    scrollIndex: number;
    index: number;
}

type LazyImgProps = BaseLazyImgProps & React.ImgHTMLAttributes<HTMLImageElement>

const LazyImg: FC<LazyImgProps> = (props) => {
    const { src, scrollIndex, index, ...restProps } = props;
    const ref = useRef<HTMLImageElement>(null)
    const [isRender, setIsRender] = useState(false)

    const isIn = () => {
        if (ref.current) {
            console.log(scrollIndex)
            if (Math.abs(index - scrollIndex) <= 1) {
                return true
            }

            return false
        } else {
            return false
        }
    }

    const loadImg = () => {
        if (ref.current) {
            ref.current.src = src
            setIsRender(true)
        }
    }

    const check = () => {
        if (isRender) {
            return
        }
        if (isIn()) {
            loadImg()
        }
    }

    useEffect(() => {
        window.addEventListener('mousewheel', check)
        return () => {
            window.removeEventListener('mousewheel', check)
        }
    }, [scrollIndex])

    return <img ref={ref} data-src={src} {...restProps} />
}

export default LazyImg