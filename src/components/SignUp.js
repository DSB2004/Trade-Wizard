import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'
import './signup.css'
import google_logo from '../Photos/Google Logo.png'
import { FaSpinner } from 'react-icons/fa'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from './auth'
export default function SignUp() {
    const websocket = new WebSocket('ws://localhost/')
    localStorage.removeItem('user')
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [Error_msg, set_error] = useState(<div id="sign_error"></div>)
    const [user_password, setpassword] = useState('')
    const [Res_msg, set_msg] = useState('')
    const [sign, set_sign] = useState('SignUp with TradeWizard')
    const submit_signup = async (e) => {

        const user_data = { Name: name, Email: email, Password: user_password }
        if (user_data.Email == "") {
            set_error(<div id="sign_error">!!!Email address can't be empty</div>)
        }
        else {
            e.preventDefault()
            console.log(user_data)
            set_msg(<p id="msg"><FaSpinner class="loading_sign" /></p>)
            const websocket = new WebSocket('ws://localhost/SignUp');

            websocket.onopen = () => {
                console.log("Open for incoming messages")
                let signup_data = JSON.stringify(user_data)
                console.log(signup_data)
                websocket.send(signup_data)
                websocket.onmessage = (event) => {
                    console.log(event.data)
                    if (event.data == "All ok") {
                        console.log({ Name: user_data.Name, Email: user_data.Email })
                        localStorage.setItem('user', JSON.stringify({ Name: user_data.Name, Email: user_data.Email }))
                        window.location.href = "/OTP"
                    }
                    else {
                        set_msg(<p id="msg">
                            {event.data}
                        </p>)
                    }
                }

            }
            websocket.onerror = (error) => {
                console.error("WebSocket error:", error);
            };
        }
    }
    function GoogleSignUp() {
        signInWithPopup(auth, provider)
            .then((data) => {
                let photo = data.user.providerData[0].photoURL
                let user_Data = JSON.stringify({ Email: data.user.email, Name: data.user.displayName, photo: photo })
                let websocket_googleSignUp = new WebSocket('ws://localhost/google_signup')
                websocket_googleSignUp.onopen = () => {
                    websocket_googleSignUp.send(user_Data)
                    websocket_googleSignUp.onmessage = (event) => {
                        if (event.data === "All ok") {
                            localStorage.setItem('user', user_Data)
                            // console.log("All ")
                            window.location.href = "/Main"
                        }
                        else {
                            set_msg(<p id="msg">
                                {event.data}
                            </p>)
                        }
                    }
                }
            })

    }
    function inform() {
        let sign_data = localStorage.getItem("To signup")
        if (sign_data != null) {
            set_sign(sign_data = localStorage.getItem("To signup"))
            console.log("Data present")
            localStorage.removeItem("To signup")
        }
        else {
            { }
        }
    }
    useEffect(() => {
        inform()
    }, [])
    return (
        <>

            <section class="signup_sec">
                <div className="signup_div">

                    <h3 id="heading">
                        {sign}
                    </h3>
                    <div className="Google_div">
                        <div class="option" id="google1" onClick={GoogleSignUp}>
                            <img src={google_logo} alt="" />
                            Sign Up with Google
                        </div>
                    </div>
                    <h4 className='seperate'>
                        OR
                    </h4>
                    <div id="sign_in_form">
                        <h4>Fill out these details </h4>
                        <input type="text" onChange={(e) => { setname(e.target.value) }} className="signup" id="signup-1" placeholder="Enter your full name" />
                        <input type="text" onChange={(e) => { setemail(e.target.value) }} className="signup" id="signup-2" placeholder='Enter your Email address' />
                        <input type="password" onChange={(e) => { setpassword(e.target.value) }} className="signup" id="signup-4" placeholder="Create a new Password" />
                        {Error_msg}
                        <button id="btn" onClick={submit_signup}>Submit</button>
                    </div>
                    <div class="option" id="login_page" >
                        <Link to="/SignIn">Have an account...click here</Link>
                    </div>
                    {Res_msg}
                </div>
            </section >
        </>
    )
}
