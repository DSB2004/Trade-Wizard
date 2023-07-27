import React, { useEffect, useState } from 'react'
import stock from '../Photos/stock.png'
import './Home.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FaEnvelope, FaPhone, FaGithub } from 'react-icons/fa'
export default function Home() {
    const websocket = new WebSocket('ws://localhost/')
    const about_us = {
        position: 'absolute',
        top: (window.innerHeight).toString() + 'px',
        width: '100%'

    }
    const content = {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        position: 'absolute',
        top: (window.innerHeight / 2 - 200).toString() + "px",
        width: '100%',
        flexDirection: 'column'
    }
    localStorage.setItem("Theme", "Light")
    localStorage.removeItem('user')
    const [NSE_data, set_data] = useState('')

    const options = [{
        method: 'GET',
        url: 'https://latest-stock-price.p.rapidapi.com/price',
        params: {
            Indices: 'NIFTY 200'
        },
        headers: {
            'X-RapidAPI-Key': '6d4f36e4b1msh78ce1f621098998p1bcf11jsn0784fbe448d2',
            'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com'
        }
    }, {
        method: 'GET',
        url: 'https://latest-stock-price.p.rapidapi.com/price',
        params: {
            Indices: 'NIFTY 50'
        },
        headers: {
            'X-RapidAPI-Key': '6d4f36e4b1msh78ce1f621098998p1bcf11jsn0784fbe448d2',
            'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com'
        }
    }, {
        method: 'GET',
        url: 'https://latest-stock-price.p.rapidapi.com/price',
        params: {
            Indices: 'NIFTY NEXT 50'
        },
        headers: {
            'X-RapidAPI-Key': '6d4f36e4b1msh78ce1f621098998p1bcf11jsn0784fbe448d2',
            'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com'
        }
    }, {
        method: 'GET',
        url: 'https://latest-stock-price.p.rapidapi.com/price',
        params: {
            Indices: 'NIFTY 100'
        },
        headers: {
            'X-RapidAPI-Key': '6d4f36e4b1msh78ce1f621098998p1bcf11jsn0784fbe448d2',
            'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com'
        }
    }]
    function About_scroll() {
        const element = document.getElementById("about");
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
    function contact_scroll() {
        const element = document.getElementById("contact_us");
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const NSE_stock = [];
            for (let i = 0; i < 4; i++) {
                try {
                    const response = await axios.request(options[i]);
                    response.data.forEach((element) => {
                        NSE_stock.push(element);
                    });
                } catch (error) {
                    console.error(error);
                }
            }
            set_data(NSE_stock);
            console.log(NSE_stock);
            localStorage.setItem('stock data', JSON.stringify(NSE_stock));
        };

        if (localStorage.getItem('stock data') === null) {
            console.log('No data is present, data has to be requested');
            fetchData();
        } else {
            console.log('Data is present');
            localStorage.removeItem('stock data')
            fetchData();

        }

    }, [])
    useEffect(() => {
        axios.get('https://finnhub.io/api/v1/news?category=general&token=cirvo8hr01quup9n46hgcirvo8hr01quup9n46i0')
            .then((response) => {
                console.log(response.data)
                if (localStorage.getItem === null) {
                    localStorage.setItem('stock_news', JSON.stringify(response.data))
                }
                else {
                    localStorage.removeItem('stock_news')
                    localStorage.setItem('stock_news', JSON.stringify(response.data))
                }
            })
    }, [])
    return (
        <>
            <div className="nav">
                <button onClick={About_scroll} class="but">About Us</button>
                <button class="but" onClick={contact_scroll}>Contact Us</button>
                <Link to="/Explore"><button class="but">Explore</button></Link>
            </div >
            <div class="content" style={content}>
                <div class="text">
                    <div class="title" id="title-1">Know about stocks with TradeWizard</div>
                    <div class="title" id="title-2">Stay Ahead of the Market with Real-Time Stock Intelligence</div>
                </div>
                <div id="button_div">
                    <Link to="/SignIn"><button class="home_btn">Sign In</button></Link>
                    <Link to="/SignUp"><button class="home_btn">Sign Up</button></Link>
                </div>
            </div >
            <div className="aboutus/ContactUs" id="about" style={about_us}>
                <div className="about">

                    <h2>
                        About Us
                    </h2>
                    <p id="top">
                        <div id="gap"></div>Welcome to our cutting-edge online stock market data web app! We are dedicated to providing traders, investors, and financial enthusiasts with real-time and comprehensive data for both the National Stock Exchange NSE and global markets. Our mission is to empower you with the tools and information necessary to make informed decisions and navigate the dynamic world of stocks and investments with confidence.
                    </p>
                    <span>

                        What We Offer
                    </span>
                    <p>

                        Real-Time Data: We understand the importance of up-to-the-minute information in the fast-paced world of trading. Our web app provides real-time data for NSE and other global stock markets, ensuring you have access to the most current and accurate data available.
                        Comprehensive Market Coverage: Whether you're interested in domestic or international markets, our web app offers a vast range of stock market data from various exchanges. Stay on top of the latest trends and movements across borders and seize opportunities worldwide.
                        <br />

                        Intuitive Interface: Simplicity and user-friendliness are at the core of our design. Our intuitive interface enables users of all experience levels to navigate effortlessly through the web app and discover valuable insights at their fingertips.
                        Advanced Charting Tools: Analyzing stock trends is crucial for successful trading. Our web app comes equipped with advanced charting tools, allowing you to visualize historical and real-time data, apply technical indicators, and develop strategies with ease.
                        <br />
                        Personalized Watchlists: Tailor your experience by creating personalized watchlists of stocks that matter most to you. Keep track of your favorite companies, monitor their performance, and receive timely updates for better decision-making.
                        News and Analysis: Stay informed with the latest market news and expert analysis curated by our team. Access in-depth reports, company financials, and expert opinions to gain valuable insights into the ever-changing market landscape.
                        <br />
                    </p>
                    <span>
                        Our Commitment
                    </span>
                    <p>
                        We are committed to excellence, continuous improvement, and customer satisfaction. We value your feedback and actively seek ways to enhance our web app to meet your evolving needs. Rest assured that our data is sourced from reliable and trusted providers, and we employ state-of-the-art security measures to protect your privacy and ensure a safe browsing experience.
                    </p>
                </div>
                <div id="contact_us">
                    <div className="cret">
                        <ul>
                            <li className="cret_info" >Damanjeet Singh</li>
                            <li><FaPhone />  7827XXXXXX</li>
                            <li><FaEnvelope />  damanjeetsingh434@gmail.com</li>
                        </ul>
                        <ul >
                            <li className="cret_info">Vaibhav Bhardwaj</li>
                            <li><FaPhone />  8810XXXXXX</li>
                            <li><FaEnvelope />  bhardwajvaibhav2412@gmail.com</li>
                        </ul>
                        <ul>
                            < li className="cret_info">TradeWizard</li>
                            <li><FaEnvelope /> tradewizardhack@gmail.com</li>
                            <li><FaGithub /> Website repository:</li>
                        </ul>
                    </div>
                    <p>
                        Disclaimer: Our web app provides financial data for informational purposes only. Trading and investing in the stock market involve risks, and we encourage users to consult with a qualified financial advisor before making any investment decisions.
                    </p>
                </div>
            </div >
            <img src={stock} id="stock" />
        </>
    )
}




// <span>

// Get Started Today!
// </span>
// <p>

// Join thousands of traders and investors who rely on our stock market data web app for accurate and timely information. Whether you're a seasoned investor or just starting your journey in the financial world, we have the tools and resources to support your goals.

// Thank you for choosing us as your preferred stock market data provider. Together, let's unlock the potential of the markets and pave the way to financial success!
// </p>