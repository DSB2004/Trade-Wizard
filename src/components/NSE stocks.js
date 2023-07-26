import React, { useEffect, useState } from 'react'
import { FaArrowDown, FaArrowUp, FaSpinner } from 'react-icons/fa'
import "./NSEstock.css"
import axios from 'axios'
import Footer from './Footer'
export default function About_stock() {
    const websocket = new WebSocket('ws://localhost');
    let width = window.innerWidth;
    let symbol = JSON.parse(localStorage.getItem('Stock info')).symbol
    let identifier = JSON.parse(localStorage.getItem('Stock info')).identifier
    console.log(symbol)
    const [price_content, set_content] = useState(<div id="loading_div"><FaSpinner className='loading' /></div>)
    const [quotes, set_quotes] = useState(<div id="loading_div"><FaSpinner className='loading' /></div>)
    const [news, set_news] = useState(<div id="loading_div"><FaSpinner className='loading' /></div>)
    const NSEstocks = {
        position: 'absolute',
        top: '130px',
        width: (width - 40).toString() + "px",
        display: 'flex',
        justifyContent: 'center',
        alignItem: 'center',
        padding: '10px',
        flexDirection: "column"
    }
    const options = {
        method: 'GET',
        url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete',
        params: {
            q: symbol,
            region: 'US'
        },
        headers: {
            'X-RapidAPI-Key': '6d4f36e4b1msh78ce1f621098998p1bcf11jsn0784fbe448d2',
            'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
        }
    };
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('Stock info'))
        try {

            set_content(
                <>
                    <ul className='Pricing_info'>
                        <h3>Stock Information</h3>
                        <li className="info" id="info-1"><span>Day High <FaArrowUp />: </span>₹{data.dayHigh}/-</li>
                        <li className="info" id="info-2"><span>Day Low <FaArrowDown />:</span>₹{data.dayLow}/-</li>
                        <li className="info" id="info-3"><span>Opening Price:</span> ₹{data.open}/-</li>
                        <li className="info" id="info-4"><span>Last Price:</span> ₹{data.lastPrice}/-</li>
                        <li className="info" id="info-5"><span>% Change (per day):</span> {data.perChange30d}%</li>
                        <li className="info" id="info-7"><span>Total Traded Value: </span>₹{data.totalTradedValue}/-</li>
                        <li className="info" id="info-8"><span>Total volume of Shares:</span> {data.totalTradedVolume}</li>
                        <li className="info" id="info-6"><span>% Change (per year)</span> {data.perChange365d}%</li>
                        <li className="info" id="info-9"><span>Year High <FaArrowUp />:</span> ₹{data.yearHigh}/-</li>
                        <li className="info" id="info-10"><span>Year Low <FaArrowDown />:</span> ₹{data.yearLow}/-</li>
                    </ul>
                </>
            )
        }
        catch (err) {

            set_content(<h3>Something went wrong...Please try again</h3>)
        }
        let stock_Data
        let test_data = JSON.parse(localStorage.getItem("temp_stock"))
        if (test_data === null) {
            axios.request(options)
                .then((response) => {
                    stock_Data = JSON.stringify(response.data)
                    localStorage.setItem("temp_stock", stock_Data)
                    set_q(stock_Data)
                    set_n(stock_Data)
                })
                .catch((err) => {
                    set_quotes(
                        <div id="loading_div" >
                            <h3 id="error">
                                Error happen while rendering data
                            </h3>
                        </div >
                    )
                    set_news(
                        <div id="loading_div" >
                            <h3 id="error">
                                Error happen while rendering data
                            </h3>
                        </div >
                    )
                })
        }
        else {
            console.log("Data for stock is present")
            stock_Data = JSON.parse(localStorage.getItem("temp_stock"))
            set_q(stock_Data)
            set_n(stock_Data)
        }
        function set_q(data) {
            let q = []
            console.log(data.quotes)
            if (data.quotes.length !== 0) {

                data.quotes.forEach(element => {
                    q.push(
                        <div className="quotes_element">
                            <h4><span>Company Name:</span>{element.longname}</h4>
                            <ul>
                                <li><span>Symbol:</span>{element.symbol}</li>
                                <li><span>Sector:</span>{element.sector}</li>
                                <li><span>Quote Type:</span>{element.quoteType}</li>
                                <li><span>Industry:</span>{element.industry}</li>
                            </ul>
                        </div>
                    )
                });
                set_quotes(q)
            }
            else {
                set_quotes(
                    <div id="loading_div">
                        <h3 id="error">
                            No quote data is present for {symbol}
                        </h3>
                    </div>)
            }

        }
        function set_n(data) {
            console.log(data.news)
            let q = []
            // console.log(data.quotes)
            if (data.news.length !== 0) {

                data.news.forEach(element => {
                    q.push(
                        <div className="quotes_element">
                            <h4>{element.title}</h4>
                            <ul>
                                <a href={element.link}>
                                    <span>Link:</span>{element.link}
                                </a>
                                <li><span>Publisher:</span>{element.publisher}</li>
                            </ul>
                        </div>
                    )
                });
                set_news(q)
            }
            else {
                set_news(
                    <div id="loading_div">
                        <h3 id="error">
                            No news present for {symbol}
                        </h3>
                    </div>)
            }
        }

    }, [])
    return (
        <>
            <div className="NSE_main" style={NSEstocks}>
                <div className="NSE_stock" >
                    <div className="NSE_about">
                        <div className="stock_NSE" id="Pricing_NSE">
                            <h3>
                                Symbol:{symbol}
                            </h3>
                            <h4>
                                Identifier:{identifier}
                            </h4>
                            {price_content}
                        </div>
                    </div>
                    <div className="quotesNSE">
                        <h3>Quotes available on {symbol}
                        </h3>
                        <div className="quotes_div">
                            {quotes}
                        </div>
                    </div>
                </div>
                <div className="News">
                    <h3>News related {symbol}</h3>
                    <div className="innernew">

                        {news}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

