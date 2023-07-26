import React, { useEffect, useState } from 'react'
import './header.css'
import Logo1 from "../Photos/Light Logo.png"
import Logo2 from '../Photos/Dark Logo.png'
import User from '../Photos/default_user_pic.png'
import background1 from '../Photos/background6.jpg'
import background2 from '../Photos/background1.jpg'
import { FaSignOutAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
export default function Header({ onValueChange }) {
    const [Logo, set_logo] = useState(Logo1)
    const [change, set_change] = useState(false)
    const [status, set_status] = useState(false)
    function open_menu() {
        const menu = document.getElementById('Ham_menu')
        if (status === false) {
            menu.style.display = "flex"
            set_status(true)
        }
        else {
            menu.style.display = "none"
            set_status(false)
        }
    }
    function close_menu() {
        const menu = document.getElementById('Ham_menu')
        if (status === true) {
            menu.style.display = "none"
            set_status(false)
        }
        else {
            menu.style.display = "flex"
            set_status(true)
        }
    }
    function change_theme() {
        let push_btn = document.getElementById("push_btn")
        let stylebtn = document.getElementById("stylebtn")
        let drop_menu = document.getElementById('Ham_menu')
        console.log("working")
        if (change == false) {
            onValueChange(background1)
            drop_menu.style.backgroundColor = "rgb(44, 44, 44)"
            push_btn.style.marginRight = "3px"
            push_btn.style.marginLeft = "auto"
            push_btn.style.backgroundColor = "black"
            push_btn.style.borderColor = "black"
            stylebtn.style.borderColor = "black"
            stylebtn.style.backgroundColor = "rgb(148, 147, 147)"
            set_logo(Logo2)
            set_change(true)
            localStorage.setItem("Theme", "Dark")
            console.log(localStorage.getItem('Theme'))
        }
        else if (change === true) {
            onValueChange(background2)
            drop_menu.style.backgroundColor = "white"
            push_btn.style.marginLeft = "3px"
            push_btn.style.marginRight = "auto"
            push_btn.style.backgroundColor = "white"
            push_btn.style.borderColor = "white"
            stylebtn.style.borderColor = "white"
            stylebtn.style.backgroundColor = "rgb(189, 189, 189)"
            set_logo(Logo1)
            set_change(false)
            localStorage.setItem("Theme", "Light")
            console.log(localStorage.getItem('Theme'))
        }
    }

    const [account, set_account] = useState('')
    useEffect(() => {
        let push_btn = document.getElementById("push_btn")
        let stylebtn = document.getElementById("stylebtn")
        let drop_menu = document.getElementById('Ham_menu')
        if (localStorage.getItem("Theme") === "Dark") {
            console.log("Auto setting the theme to dark")
            onValueChange(background1)
            drop_menu.style.backgroundColor = "rgb(44, 44, 44)"
            push_btn.style.marginRight = "3px"
            push_btn.style.marginLeft = "auto"
            push_btn.style.backgroundColor = "black"
            push_btn.style.borderColor = "black"
            stylebtn.style.borderColor = "black"
            stylebtn.style.backgroundColor = "rgb(148, 147, 147)"
            set_logo(Logo2)
        }
        else if (localStorage.getItem("Theme") === "Light") {
            console.log("Auto setting the theme to light")
            onValueChange(background2)
            push_btn.style.marginLeft = "3px"
            push_btn.style.marginRight = "auto"
            push_btn.style.backgroundColor = "white"
            push_btn.style.borderColor = "white"
            stylebtn.style.borderColor = "white"
            stylebtn.style.backgroundColor = "rgb(189, 189, 189)"
            drop_menu.style.backgroundColor = "white"
            set_logo(Logo1)
        }
        if (localStorage.getItem("user") !== null) {
            let Account = JSON.parse(localStorage.getItem("user"))
            console.log(Account[1])
            if (!Account.photo) {
                set_account(<>
                    <div className='user_info'>
                        <h5 >{Account.Name}</h5>
                        <h6 >{Account.Email}</h6>
                    </div>
                    <img src={User} id="User_pic" alt="" />
                    <FaChevronDown id="up_btn" onClick={open_menu} />
                </>)
            }
            else if (Account.photo) {
                set_account(<>
                    <div className='user_info'>
                        <h5 >{Account.Name}</h5>
                        <h6 >{Account.Email}</h6>
                    </div>
                    <img src={Account.photo} id="Google_pic" alt="" />
                    <FaChevronDown id="up_btn" onClick={close_menu} />
                </>)
            }
        }
        else {
            let dropmenu = document.getElementById("Ham_menu")
            dropmenu.style.pointerEvents = "none"
            console.log("testing")
        }


    }, [])
    function SignOut() {
        window.location.href = "/"
    }
    return (
        <>
            <div id="header">
                <img src={Logo} alt="" id="Logo" />
                <h3 className="head">
                    TradeWizard
                </h3>



                <div className="user">
                    {account}
                </div>
            </div>
            <div className="drop_menu" id="Ham_menu">
                <div className="innermenu">

                    <div id="stylebtn" onClick={change_theme}>
                        <div id="push_btn"  >
                        </div>
                    </div>
                    <Link to="/Search" className="options" id="option-1"><div className="menu_div">Search</div></Link>
                    <Link to="/Main" className="options" id="option-2"><div className="menu_div">Home</div></Link>
                    <Link onClick={SignOut} className="options" id="option-3"><div className="menu_div" ><FaSignOutAlt id="logout" />LogOut</div></Link>

                </div>
                <FaChevronUp id="close_btn" onClick={close_menu} />
            </div>
        </>
    )
}
