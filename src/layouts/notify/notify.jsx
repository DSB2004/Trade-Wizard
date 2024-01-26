import React from 'react';
import { useSelector } from 'react-redux';
import './notify.css';

export default function Notify() {
    const darkTheme = useSelector(state => state.Theme);
    const { status, content } = useSelector(state => state.Notify);
    return (
        <>
            <div className={`notify flex-left flex-column trans-500 ${darkTheme ? 'dark-sub-container dark-mode' : 'light-sub-container light-mode'} ${status ? 'open-notify' : 'close-notify'}`}>
                <h2 className={`${darkTheme ? 'dark-text' : 'light-text'} notify-h2`}>{content && content.header}</h2>
                <h4 className={`${darkTheme ? 'dark-text' : 'light-text'} notify-h4`}>{content && content.message}</h4>
                <div className={`notify-loader ${status ? 'to-load' : ''}`}></div>
            </div>
        </>
    );
}