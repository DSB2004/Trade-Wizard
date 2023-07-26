
import './App.css';
import Mainpage from './components/Main_Stock'
import NSE from './components/NSE stocks'
import SignIn from './components/SignIn'
import Home from './components/Home'
import INT from './components/INT stocks'
import SignUp from './components/SignUp'
import Explore from './components/Explore';
import Search from './components/Search'
import Header from './components/Header'
import OTP from './components/OTP';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import background2 from './Photos/background1.jpg'
import { useState } from 'react';
function App() {
  const [back, set_back] = useState(background2)
  const change_back = (value) => {
    set_back(value);
  };

  const root_style = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    zIndex: '-1',
    position: 'Fixed',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    overflowY: "scroll",
    overflowX: "hidden",
    opacity: '1',
    backgroundRepeat: 'no-repeat',
    transition: 'all 1s ease-in-out',
    backgroundImage: `url(${back})`
  }
  return (
    <div id="body" style={root_style}>
      <div id="overlay">

        <Router>
          <Header onValueChange={change_back} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Explore" element={<Explore />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/Main" element={<Mainpage />} />
            <Route path="/NSE" element={<NSE />} />
            <Route path="/INT" element={<INT />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/OTP" element={<OTP />} />
          </Routes>
        </Router >
      </div>
    </div>
  );
}

export default App;