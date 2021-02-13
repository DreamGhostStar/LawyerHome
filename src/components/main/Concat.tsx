import React from 'react'
import 'styles/main/concat.scss'
import map from 'images/map.png'
import mapDetailList from 'static/mapDetail.json'
import LazyImg from 'components/common/LazyImg'
const stylePrefix = 'main-concat'
interface ConcatProps {
    height: number;
    scrollIndex: number;
}

export default function Concat({ height, scrollIndex }: ConcatProps) {
    return (
        <div
            className={`${stylePrefix}-layout`}
            style={{
                height
            }}
        >
            <div className={`${stylePrefix}-main`}>
                <h2 className={`${stylePrefix}-title`} >联系我们</h2>
                <div className={`${stylePrefix}-map-layout`}>
                    <div className={`${stylePrefix}-detail`}>
                        {
                            mapDetailList.map((mapDetail, index) => {
                                return <div
                                    key={index}
                                    className={`${stylePrefix}-map-detail`}
                                >
                                    <p className={`${stylePrefix}-detail-title`} >{mapDetail.title}：</p>
                                    <p>{mapDetail.word}</p>
                                </div>
                            })
                        }
                    </div>
                    <LazyImg
                        scrollIndex={scrollIndex}
                        index={2}
                        src={map}
                        className={`${stylePrefix}-map`}
                        alt=""
                    />
                </div>
            </div>
        </div>
    )
}
