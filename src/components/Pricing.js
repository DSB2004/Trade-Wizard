import React, { useState } from 'react'
import './pricing.css'
import Header from './Header'
import Footer from './Footer'
import { FaSpinner } from 'react-icons/fa'
export default function Pricing() {
    const div_style = {
        display: 'flex',
        flexDirection: 'column',
        color: 'transparent',
        position: 'relative',
        top: '100px',
        // left: '0px',
        // border: 'solid white 2px',
        justifyContent: 'center',
        borderRadius: '30px',
        margin: 'auto',
        backdropFilter: 'blur(20px)',
        // padding: '20px',
        height: (window.innerHeight - 200).toString() + "px",
        width: (window.innerWidth - 250).toString() + "px"
    }
    const data = JSON.parse(localStorage.getItem("user"))
    const [button_Render, set_render] = useState(<button className="btn_" id="btn" onClick={account}>Select</button>)
    function account() {
        console.log(["Basic", data.Email])
        const websocket_account = new WebSocket('ws://localhost/Account')
        websocket_account.onopen = () => {
            websocket_account.send(JSON.stringify(["Basic", data.Email]))
        }
        set_render(<p id="msg"><FaSpinner class="loading_sign" /></p>)
        setTimeout(() => {
            window.location.href = "/Main"
        }, 1000);

    }
    return (
        <>
            <div className="Plans_div" style={div_style}>
                <h2 className="plan_head">"Seamless Billing Solutions: Empowering Your Trading Journey"</h2>
                <div className="plans">
                    <div class="plan" id="plan-1">
                        <h3>
                            Basic Plan
                        </h3>
                        <ul>
                            <li>Access to latest NSE stock data</li>
                            <li>Access to international market stock data</li>
                            <li>Graphical analysis over a period of 1 year</li>
                            <li>Billing: Free</li>

                        </ul>
                        {button_Render}
                    </div>
                    <div class="plan" id="plan-2">
                        <h3>
                            Advance Plan
                        </h3>
                        <ul>
                            <li>Access to latest NSE stock data</li>
                            <li>Access to international market stock data</li>
                            <li>Graphical analysis over a period of 5 year</li>
                            <li>
                                Access to personal chat with market Professionals
                            </li>
                            <li>AI driven stock analysis</li>
                        </ul>
                        <div className="btn_" id="btn">Coming soon</div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}
