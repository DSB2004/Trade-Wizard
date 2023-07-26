import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import './Main.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import cors from 'cors'
import { FaSpinner, FaArrowUp, FaArrowDown, FaRegPaperPlane as Send } from 'react-icons/fa'
import audio_2 from "../Audio/send_msg.mp3"
export default function Mainpage() {
    function About_stock(data) {
        localStorage.setItem("Stock info", JSON.stringify(data))
        window.location.href = "/NSE"
    }
    const [news, set_news] = useState('')
    const [stock_data, set_stock] = useState('')
    let News = []
    useEffect(() => {
        try {
            localStorage.removeItem("temp_stock")
            set_news(<FaSpinner />)
            let news_data = JSON.parse(localStorage.getItem('stock_news'))
            news_data
                .forEach(element => {
                    News.push(
                        <div id="news_content">
                            <img src={element.image} alt="" />
                            <div className="innerNews_conc">

                                <h2 id="title" >{element.headline}</h2>
                                <ul>
                                    <li><span>Summary:</span> {element.summary}</li>
                                    <li><span>Publisher:</span> {element.source}</li>
                                    <li><span>More about this: </span> <a href={element.url} target="_blank">{element.url}</a></li>
                                </ul>
                            </div>
                        </div>
                    )
                })
            set_news(News)
            let stock_array = JSON.parse(localStorage.getItem("stock data"));
            let i = 0;
            set_stock(stock_array[i]);
            function render_stock() {
                if (i >= stock_array.length) {
                    i = 0;
                }
                set_stock(stock_array[i]);
                i++;

                setTimeout(render_stock, 10000);
            }
            render_stock();
        }
        catch (err) {
            set_news(<h3>Something went wrong...Please try again</h3>)
        }
    }, [])









    function notification() {
        const audio2 = new Audio(audio_2)
        audio2.play()
    }
    function auto_Scrolling() {
        const messageContainer = document.getElementById('messages');
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }
    const [new_msg, set_new_msg] = useState('')
    const [User_msg, set_msg] = useState('')
    const [History_stack, set_stack] = useState(<div id="loading_div"><FaSpinner className='loading' /></div>)
    const [connection_error, set_error] = useState('')
    const user_data = JSON.parse(localStorage.getItem('user'))
    const user_id = user_data.Email


    async function send_msg(e) {
        e.preventDefault()
        const msg_data = { User_msg, user_id };
        console.log(msg_data)
        const msg_div = document.getElementById("messages");
        try {
            const websocket_s = new WebSocket('ws://localhost/global_send');
            websocket_s.onopen = () => {
                websocket_s.send(JSON.stringify(msg_data));
            }
            let Msg = document.createElement('div');
            Msg.id = "message_User";
            let sender_head = document.createElement('p');
            sender_head.id = "sender_id";
            sender_head.textContent = "You";
            let messageContent = document.createTextNode(User_msg);
            Msg.appendChild(sender_head);
            Msg.appendChild(messageContent);
            msg_div.appendChild(Msg);
        }
        catch (err) {
            set_error("Opps!!Connectivity issue...check your connection")
            console.log(err);
        }

        notification();
        auto_Scrolling();
    }


    function history(ws) {
        let chat_history = []
        console.log("retriving historic message")
        const msg_div = document.getElementById("messages")
        axios.get("http://localhost:90/history", cors())
            .then((response) => {
                set_error('')
                console.log("History chat received")
                response.data.forEach(element => {
                    if (element.user_id === user_id) {
                        chat_history.push(
                            <div id="message_User">
                                <p id="sender_id">You</p>
                                {element.message}
                            </div>
                        )
                    }
                    else {
                        chat_history.push(
                            <div id="message">
                                <p id="sender_id">{element.user_id}</p>
                                {element.message}
                            </div>
                        )
                    }
                });
                set_stack(chat_history)
                auto_Scrolling()
                set_error("")

            })
            .catch((err) => {
                console.log(err)
                set_error("Opps!!Something went wrong ..check your connection and refresh the page")
            })
        ws.onopen = () => {
            console.log("Connection established")
            ws.onmessage = (message) => {
                console.log("new message")
                let response = JSON.parse(message.data)

                console.log(response.length)
                response.forEach(element => {
                    const msg_div = document.getElementById("messages");
                    let Msg = document.createElement('div');
                    Msg.id = "message";
                    let sender_head = document.createElement('p');
                    sender_head.id = "sender_id";
                    sender_head.textContent = element.user_id;
                    let messageContent = document.createTextNode(element.message);
                    Msg.appendChild(sender_head);
                    Msg.appendChild(messageContent);
                    msg_div.appendChild(Msg);
                })
                auto_Scrolling()
            }
        }
        ws.onerror = (err) => {
            console.log(err)
            ws.close()
        }

    }
    useEffect(() => {
        const websocket = new WebSocket('ws://localhost/global_receive');
        history(websocket)
    }, [])
    return (
        <>
            <div className='Main' id="Main-1">
                <div className="stock_d">
                    <h2 id="stock_head">Current NSE Stocks</h2>
                    <h2 id="symbol">{stock_data.symbol}</h2>
                    <h4 id="identifier">Identifier:{stock_data.identifier}</h4>
                    <div className="stock_ul">
                        <ul>
                            <li id="other-1">Open: ₹{stock_data.open}/-</li>
                            <li id="other-2">Last Price: ₹{stock_data.lastPrice}/-</li>
                            <li id="other-3">Day High: ₹{stock_data.dayHigh}/- <FaArrowUp /></li>
                            <li id="other-4">Day Low:{stock_data.dayLow}  <FaArrowDown /></li>
                        </ul>


                    </div>
                    <div className="Stock_btn">
                        <button className='Main_btn' onClick={() => { About_stock(stock_data) }}>More about this Stock</button>
                        <Link to="/Search">
                            <button className='Main_btn'>Explore more stocks</button>
                        </Link>
                    </div >
                </div >
                <div className="global_chat">
                    <div id="chat_">
                        <h3>Global Chat</h3>
                        <div id="messages">
                            {History_stack}
                        </div>
                        <p id="Connection_error">{connection_error}</p>
                    </div>
                    <div className="input_div">
                        <input type="text" onChange={(e) => { set_msg(e.target.value) }} placeholder='Share your thoughts here....' />
                        <Send id="msg_send" onClick={(User_msg) => { send_msg(User_msg) }} />
                    </div>
                </div>
            </div >
            <div className='Main' id="Main-2">
                <div className="news">
                    <h2>Stock Market Updates</h2>
                    <div>
                        {news}
                    </div>
                </div>

            </div>
            <Footer />
        </>

    )

}