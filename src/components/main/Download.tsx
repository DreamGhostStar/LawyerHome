import React from 'react'
import 'styles/main/download.scss'
import logo from 'images/logo.png'
import model from 'images/model.png'
import word from 'static/downloadWord.json'
import homeImg from 'images/home.png'
const stylePrefix = 'main-download'
interface DownloadProps {
    height: number;
}

export default function Download({ height }: DownloadProps) {
    return (
        <div
            className={`${stylePrefix}-layout`}
            style={{
                height
            }}
        >
            <div className={`${stylePrefix}-main`}>
                <div className={`${stylePrefix}-main-layout`} >
                    <div className={`${stylePrefix}-introduce`} >
                        <img src={logo} alt="logo" className={`${stylePrefix}-logo`} />
                        <div className={`${stylePrefix}-word-layout`}>
                            {
                                word.map((wordItem, index) => {
                                    return <p
                                        key={index}
                                    >
                                        {wordItem}
                                    </p>
                                })
                            }
                        </div>
                    </div>
                    <div className={`${stylePrefix}-button-layout`}>
                        <div
                            className={`${stylePrefix}-button ${stylePrefix}-android-button`}
                        >安卓下载</div>
                        <div
                            className={`${stylePrefix}-button ${stylePrefix}-ios-button`}
                        >ios下载</div>
                    </div>
                </div>
                <div className={`${stylePrefix}-image-layout`} >
                    <img
                        src={homeImg}
                        alt="首页"
                        className={`${stylePrefix}-show-img`}
                    />
                    <img
                        src={model}
                        alt="模型"
                        className={`${stylePrefix}-model`}
                    />
                </div>
            </div>
        </div>
    )
}
