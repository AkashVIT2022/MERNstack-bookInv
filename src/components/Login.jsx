import React, { useContext } from 'react'
import axios from 'axios';
import { AuthContext } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';
const Login = ({set}) => {
  const {dispatch}=useContext(AuthContext);
  const navigate=useNavigate();
  const handleclick=(e)=>{
    e.preventDefault();
    let id=document.getElementById('did').value;
    let pass=document.getElementById('dpass').value;
    console.log(id,pass);
    axios.get('http://localhost:3001/details',{params:{
      id,
      pass
    }})
    .then((res)=>{
      if(res.data=='not found')
      window.location.pathname='/login';
      else if(res.data=='found'){
        console.log('working')
        dispatch({type:"SET_USER",payload:id});
        document.cookie = "id="+id+"; expires="+((new Date()).getDate+10)+"; path=/";
        window.localStorage.setItem('auth',true);
       navigate('/home');
      }
    })
    .catch((err)=>console.log(err));
  }
  return (
    <>
    <div id="login">
    <button className='alt-login' onClick={()=>{set('/publisher_login');console.log('working')}}>Publisher login</button>
    <button className='alt-login' onClick={()=>{set('/dealer_login');console.log('working')}}>Dealer login</button>
      <div id="login-box">
       <div> Admin id <input type="text" name="did" id="did" /> </div>
        <div>password <input type="password" name="dpass" id="dpass" /> </div>
        <button className='alt-login1' onClick={handleclick}>Login</button>
      </div>
    </div>
    </>
  )
}

export default Login