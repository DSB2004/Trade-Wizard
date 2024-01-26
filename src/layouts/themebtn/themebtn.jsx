import React from "react";
import "./themebtn.css";
import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from "../../hook/redux-slice/Theme";
import { IoCloudSharp } from "react-icons/io5";
import { IoStarSharp } from "react-icons/io5";


export default function Themebtn() {
    const dark = useSelector((state) => state.Theme);
    const dispatch = useDispatch();
    return (
        <>
            <div onClick={() => { dispatch(changeTheme()) }} className={`theme-btn ${dark ? "dark-theme-btn" : "light-theme-btn"}`}>
                <div className={`outerline ${dark ? "dark-outline" : "light-outline"}`}>
                    <div className={`slider radius-100 ${dark ? "dark-slider" : "light-slider"}`}>
                        <div className="spot" id="spot-1"></div>
                        <div className="spot" id="spot-2"></div>
                        <div className="spot" id="spot-3"></div>

                    </div>
                </div>

                <div className="cloud-div">
                    <IoCloudSharp className="clouds" id="cloud-1" />
                    <IoCloudSharp className="clouds" id="cloud-2" />
                    {/* <IoCloudSharp className="clouds" id="cloud-3" /> */}
                </div>
                <div className="star-div">
                    <IoStarSharp className="stars" id="star-1" />
                    <IoStarSharp className="stars" id="star-2" />
                    <IoStarSharp className="stars" id="star-3" />
                    <IoStarSharp className="stars" id="star-4" />
                    <IoStarSharp className="stars" id="star-5" />
                    <IoStarSharp className="stars" id="star-6" />
                    <IoStarSharp className="stars" id="star-7" />
                    <IoStarSharp className="stars" id="star-8" />
                    <IoStarSharp className="stars" id="star-9" />
                    <IoStarSharp className="stars" id="star-10" />
                </div>
            </div>
        </>
    );
}
