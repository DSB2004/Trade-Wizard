import React, { useEffect, useState } from 'react'
import './INTstock.css'
import { FaArrowDown, FaArrowUp, FaSpinner, FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { Chart, CategoryScale, Tooltip, LinearScale, PointElement, LineElement, Legend } from 'chart.js'
import Footer from './Footer'
import { Line } from 'react-chartjs-2'
import axios from 'axios'
const websocket = new WebSocket('ws://localhost');
Chart.register(
    CategoryScale, Tooltip, LinearScale, PointElement, LineElement, Legend
)
export default function INT_stocks() {
    let news = []
    let total_transaction = []
    let high_price = []
    let low_price = []
    let open_price = []
    let close_price = []
    let label_Data = []
    let width = window.innerWidth;
    const INTstocks = {
        position: 'absolute',
        top: '110px',
        width: (width - 50).toString() + "px",
        padding: '10px'
    }
    let data_graph
    let symbol = JSON.parse(localStorage.getItem('Stock info')).symbol
    const [news_, set_news_] = useState(<div id="loading_div"><FaSpinner className='loading' /></div>)
    const [price_content, set_content] = useState(<div id="loading_div"><FaSpinner className='loading' /></div>)
    const [graph, set_graph] = useState(
        <div id="loading_div">
            <FaSpinner className="loading" />
        </div>
    )
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('Stock info'))
        console.log(data)
        try {
            set_content(
                <>
                    <ul >
                        <h3 >Stock Information</h3>
                        <li className="info_INT" id="info-1"><span>Day High <FaArrowUp />: </span>${data.high}</li>
                        <li className="info_INT" id="info-2"><span>Day Low <FaArrowDown />:</span>${data.low}</li>
                        <li className="info_INT" id="info-3"><span>Opening Price:</span> ${data.open}</li>
                        <li className="info_INT" id="info-4"><span>Last Price:</span> ${data.close}</li>
                        <li className="info_INT" id="info-7"><span>Total Traded Value: </span>${Number(data.volume) * Number(data.close)}</li>
                        <li className="info_INT" id="info-8"><span>Total volume of Shares:</span> {data.volume}</li>
                        <li className="info_INT" ><span>Pre-Market Value:</span> ${data.preMarket}</li>
                        <li className="info_INT" ><span>After Hours Pricing:</span> ${data.afterHours}</li>
                    </ul>
                </>
            )
        }
        catch (err) {
            set_content(<h3>Something went wrong...Please try again</h3>)
        }
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate() - 1).padStart(2, '0');
        const to_date = `${year}-${month}-${day}`
        const from_date = `${year - 1}-${month}-${day}`
        axios.get(`https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${from_date}/${to_date}?adjusted=true&sort=asc&apiKey=UT0U72RKnzmaVNpuabCHYmFMmqWXkUJi`)
            .then((response) => {
                console.log(response.data)
                const raw_Data = response.data
                data_graph = raw_Data.results
                label_Data[0] = year - 1

                for (let i = 1; i < data_graph.length - 1; i++) {
                    label_Data[i] = ''
                }
                label_Data.push(year)
                populateData(data_graph)
            })
            .catch((err) => {
                set_graph(<div id="loading_div"><h3 id="error_head">Error in rendering graphical representation</h3></div>)

            })

        const apiKey = "cirvo8hr01quup9n46hgcirvo8hr01quup9n46i0";

        axios
            .get(`https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${from_date}&to=${to_date}&token=${apiKey}`)
            .then((response) => {
                for (let i = 0; i < 21; i++) {
                    news.push(
                        <div className="news_INT" key={i}>
                            <h3>{response.data[i].headline}</h3>
                            <ul>
                                <li className="Int_Stock_news"><span>Sources:</span>
                                    {response.data[i].source}</li>
                                <a href={response.data[i].url}>
                                    <li className="Int_Stock_news"><span>URL:</span>{response.data[i].url}</li>
                                </a>
                                <li className="Int_Stock_news"><span>Summary:</span>{response.data[i].summary}</li>
                            </ul>
                        </div>
                    )
                }
                set_news_(news)
            })

            .catch((err) => {
                set_news_(<div id="loading_div"><h3 id="error_head">Error in rendering News</h3></div>)
            })

        console.log('Highest Price:', high_price)
        console.log('Lower Price', low_price)
        console.log(total_transaction)


    }, [])
    function populateData(data_graph) {
        data_graph.forEach((element) => {
            total_transaction.push(Number(element.n));
            high_price.push(Number(element.h));
            low_price.push(Number(element.l));
            open_price.push(Number(element.o))
            close_price.push(Number(element.c))
        });
        const graph_style = {
            backgroundColor: 'white',
            height: '350px',
            width: '700px',
            padding: '20px',
            margin: '10px',
            borderRadius: '20px'
        }
        function graph2() {
            console.log('function 2')
            set_graph(
                <>
                    <div style={graph_style}>
                        <Line className="value_graph"
                            data={data}
                            options={options}>
                        </Line>
                    </div >
                    <div id="changeGraph" >
                        <button className='change_btn' onClick={graph1}><FaArrowLeft /></button>
                        <button className='change_btn' onClick={graph3}><FaArrowRight /></button>
                    </div>
                </>

            )
        }
        function graph3() {
            console.log('function 3')
            set_graph(
                <>
                    <div style={graph_style}>
                        <Line className="value_graph"
                            data={data3}
                            options={options2}>
                        </Line>
                    </div >
                    <div id="changeGraph" >
                        <button className='change_btn' onClick={graph2}><FaArrowLeft /></button>
                        {/* <button className='change_btn' onlClick={graph2}><FaArrowRight /></button> */}
                    </div>
                </>

            )
        }
        function graph1() {
            console.log('function 1')
            set_graph(
                <>
                    <div style={graph_style}>
                        <Line className="value_graph"
                            data={data2}
                            options={options2}>
                        </Line>
                    </div >
                    <div id="changeGraph" >
                        <button className='change_btn' onClick={graph2}><FaArrowRight /></button>
                    </div>
                </>

            )
        }

        set_graph(
            <>

                <div style={graph_style}>
                    <Line className="value_graph"
                        data={data2}
                        options={options2}>
                    </Line>
                </div >
                <div id="changeGraph" >
                    <button className='change_btn' onClick={graph2}><FaArrowRight /></button>
                </div>
            </>

        )
    }
    let data = {
        labels: label_Data,
        datasets: [{
            label: "Total transaction",
            data: total_transaction,
            borderColor: 'black',
            backgroundColor: "black"
        },
        ]
    }
    let data2 = {
        labels: label_Data,
        datasets: [{
            label: "Highest Price",
            data: high_price,
            borderColor: 'green',
            backgroundColor: "green"
        },
        {
            label: "Lowest Price",
            data: low_price,
            borderColor: 'red',
            backgroundColor: "red"
        }]

    }
    let data3 = {
        labels: label_Data,
        datasets: [{
            label: "Open Price",
            data: high_price,
            borderColor: 'green',
            backgroundColor: "green"
        },
        {
            label: "Closest Price",
            data: low_price,
            borderColor: 'red',
            backgroundColor: "red"
        }]

    }
    let options = {
        responsive: true,
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Time Period (in years)'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Volume of Stocks'
                }
            }
        }
    }
    let options2 = {
        responsive: true,
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Time Period (in years)'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Price ($)'
                }
            }
        }
    }
    return (
        <>
            <div className="INT_stock" style={INTstocks}>
                <div className="INT_about">
                    <div className="stock_INT" id="Pricing">
                        <h3>
                            Symbol:{symbol}
                        </h3>

                        {price_content}
                    </div>
                    <div className="stock_INT" id="Graph">
                        {graph}
                    </div>
                </div>
                <div className="INT_stock_news">
                    <h2>News regarding {symbol}</h2>
                    <div className="innerNews">
                        {news_}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )

}
