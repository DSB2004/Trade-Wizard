import React, { useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
export default function OTP() {
    let userData = JSON.parse(localStorage.getItem('user'))
    const [OTP, setOTP] = useState('')
    const [Res_msg, set_msg] = useState('')
    const submit_otp = async (e) => {
        e.preventDefault()
        const otp_data = { "OTP": OTP }
        console.log(otp_data)
        // console.log(otp_obj)
        const websocket_OTP = new WebSocket('ws://localhost/OTP');
        websocket_OTP.onopen = () => {
            websocket_OTP.send(JSON.stringify(OTP))
            set_msg(<FaSpinner class="loading_sign" />)
            websocket_OTP.onmessage = (event) => {
                console.log(event.data)
                if (event.data === "All ok") {
                    window.location.href = "/Main"
                }
                else {
                    set_msg(
                        <p id="msg">Wrong OTP</p>
                    )
                    setTimeout(() => {
                        set_msg('')
                    }, 2000);
                }

            }
        }
    }
    return (
        <>

            <section class="OTP_sec">
                <div className="OTP_div">
                    <h3 id="heading">
                        Signing up with TradeWizard
                    </h3>

                    <div id="sign_in_form">
                        <h4> Enter the OTP received on {userData.Email}</h4>
                        <input type="text" onChange={(e) => { setOTP(e.target.value) }} className="signup" id="signup-1" placeholder="Enter the OTP " />
                        <button id="btn" onClick={submit_otp}>Submit</button>
                    </div>
                    {Res_msg}
                </div>
            </section >
        </>
    )
}
