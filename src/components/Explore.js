import React, { useEffect, useState } from 'react'
import { FaSpinner, FaArrowUp, FaArrowDown, FaSearch } from 'react-icons/fa'
import "./Explore.css"
import Footer from './Footer'
export default function Explore() {
    var height = window.innerHeight
    var width = window.innerWidth
    var loading_position_y = (height / 2).toString() + "px"
    var loading_position_x = (width / 2).toString() + "px"
    const loading_style = {
        position: 'absolute',
        top: loading_position_y,
        left: loading_position_x
    }
    var stock_option = []
    const [stock_content, set_stock] = useState(<div id="loading_div" style={loading_style}><FaSpinner className='loading' /></div>)
    var height_stocks = (height - 190).toString() + "px"
    const List = {
        overflowY: 'scroll',
        height: height_stocks,
        margin: '5px 10px',

    }
    const [search, set_search] = useState('')
    function sumbit_search() {
        console.log("Working")
        console.log(search)
        set_stock(<div id="starter">
            <FaSpinner className='loading' />
        </div>
        )
        const data_search = JSON.parse(localStorage.getItem("stock data"))
        const stock_search_option = []
        data_search.forEach(element => {
            if (element.symbol.toLowerCase() == search.toLowerCase()) {

                function About_stock() {
                    localStorage.setItem("To signup", "First...Sign Up with TradeWizard")
                    window.location.href = "/SignUp"
                }
                stock_search_option.push(
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
                set_stock(stock_search_option)
            }
            else {

            }
        });
        console.log(stock_search_option)
        if (stock_search_option.length == 0) {
            set_stock(<div id="starter">
                <h2>
                    No result found
                </h2>
            </div>
            )

        }

    }
    useEffect(() => {
        try {
            if (localStorage.getItem("stock data") != null) {
                console.log("Data is present")
                const data = JSON.parse(localStorage.getItem("stock data"))
                data.forEach(element => {
                    function About_stock() {
                        localStorage.setItem("To signup", "First...Sign Up with TradeWizard")
                        window.location.href = "/SignUp"
                    }
                    stock_option.push(
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
                });
                set_stock(stock_option)
            }
            else {
                set_stock(<div id="starter">
                    <h2>
                        Error in rendering data....Re-directing to Home page
                    </h2>
                    <h4>If the issue persists, please consider refreshing the Home page and waiting for a few moments before trying again. This can help resolve any temporary glitches or network interruptions. Thank you for your patience and understanding. color: white;
                        text-align: center;</h4>
                </div>)
                setTimeout(() => {
                    window.location.href = '/'
                }, 5000);
            }
        }

        catch (err) {
            console.log(err)
        }
    }, [])
    return (
        <>
            <div className="main">

                <div className="searchbar">
                    <input type="text" onChange={(e) => { set_search(e.target.value) }} placeholder="Search for NSE stock using symbols..." />
                    <FaSearch id='searchicon' onClick={sumbit_search} />
                </div>

                <div id="List" style={List}>
                    {stock_content}
                </div>
            </div>
            <Footer />
        </>
    )

}
