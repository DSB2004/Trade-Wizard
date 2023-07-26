import React, { useState } from 'react'
import Footer from './Footer'
import './search.css'
import axios from 'axios'
import { FaSearch, FaArrowUp, FaArrowDown, FaSpinner } from 'react-icons/fa'
export default function Search() {
    const websocket = new WebSocket('ws://localhost/');
    const [msg, set_msg] = useState('')
    const [output, set_output] = useState('')
    const [search, set_search] = useState('')
    const [type, set_type] = useState('')
    let height = window.innerHeight
    let width = window.innerWidth
    const search_style = {
        position: 'relative',
        top: '100px',
        left: '0px',
        width: (width - 30).toString() + 'px',
        height: (height - 200).toString() + 'px',
        margin: 'auto',
    }

    let data_nse = JSON.parse(localStorage.getItem('stock data'))
    async function Searching(type_stock) {
        try {
            if (search !== '' && type !== '') {
                set_msg('')
                set_output(
                    <div id="loading_div"><FaSpinner className='loading' /></div>
                )
                let data_search = search.toUpperCase();
                console.log(data_search, type_stock);
                if (type === "NSE") {
                    localStorage.removeItem("temp_stock")
                    let check = 0
                    data_nse.forEach(element => {
                        if (element.symbol === data_search) {
                            check++
                            function About_stock() {
                                localStorage.setItem("Stock info", JSON.stringify(element))
                                window.location.href = "/NSE"
                            }
                            set_output(
                                < div id="Stock_div" >
                                    <div className="intro">
                                        <h2 id="company_name">{element.symbol}</h2>
                                        <h4 id="identifier">Identifier:{element.identifier}</h4>
                                    </div>
                                    <div className="other_info">
                                        <ul>
                                            <li className="others" id="other-1">Open: ₹{element.open}/-</li>
                                            <li className="others" id="other-2">Last Price: ₹{element.lastPrice}/-</li>
                                            <li className="others" id="other-3">Day High: ₹{element.dayHigh}/- <FaArrowUp /></li>
                                            <li className="others" id="other-4">Day Low:{element.dayLow}  <FaArrowDown /></li>
                                        </ul>
                                    </div>
                                    <div id="more"><button onClick={About_stock}>More about this stock</button></div>
                                </div >
                            )
                        }
                    });
                    if (check === 0) {
                        {
                            set_output(<h2 id="loading_div">No stock with symbol {data_search} found in NSE database</h2>)
                        }
                    }
                }
                else if (type === "INT") {
                    console.log(data_search)
                    console.log("INT")
                    const currentDate = new Date();
                    const year = currentDate.getFullYear();
                    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                    const day = String(currentDate.getDate() - 1).padStart(2, '0');
                    const date = `${year}-${month}-${day}`
                    console.log(date)
                    console.log(typeof date)
                    let response = await axios.get(`https://api.polygon.io/v1/open-close/${data_search}/${date}?adjusted=true&apiKey=UT0U72RKnzmaVNpuabCHYmFMmqWXkUJi`);

                    if (response.data.queryCount === 0) {
                        set_output(<h2 id="notFound">No stock with symbol {data_search} found in database</h2>)
                    }
                    else {
                        if (data_search !== '') {
                            let element = response.data
                            console.log(element)
                            function About_stock() {
                                localStorage.setItem("Stock info", JSON.stringify(element))
                                window.location.href = "/INT"
                            }
                            set_output(
                                < div id="Stock_div" >
                                    <div className="intro">
                                        <h2 id="company_name">{element.symbol}</h2>
                                        <h4 id="identifier">{element.identifier}</h4>
                                    </div>
                                    <div className="other_info">
                                        <ul>
                                            <li className="others" id="other-1">Open: ${element.open}/-</li>
                                            <li className="others" id="other-2">Last Price: ${element.close}/-</li>
                                            <li className="others" id="other-3">Day High: ${element.high}/- <FaArrowUp /></li>
                                            <li className="others" id="other-4">Day Low:{element.low}  <FaArrowDown /></li>
                                        </ul>
                                    </div>
                                    <div id="more"><button onClick={About_stock}>More about this stock</button></div>
                                </div >
                            )
                        }
                        else {
                            set_output(<h2 id="loading_div">No stock with symbol {data_search} found in database</h2>)
                        }
                    }
                }
            }
            else {

                set_msg("Symbol or type missing. Please enter valid information or refresh the page and try again")
            }
        }
        catch (err) {
            if (err.response.status === 404) {
                set_output(<h2 id="loading_div">No stock with symbol {search} found in database</h2>)
            }
            else if (err.response.status === 429) {
                set_output(<h2 id="loading_div">To many request....please try again later</h2>)
            }
            else if (err.response.status === 503) {
                set_output(<h2 id="loading_div">Service unavailable...please try again later</h2>)
            }
        }
    }

    return (
        <>

            <div id="search" style={search_style}>
                <div id="search_div">
                    <input type="type" id="searchbar" onChange={(e) => { set_search(e.target.value) }} placeholder="Search for NSE and International stocks..." />
                    <select id="dropbar" onChange={(e) => { set_type(e.target.value) }}>
                        <option value="">Select Type</option>
                        <option value="NSE">NSE (Domestic)</option>
                        <option value="INT">International</option>
                    </select>
                    <FaSearch id="searchicon" onClick={() => Searching(type)} />
                    {/* <FiArrowUp id="searchicon" /> */}

                </div>
                <p id="error_msg">{msg}</p>
                <div className="search_output">
                    {output}
                </div>
            </div>
            <Footer />
        </>
    )
}
