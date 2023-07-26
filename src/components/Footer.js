import React, { useEffect, useState } from 'react'
import './Footer.css'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'
export default function Footer() {
    const [stock_footer, set_footer] = useState('')
    useEffect(() => {

        if (localStorage.getItem("stock data") != null) {
            let stock_footer_object = []
            console.log("Data is present")
            const data = JSON.parse(localStorage.getItem("stock data"))
            data.forEach(element => {
                stock_footer_object.push(
                    <div className="stock_option">
                        <ul>
                            <li id="stock_-1">{element.symbol}</li>
                            <li id="stock_-2">{element.dayHigh}<FaArrowUp /></li>
                            <li id="stock_-3">{element.dayLow}<FaArrowDown /></li>
                        </ul>
                    </div>
                )
            });
            set_footer(stock_footer_object)
        }
        else {
            set_footer("No data present")
        }
    }, [])
    return (
        <div className="footer">
            <div className="fot_head">
                Current NSE Stocks
            </div>
            <marquee>
                {stock_footer}
            </marquee>
        </div>
    )
}
