import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import "./slider-menu.css"
import CoverBtn from "../cover-btn/cover-btn"
import { IoClose } from 'react-icons/io5';
import { SignOutFromTradeWizard } from "../../firebase/auth/email-user";


const SliderList = ({ text, func, toggle }) => {
    const darkTheme = useSelector(state => state.Theme)
    return (
        <>
            <li
                className={`margin-20-0 ${darkTheme ? "dark-text" : "light-text"} slider-menu-list `}
                onClick={() => {
                    toggle(false);
                    if (func) {
                        func()
                    }
                }}>{text}</li>
        </>
    )
}

export default function SliderMenu({ isOpen, changeFunc, NavList, user }) {
    const [navContent, updateContent] = useState([])
    useEffect(() => {
        updateContent([])
        if (NavList) {
            NavList.forEach(item => {
                updateContent((prevState) => [...prevState, <SliderList toggle={changeFunc} text={item.text} func={item.func} />])
            })
        }

    }, [NavList])

    const darkTheme = useSelector(state => state.Theme)
    return (
        <>
            <div className={` flex-left flex-column trans-500  slider-menu ${darkTheme ? "dark-mode" : "light-mode"} ${isOpen ? "open-menu" : "close-menu"}`}>

                <div className='margin-5 flex-center full-width'>
                    <IoClose onClick={() => { changeFunc(false) }} className={`slider-menu-toggle-btn trans-500 margin-10 ${darkTheme ? "dark-text" : "light-text"}`} />
                </div>
                <h1 className={`${darkTheme ? "dark-text dark-shadow" : "light-text light-shadow"} slider-menu-heading margin-10 `}> Trade Wizard</h1>
                <ul className='slider-menu-ul'>
                    {navContent}
                </ul>
                {user ?
                    < div className=' slider-user-section margin-10'>
                        <h2 className="slider-username margin-5">
                            {user.name}
                        </h2>
                        <h4 className="slider-userid margin-5">
                            {user.email}
                        </h4>
                        <CoverBtn text="Logout" bgColor="red" func={() => { SignOutFromTradeWizard() }} />
                    </div> : <></>}
            </div >


        </>
    )
}
