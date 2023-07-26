const express = require('express')
const websocket = require("ws")
const ndm = require("nodemailer")
const bcrypt = require('bcrypt')
const cors = require('cors')
// var GoogleStrategy = require('passport-google-oauth20').Strategy;
// const passport=require('passport')
const mysql = require('mysql2')
var details = mysql.createConnection({
    host: 'gateway01.eu-central-1.prod.aws.tidbcloud.com',
    port: 4000,
    user: '3GXuuMAYLqTpqaY.root',
    password: 'pgRX92F7H0dtPLuK',
    database: 'test',
    ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true
    }
})
var check = 0
var last_msg_id
async function database_setting(db_info) {
    try {
        db_info.connect((err) => {
            if (err) {
                console.log(err)
                setTimeout(() => {
                    database_setting(details)
                }, 1000)
            }
            else {
                console.log("Connected")
            }
        })
    }
    catch (err) {
        console.log(err)
        setTimeout(() => {
            database_setting(details)
        }, 1000)
    }
}
database_setting(details)
function OTPsender(email, subject, x) {
    const t = ndm.createTransport({
        service: "Gmail",
        auth: {
            user: "tradewizardhack@gmail.com",
            pass: "djqbdznecvdimrfg"
        },
    })

    const mail = {
        from: "tradewizardhack@gmail.com",
        to: email,
        subject: subject,
        text: `Your OTP for verification is ${x}\nDo not share this OTP with anybody\n`
    }
    t.sendMail(mail, (err, data) => {
        if (err) {
            console.log("Request Failed\nError:404")
            console.log(`\nError:${err}`)
        }
        else {
            console.log("Email sent successfully")
        }
    })
}

function web_connection(db_info) {
    var saltRounds = 10
    var OTP
    var user_id
    const wss = new websocket.Server({ port: 80 })
    wss.on('connection', async (ws, req) => {
        console.log(req.url)
        if (req.url === "/") {
            check=0
            console.log("buffer")
        }
        else if (req.url == "/SignUp") {
            console.log("Signup")
            ws.on('message', async (message) => {
                let data = JSON.parse(message)
                bcrypt.hash(data.Password, saltRounds, async (err, hash) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        Password_h = hash
                        // console.log(data)
                        // console.log(`Password hashed: ${Password_h}\n`)
                        db_info.query("INSERT INTO User_Data (UserID , Name , Password , Account_Type ) VALUES (?,?,?,?)", [data.Email, data.Name, Password_h, "Normal"], (err, result) => {
                            if (err) {
                                console.log(err)
                                ws.send(`${data.Email} already in use`)
                            }
                            else {
                                user_id = data.Email
                                ws.send('All ok')
                                OTP = String(parseInt(Math.random() * 100000000000))
                                OTPsender(data.Email, "OTP for verification", OTP)
                            }
                        })
                    }
                })

            }
            )
        }
        else if (req.url == "/OTP") {
            console.log(OTP)
            ws.on("message", async (message) => {
                console.log("Real OTP:", OTP)
                console.log(typeof OTP)
                let res_otp = JSON.parse(message)
                console.log(JSON.parse(message))
                if (OTP === res_otp) {
                    ws.send("All ok")
                }
                else {
                    ws.send("OTP not matched")
                }

            })
        }
        else if (req.url === "/google_signup") {
            ws.on('message', async (message) => {
                let data = JSON.parse(message)
                db_info.query("INSERT INTO User_Data (UserID , Name, Account_Type ) VALUES (?,?,?)", [data.Email, data.Name, "Google"], (err, result) => {
                    if (err) {
                        console.log(err)
                        ws.send(`${data.Email} already in use`)
                    }
                    else {
                        user_id = data.Email
                        console.log("All ok")
                        ws.send('All ok')
                    }
                })

            })
            ws.on('error', async (err) => {
                console.log(err)
            })
        }
        else if (req.url === "/SignIn") {
            console.log("SignIn")
            ws.on('message', async (message) => {
                let data = JSON.parse(message)
                console.log(data)
                user_id = data.userE
                db_info.query("SELECT * FROM User_Data WHERE UserID = ?", [data.Email], (err, result) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        if (result) {
                            let to_send_signin = []
                            console.log(data.Password, result[0].Password)

                            console.log(result)
                            to_send_signin.push(result[0].Name)
                            bcrypt.compare(data.Password, result[0].Password, function (err, result) {
                                if (err) {
                                    console.log(err)
                                }
                                else if (result == true) {
                                    to_send_signin.push("All ok")
                                    ws.send(JSON.stringify(to_send_signin))

                                }
                                else if (result == false) {
                                    to_send_signin.push("Incorrect password")
                                    ws.send(JSON.stringify(to_send_signin))
                                }

                            })
                        }
                        else if (!result) {
                            ws.send("Account not Found")
                        }
                    }
                })

            })
        }
        else if (req.url === "/googleSignIn") {
            ws.on('message', async (message) => {
                let data = JSON.parse(message)
                console.log(data)
                db_info.query("SELECT * FROM User_Data WHERE UserID = ?", [data.Email], (err, result) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        if (result.length !== 0) {
                            user_id = data.Email
                            ws.send("All ok")
                        }
                        else if (result.length === 0) {
                            ws.send("Account not Found")
                        }
                    }
                })
            })
        }
        else if (req.url == "/global_send") {
            ws.on('message', async (message) => {
                let msg_data = JSON.parse(message)
                console.log(msg_data)
                db_info.query("INSERT INTO Message (user_id,message) VALUES (?,?)", [msg_data.user_id, msg_data.User_msg], (err, result) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log("Message saved")
                    }

                })
            })
        }
        else if (req.url == "/global_receive") {
            async function new_msg() {
                const result = await new Promise((resolve, reject) => {
                    db_info.query("SELECT * FROM Message where Id > ? AND user_id <> ?", [last_msg_id, user_id], (err, result) => {
                        if (err) {
                            reject(err)
                        }
                        else {
                            resolve(result)
                        }
                    })
                })
                if (result.length === 0) {
                    console.log("No new msg")
                }
                else {
                    result.forEach(element => {
                        if (element.user_id !== user_id) {
                            result.forEach(element => {
                                temp.push(element.Id)
                            });
                            ws.send(JSON.stringify(result))
                            last_msg_id = temp[temp.length - 1]
                            console.log("New message found")
                            console.log("Last seen updated:", last_msg_id)
                        }
                    })
                }
            }
            setInterval(() => {
                console.log(check)
                if (check === 1) {
                    new_msg()
                }
                else {
                    { }
                }
            }, 5000)

        }

    })
}
web_connection(details)


const app = express();
app.get("/history", cors(), async (req, res) => {
    check = 1
    console.log("Check change", check)
    temp = []
    console.log("history chat send")
    const result = await new Promise((resolve, reject) => {
        details.query("SELECT * FROM Message", (err, result) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(result)
            }
        })
    })
    res.send(result)
    result.forEach(element => {
        temp.push(element.Id)
    });
    last_msg_id = temp[temp.length - 1]
    console.log(last_msg_id)
});

app.listen(90, () => {
    console.log(`Express server listening on port 90`);
});