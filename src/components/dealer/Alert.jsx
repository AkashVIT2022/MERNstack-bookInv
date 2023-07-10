import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Dealer_from from './Dealer_form';
const Alert = () => {
    const [data,setdata]=useState(null);
    const [data1,setdata1]=useState(null);
    const [viewdata,setviewdata]=useState(null);
    const [viewdata1,setviewdata1]=useState(null);
    const[active,setactive]=useState(0);
    const [content,setcontent]=useState(0);
    const [content1,setcontent1]=useState(0);
    useEffect(()=>{
        axios.get('http://localhost:3001/publisher_shipment')
        .then((res)=>{
            console.log(res.data);
            // settotal(count);
            setdata(res.data);
        })
        .catch((err)=>console.log(err));
        axios.get('http://localhost:3001/dealer_request')
        .then((res)=>{
            console.log(res.data[0]);
            // settotal(count);
            setdata1(res.data);
        })
        .catch((err)=>console.log(err));
        console.log(window.localStorage.getItem('active'));
        setactive(window.localStorage.getItem('active'));
    },[])
    const setview=(i)=>{
        // e.preventDefault();
        console.log(i);
        setviewdata(data[i]);
        document.getElementById('view').style.display='block';
        document.getElementById('alert').style.opacity='0.3';
        document.getElementById('alert').style.pointerEvents='none';

    }
    const setview1=(i)=>{
        // e.preventDefault();
        console.log(i);
        setviewdata1(data1[i]);
        document.getElementById('view1').style.display='block';
        document.getElementById('alert').style.opacity='0.3';
        document.getElementById('alert').style.pointerEvents='none';

    }
    const closeview=(e)=>{
        e.preventDefault();
        document.getElementById('view').style.display='none';
        document.getElementById('view1').style.display='none';
        document.getElementById('alert').style.opacity='1';
        document.getElementById('alert').style.pointerEvents='auto';
    }
    const setstatus=(ele,signal)=>{
        window.localStorage.setItem('active',active);
        console.log(ele._id);
        axios.post('http://localhost:3001/update_shipment_status',{
            id:ele._id,
            stat:signal
        })
        window.location.reload();
    }
    const setstatus1=(ele,signal)=>{
        window.localStorage.setItem('active',active);
        console.log(ele._id);
        axios.post('http://localhost:3001/update_dealer_status',{
            id:ele._id,
            stat:signal
        })
        window.location.reload();
    }
    const setcolor=(stat,e)=>{
        if(stat=='declined'){
            if(e.target.children[0]){
                e.target.style.backgroundColor='red';
            e.target.style.color='white';
            if(e.target.children[0]){
                e.target.children[0].style.transitionDuration='500ms'
                e.target.children[0].style.backgroundColor='red';
                e.target.children[0].style.color='white';
                e.target.style.backgroundColor='red';
                e.target.style.color='white';
            }
        }
        else{
                console.log(e.target.parentNode);
                e.target.parentNode.style.backgroundColor='red';
                e.target.parentNode.style.color='white';
                e.target.style.backgroundColor='red';
                e.target.style.color='white';
            }
        }
    }
    const removecolor=(stat,e)=>{
        if(stat=='declined'){
            if(e.target.children[0]){
                e.target.style.backgroundColor='white';
            e.target.style.color='red';
            if(e.target.children[0]){
                e.target.children[0].style.backgroundColor='white';
                e.target.children[0].style.color='red';
            }
            }
            else{
                e.target.parentNode.style.backgroundColor='white';
                e.target.parentNode.style.color='red';
                e.target.style.backgroundColor='white';
                e.target.style.color='red';
            }
        }
    }
    useEffect(()=>{
       data && setcontent(data.reduce((count, val) => val.stat=='pending'?count+1:count, 0));
    },[data])
    useEffect(()=>{
       data1 && setcontent1(data1.reduce((count, val) => val.stat=='pending'?count+1:count, 0));
       data1 &&   console.log(setcontent1(data1.reduce((count, val) => val.stat=='pending'?count+1:count, 0))+"../");
    },[data1])
 return (
    <>
    <center id='button'>
        <span className={active==0?'active':'nonactive'} onClick={()=>{setactive(0);window.localStorage.setItem('active',0);window.location.reload()}}>Shipment</span>
        <span className={active==1?'active':'nonactive'} onClick={()=>{setactive(1);window.localStorage.setItem('active',1);window.location.reload()}}>Form</span>
        <span className={active==2?'active':'nonactive'} onClick={()=>{setactive(2);window.localStorage.setItem('active',2);window.location.reload()}}>Action</span>
    </center>
    {active ==0 &&<div id='alert'>
    {
            data1 && data1.map((ele,index)=>{
                return(<>
                {ele.stat=='pending' && <div className="box">
                    <div>Name: {ele.dealer_name}</div>
                    <div>adrress: {ele.address}</div>
                    <div>id: {ele.dealer_id}</div>
                    <div>Estimated arrival: {ele.ETA}</div>
                    <div></div>
                    <button style={{display:'none'}}></button>
                    <button style={{display:'none'}}></button>
                    <button onClick={()=>setview1(index)}><i class="fa-regular fa-eye"></i></button>
                </div>}
                </>)
            })
        }
        {content1==0 && <center className='no-alert'><div>No Pending Orders!!!</div></center>}
    </div>}
    {active ==1 &&<div id='alert'>
    <Dealer_from/>
    </div>}
    {active ==2 &&<div id='alert'>
        {
            data1 &&data1.map((ele,index)=>{
                return(<>
                {ele.stat!='pending' && <div className="box">
                <div>Name: {ele.dealer_name}</div>
                    <div>adrress: {ele.address}</div>
                    <div>id: {ele.dealer_id}</div>
                    <div>Estimated arrival: {ele.ETA}</div>
                    <div></div>
                    <button style={{color:ele.stat=='declined'?'red':''}} onMouseOut={(e)=>removecolor(ele.stat,e)} onMouseOver={(e)=>setcolor(ele.stat,e)} onClick={()=>setview1(index)}><i class="fa-regular fa-eye"></i></button>
                </div>}
                </>)
            })
        }
        {data1 && content1==data1.length && <center><div id='no-alert'>No actions yet for dealer!!!</div></center>}
        
    </div>}
        <div id="view">
            <div className='close'>
            <div onClick={closeview}><i class="fa-solid fa-xmark"></i></div>
            </div>
            <div className='view_box'>
            {
               (active==0 || active==2) && viewdata && <>
               <div id='data'>
               <b>Publication Name:</b> {viewdata.dealer_name} <br />
               <b>Books:</b> <br />
               {viewdata.books.map((val)=>{
                return(<>
                <br />
                <div><b>Name: </b>{val.name}</div>
                <div><b>Quantity:</b> {val.quantity}</div>
                <div><b>Price </b>{val.price}</div>
                <div><b>Total price </b>{val.price*val.quantity}</div>
                </>)
               })}
               {viewdata.stat=='declined' && <div style={{color:'red'}}>{viewdata.stat}</div>}
               {viewdata.stat=='accepted' && <div style={{color:'green'}}>{viewdata.stat}</div>}
               {viewdata.stat=='pending' && <div style={{color:'blue'}}>{viewdata.stat}</div>}
               </div>
                </>
            }
            {viewdata && <div><img src={"https://api.qrserver.com/v1/create-qr-code/?data="+JSON.stringify(viewdata)+"&amp;size=100x100"} alt="" title="" /></div>}
            </div>
        </div>
        <div id="view1">
            <div className='close'>
            <div onClick={closeview}><i class="fa-solid fa-xmark"></i></div>
            </div>
            <div className="view_box">
            {
               (active==0 || active==2) && viewdata1 &&<>
               <div id='data1'>
               <b>Dealer Name:</b> {viewdata1.dealer_name} <br />
               <b>Books:</b> <br />
               {viewdata1.books.map((val)=>{
                return(<>
                <br />
                <div><b>Name: </b>{val.name}</div>
                <div><b>Quantity:</b> {val.quantity}</div>
                </>)
               })}
               {viewdata1.stat=='declined' && <div style={{color:'red'}}>{viewdata1.stat}</div>}
               {viewdata1.stat=='accepted' && <div style={{color:'green'}}>{viewdata1.stat}</div>}
               {viewdata1.stat=='pending' && <div style={{color:'blue'}}>{viewdata1.stat}</div>}
               </div>
                </>
            }
            {viewdata1 && <div><img src={"https://api.qrserver.com/v1/create-qr-code/?data="+JSON.stringify(viewdata1)+"&amp;size=100x100"} alt="" title="" /></div>}
            </div>
        </div>
    </>
  )
}

export default Alert