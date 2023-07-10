import React, { useContext } from 'react'
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const Login = ({set}) => {
  const {dispatch}=useContext(AuthContext);
  const navigate=useNavigate();
  const handleclick=(e)=>{
    e.preventDefault();
    let id=document.getElementById('did').value;
    let pass=document.getElementById('dpass').value;
    console.log(id,pass);
    axios.get('http://localhost:3001/dealer_details',{params:{
      id,
      pass
    }})
    .then((res)=>{
      if(res.data=='not found')
      window.location.pathname='/dealer_login';
      else if(res.data=='found'){
        console.log(id+"jklm")
        dispatch({type:"SET_USER",payload:id});
        document.cookie = "id="+id+"; expires="+((new Date()).getDate+10)+"; path=/";
        window.localStorage.setItem('auth',true);
       navigate('/dealer_home');
      }
    })
    .catch((err)=>console.log(err));
  }
  return (
    <>
    <div id="login">
    <button className='alt-login' onClick={()=>{set('/login');console.log('working')}}>Admin login</button>
      <div id="login-box">
       <div> Dealer id <input type="text" name="did" id="did" /> </div>
        <div>password <input type="password" name="dpass" id="dpass" /> </div>
        <button className='alt-login1' onClick={handleclick}>Login</button>
      </div>
    </div>
    </>
  )
}

export default Login