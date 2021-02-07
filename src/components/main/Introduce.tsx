import React, { useState } from 'react'
import 'styles/main/introduce.scss'
import homeImg from 'images/home.png'
import cardImg from 'images/card.png'
import classnames from 'classnames'
// import loadingImg from 'images/loading.png'
import personImg from 'images/person.png'
import { Button } from 'antd'
import { useHistory } from 'react-router-dom'
const stylePrefix = 'main-introduce'
const images = [
    cardImg,
    homeImg,
    personImg
]
interface IntroduceProps {
    height: number;
}

export default function Introduce({ height }: IntroduceProps) {
    const history = useHistory()
    const [moveIndex, setMoveIndex] = useState(1) // 图片触摸索引
    const gotoBack = () => {
        history.push('/home')
    }
    return (
        <div
            className={`${stylePrefix}-layout`}
            style={{
                height
            }}
        >
            <div className={`${stylePrefix}-main`}>
                {
                    images.map((image, index) => {
                        return <img
                            key={index}
                            src={image}
                            className={classnames(`${stylePrefix}-image`, {
                                [`${stylePrefix}-image-big`]: moveIndex === index
                            })}
                            onMouseOver={() => setMoveIndex(index)}
                            onMouseOut={() => setMoveIndex(1)}
                            alt="图片"
                        />
                    })
                }
            </div>
            <Button
                type='primary'
                className={`${stylePrefix}-button`}
                onClick={gotoBack}
            >进入后台</Button>
        </div>
    )
}
