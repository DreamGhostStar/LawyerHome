import React from 'react'
import Loading2 from './Loading2';
const Loading = (props: {
    error: any;
    retry: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
    timedOut: any;
    pastDelay: any;
}) => {
    if (props.error) {
        return (
            <button onClick={props.retry} >重新加载</button>
        );
    } else if (props.timedOut) {
        return <button onClick={props.retry} >重新加载</button>
    } else if (props.pastDelay) {
        return <div style={{
            width: '100%',
            height: '100%'
        }}>
            <Loading2 />
        </div>;
    } else {
        return null;
    }
};

export default Loading;