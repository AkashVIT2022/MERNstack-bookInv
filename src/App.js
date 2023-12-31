import Heading from "./components/Heading.jsx";
import Navbar from "./components/Navbar.jsx";
import Body from "./components/Body.jsx";
import "./style/style.css";
import {BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Shipment from "./components/Shipment.jsx";
import Login from "./components/Login.jsx";
import Alert from './components/Alert.jsx'
import Login_pub from './components/publisher/Login.jsx'
import Heading_pub from './components/publisher/Heading.jsx';
import Navbar_pub from './components/publisher/Navbar.jsx';
import Alert_pub from './components/publisher/Alert.jsx';
import Login_dealer from './components/dealer/Login.jsx';
import Heading_dealer from './components/dealer/Heading.jsx';
import Navbar_dealer from './components/dealer/Navbar.jsx';
import Alert_dealer from './components/dealer/Alert.jsx';
import Inventory from './components/Inventory.js';
import D_Inventory from './components/d_inventory.js';
import P_Inventory from './components/p_inventory.js';
import Summary from './components/Summary.jsx';
import PSummary from './components/PSummary.jsx';
import DSummary from './components/DSummary.jsx';
import { useEffect, useState } from "react";
function App() {
  const navigate=useNavigate();
  const [loginpage,setloginpage]=useState('/login');
    console.log(loginpage)

    useEffect(()=>{

        if(loginpage=='/login'){
          if(window.location.pathname!='/login' && document.cookie.split('=')[1]==undefined)
         navigate('/login')
         }
         else if(loginpage=='/publisher_login'){
           if(window.location.pathname!='/publisher_login' && document.cookie.split('=')[1]==undefined){
             
             console.log('entering')
            navigate('/publisher_login')
          }
         }
         else if(loginpage=='/dealer_login'){
           if(window.location.pathname!='/dealer_login' && document.cookie.split('=')[1]==undefined){
             
             console.log('entering')
            navigate('/dealer_login')
          }
         }
    },[loginpage,navigate])
  const handlecallback=(ele)=>{
    console.log(ele);
    setloginpage(ele);
  }
  
  useEffect(() => {
    // Code to run when the component is mounted
    // console.log('hello');

    // Access the necessary DOM elements and modify their styles
    const preLoader = document.getElementById('pre-loader');
    const main = document.getElementById('main');

    preLoader.style.display = 'block';
    main.style.opacity = '0';

    // Simulate a delay before hiding the pre-loader and restoring main opacity
    const timeout = setTimeout(() => {
      preLoader.style.display = 'none';
      main.style.opacity = '1';
    }, 2000); // Adjust the delay time (in milliseconds) as per your requirement

    // Cleanup function (optional)
    return () => {
      clearTimeout(timeout); // Cancel the timeout if the component unmounts before the delay expires
    };
  }, []); // Empty dependency array ensures the effect runs only once
  return (
    <>
    <div id="pre-loader"></div>
        <div id="main">
        <Routes>

          <Route
           exact path="/home"
            element={
              <>
              <Heading />
      <Navbar />
      <center>
        <div style={{ width: "70%" }}>
          {" "}
          <hr />
        </div>
      </center>
                <Body />
              </>
            }
          ></Route>

          <Route
            exact path="/product_shipment"
            element={
              <>
              <Heading />
      <Navbar />
      <center>
        <div style={{ width: "70%" }}>
          {" "}
          <hr />
        </div>
      </center>
                <Shipment />
              </>
            }
          ></Route>

          <Route
          exact path="/login" id='main' element={<>
          <Heading />
          <Login set={handlecallback}/>
          </>}></Route>

          <Route
          exact path="/alert"
          element={<>
          <Heading />
          <Alert/>
          </>}
          ></Route>

          <Route 
          exact path="/publisher_login"
          element={
            <>
            <Heading_pub />
          <Login_pub set={setloginpage}/>
            </>
          }
          >
          </Route>

          <Route
            exact path="/publisher_home"
            element={
              <>
              <Heading_pub set={setloginpage}/>
      <Navbar_pub />
      <center>
        <div style={{ width: "70%" }}>
          {" "}
          <hr />
        </div>
      </center>
                <Body />
              </>
            }
          ></Route>

          <Route
          exact path="/publisher_alert"
          element={<>
          <Heading_pub set={setloginpage}/>
          <Alert_pub/>
          </>}
          ></Route>

          <Route 
          exact path="/dealer_login"
          element={
            <>
            <Heading_dealer />
          <Login_dealer set={setloginpage}/>
            </>
          }
          >
          </Route>

          <Route
            exact path="/dealer_home"
            element={
              <>
              <Heading_dealer set={setloginpage}/>
      <Navbar_dealer />
      <center>
        <div style={{ width: "70%" }}>
          {" "}
          <hr />
        </div>
      </center>
                <Body />
              </>
            }
          ></Route>

          <Route
          exact path="/dealer_alert"
          element={<>
          <Heading_dealer set={setloginpage}/>
          <Alert_dealer/>
          </>}
          ></Route>

          <Route
          exact path="/inventory"
          element={<>
          <Heading set={setloginpage}/>
          <Inventory/>
          </>}
          ></Route>

          <Route
          exact path="/dealer_inventory"
          element={<>
          <Heading set={setloginpage}/>
          <D_Inventory/>
          </>}
          ></Route>

          <Route
          exact path="/publisher_inventory"
          element={<>
          <Heading set={setloginpage}/>
          <P_Inventory/>
          </>}
          ></Route>

          <Route
          exact path="/admin_summary"
          element={<>
          <Heading set={setloginpage}/>
          <Summary/>
          </>}
          ></Route>
          <Route
          exact path="/dealer_summary"
          element={<>
          <Heading set={setloginpage}/>
          <DSummary/>
          </>}
          ></Route>
          <Route
          exact path="/publisher_summary"
          element={<>
          <Heading set={setloginpage}/>
          <PSummary/>
          </>}
          ></Route>

        </Routes>
        </div>
    </>
  );
}

export default App;
