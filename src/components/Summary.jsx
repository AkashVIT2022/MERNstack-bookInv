import React, { useState } from 'react'
import Admin_dealer_summary from './admin_dealer_summary'
import Admin_publisher_summary from './admin_publisher_summary'
const Summary = () => {
  const [active,setactive]=useState(0);
  return (
    <>
    <center>
        <div id='summary-but'>
        <button onClick={()=>setactive(0)} className={active==0?'sel':'nsel'}>Publisher sales</button>
        <button onClick={()=>setactive(1)} className={active==1?'sel':'nsel'}>Dealer sales</button>
    </div>
    </center>
    <div>
      {active==0  &&    <div style={{position:'absolute',top:'30vh',width:'100vw'}}> <Admin_publisher_summary/></div>}
      {active==1 && <div style={{position:'absolute',top:'30vh',width:'100vw'}}><Admin_dealer_summary/></div>}
    </div>
    </>
  )
}

export default Summary