import React, { useState } from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'
import './signup.css'
import google_logo from '../Photos/Google Logo.png'
import { FaSpinner } from 'react-icons/fa'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from './auth'
export default function SignIn() {
    const websocket=new WebSocket('ws://localhost/')
    localStorage.removeItem('user')
    function GoogleSignIn() {
        signInWithPopup(auth, provider)
            .then((data) => {
                let user_Data = JSON.stringify({ Email: data.user.email, Name: data.user.displayName, photo: data.user.providerData[0].photoURL })
                let websocket_googleSignUp = new WebSocket('ws://localhost/googleSignIn')
                websocket_googleSignUp.onopen = () => {
                    websocket_googleSignUp.send(user_Data)
                    websocket_googleSignUp.onmessage = (event) => {
                        console.log(event.data)
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
    const [email, setemail] = useState('')
    const [user_password, setpassword] = useState('')
    const [Res_msg, set_msg] = useState('')
    const [Error_msg, set_error] = useState(<div id="sign_error"></div>)
    const submit_signup = async (e) => {
        const user_data = { Email: email, Password: user_password }
        console.log(user_data.Email)
        if (user_data.Email == "") {
            set_error(<div id="sign_error">!!!User Name can't be empty</div>)
        }
        else {
            e.preventDefault()
            console.log(user_data)
            const websocket = new WebSocket('ws://localhost/SignIn');
            set_msg(<FaSpinner class="loading_sign" />)
            websocket.onopen = () => {
                console.log("Open for incoming messages")
                let signup_data = JSON.stringify(user_data)
                console.log(signup_data)
                websocket.send(signup_data)
                websocket.onmessage = (event) => {
                    const data = JSON.parse(event.data)
                    if (data[1] == "All ok") {
                        localStorage.setItem('user', JSON.stringify({ Name: data[0], Email: user_data.Email }))
                        window.location.href = "/Main"
                    }
                    else {
                        set_msg(data[1])
                    }
                }

            }
            websocket.onerror = (error) => {
                console.error("WebSocket error:", error);
            };
        }
    }

    return (
        <>

            <section class="signup_sec">
                <div className="signup_div">

                    <h3 id="heading">
                        Sign In to your account
                    </h3>
                    <div className="Google_div" onClick={GoogleSignIn}>
                        <div class="option" id="google1" >
                            <img src={google_logo} alt="" />
                            SignIn with Google
                        </div>
                    </div>
                    <h4 className='seperate'>
                        OR
                    </h4>
                    <div id="sign_in_form">
                        <h4>Fill out these details </h4>
                        <input type="text" onChange={(e) => { setemail(e.target.value) }} className="signup" id="signup-2" placeholder='Enter your Email address' />
                        <input type="password" onChange={(e) => { setpassword(e.target.value) }} className="signup" id="signup-4" placeholder="Create a new Password" />
                        {Error_msg}
                        <button id="btn" onClick={submit_signup}>Submit</button>
                    </div>
                    <div class="option" id="login_page" >
                        <Link to="/SignUp">Dont have an account...click here</Link>
                    </div>
                    <p id="msg">{Res_msg}</p>

                </div>
            </section >
        </>
    )
}