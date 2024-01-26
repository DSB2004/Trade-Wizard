import React, { useState, useEffect } from "react";
import { signup } from "../../asset/static/auth";
import { useSelector } from "react-redux";
import InputBar from "../../layouts/input-bar/input-bar";
import FormBtn from "../../layouts/form-btn/form-btn";
import Underline from "../../layouts/underline/underline";
import { FaUserCircle } from "react-icons/fa";
import { MdVerifiedUser, MdAlternateEmail } from "react-icons/md";
import { SignUpWithTradeWizard } from "../../firebase/auth/email-user";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("")
  const darkTheme = useSelector((state) => state.Theme);
  const navigate = useNavigate()
  const signupUser = async () => {
    try {
      const response = await SignUpWithTradeWizard({ email, password, name })
      if (response) {
          navigate(`/${response.status}/${response.id}`)
      }
    }
    catch (err) {
      setResponse(err.message)
    }
  }
  useEffect(() => {
    document.title = "SignUp with Trade Wizard"
  }, [])
  return (
    <>
      <div id="Signup" className="flex-justified auth-content  margin-auto ">
        <form className=" flex-center auth-form flex-column" onClick={(e) => { e.preventDefault() }}>
          <h2
            className={`trans-500 margin-5  ${darkTheme ? "  dark-text dark-shadow" : "light-text light-shadow"
              }`}
          >
            SignUp With Trade Wizard
          </h2>
          <InputBar
            style={{ margin: "20px auto", width: "80%" }}
            placeholder="Enter you name..."
            onValueChange={(value) => {
              setName(value);
            }}
            icon={<FaUserCircle />}
          />
          <InputBar
            style={{ margin: "20px auto", width: "80%" }}
            placeholder="Enter you email..."
            onValueChange={(value) => {
              setEmail(value);
            }}
            icon={<MdAlternateEmail />}
          />
          <InputBar
            style={{ margin: "20px auto", width: "80%" }}
            placeholder="Enter you password..."
            onValueChange={(value) => {
              setPassword(value);
            }}
            password={true}
            icon={<MdVerifiedUser />}
          />
          <FormBtn func={signupUser} text="Sign Up" />
          <p
            className={`form-result flex-center margin-10 trans-500 ${darkTheme ? "  dark-text" : "light-text"
              }`}
          >
            {response}
          </p>
        </form>
        <div className="flex-left flex-column auth-intro">
          <h1
            className={`auth-header margin-0  trans-500 ${darkTheme ? "  dark-text dark-shadow" : "light-text light-shadow"
              }
            `}
          >
            {signup.head}
          </h1>
          <Underline style={{ width: "90%", margin: "0px 0px 10px 0px" }} />
          <p
            className={`auth-p  trans-500 ${darkTheme ? "  dark-text dark-shadow" : "light-text light-shadow"
              }`}
          >
            {signup.content}
          </p>
        </div>
      </div>
    </>
  );
}
