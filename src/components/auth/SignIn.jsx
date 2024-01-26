import React, { useEffect, useState } from "react";
import { signin } from "../../asset/static/auth";
import { FaGoogle } from "react-icons/fa";
import FormBtn from "../../layouts/form-btn/form-btn";
import AuthProvider from "../../layouts/auth-provider/auth-provider";
import { useSelector } from "react-redux";
import InputBar from "../../layouts/input-bar/input-bar";
import Underline from "../../layouts/underline/underline";
import { MdVerifiedUser, MdAlternateEmail } from "react-icons/md";
import { SignInWithTradeWizard } from "../../firebase/auth/email-user";
import { SignInWithGoogle } from "../../firebase/auth/google-provider";
import { useNavigate } from "react-router-dom";
export default function SignIn() {
  const darkTheme = useSelector((state) => state.Theme);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "SignIn with Trade Wizard";
  }, []);

  const signinUser = async () => {
    try {
      const response = await SignInWithTradeWizard({ email, password });
      if (response) {
        navigate(`/${response.status}/${response.id}`);
      }
    } catch (err) {
      setResponse(err.message);
    }
  };
  return (
    <>
      <div
        id="Signin"
        className="flex-justified auth-content margin-auto SignIn"
      >
        <div className="flex-left flex-column auth-intro">
          <h1
            className={`auth-header margin-0 trans-500 ${darkTheme ? "dark-text dark-shadow" : "light-text light-shadow"
              }`}
          >
            {signin.head}
          </h1>
          <Underline style={{ width: "90%", margin: "0px 0px 10px 0px" }} />
          <p
            className={`auth-p trans-500 ${darkTheme ? "  dark-text dark-shadow" : "light-text light-shadow"
              }`}
          >
            {signin.content}
          </p>
        </div>
        <form
          className=" flex-center auth-form flex-column"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <h2
            className={`trans-500 margin-5 auth-form-intro ${darkTheme ? "  dark-text dark-shadow" : "light-text light-shadow"
              } `}
          >
            SignIn With Trade Wizard
          </h2>
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
          <FormBtn text="Sign In" func={signinUser} />
          <p
            className={`form-result flex-center margin-10 trans-500 ${darkTheme ? "dark-text" : "light-text"
              }`}
          >
            {response}
          </p>
          <AuthProvider
            icon={<FaGoogle />}
            func={SignInWithGoogle}
            text="Google"
          />
        </form>
      </div>
    </>
  );
}
