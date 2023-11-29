import React from 'react';
import './Result.css'

export default function Result({title, imgsrc, width, height, explain, cls}) {
    return (
        <div className={cls}>
            <div className="resultTitle"><p>{title}</p></div>
            <img src={imgsrc} width={width} height={height}/>
            <div className="resultExplain"><p dangerouslySetInnerHTML={{__html: explain}}></p></div>
        </div>
    );
}

