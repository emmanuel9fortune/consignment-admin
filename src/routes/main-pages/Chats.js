import React, { useEffect, useState } from 'react'
import SideBar from '../../components/Sidebar'
import SubHeader from '../../components/SubHeader'
import axios from 'axios'
import { MdClose, MdPerson } from 'react-icons/md'
import ChatWidget from '../../components/ChatBox'
import { toast } from 'react-toastify'

function Chats() {

  const [users, setusers] = useState([])
    const [reload, setreload] = useState(0)

  useEffect(()=>{
    const func=async()=>{
      try {
        const res = await axios.post('https://smartledgerassist.com/ledger/adminclients.php')        
        if(res.data.status === 'success'){
          setusers(res.data.clients)
          setreload(0)
        }
      } catch (error) {
        console.log(error.message);
        
      }
    }
    func()
  },[reload])

  const [getid, setgetid] = useState('')

  const handleGetid=async(id)=>{
    setgetid(id)
  }

  
  const [delete_id, setdelete_id ] = useState('')
  const [delete_name, setdelete_name ] = useState('')

  const handleDelete =async()=>{
    try {
      const res = await axios.post('https://smartledgerassist.com/ledger/deleteclient.php', {id: delete_id})
      console.log(res);
      
      if(res.data.status === 'success'){
        toast.success('User Deleted')
        setreload(reload + 1)
        setdelete_id('')
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='dashboard_container'>
      <SideBar/>
      
      <div className='dashboard_body'>
        <SubHeader chat='chat' />
        <div  style={{width:'100%', height:'60px'}} ></div>
        <h3 style={{width:'100%', margin:'20px 0'}}>CHATS</h3>
      
        {
          users?.length > 0 ?
            users?.map((item, i)=>(
              <div key={i}  className='user_slides' style={{cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                  <div onClick={()=>handleGetid(item?.user_id)}>
                    <div className='dashboard_body_header_displays_icon'>
                      <MdPerson size={25} />
                    </div>
                    <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                      <h3>{item?.user_id}</h3>
                      <p>{item?.time}</p>
                    </div>
                  </div>
                    <button style={{backgroundColor:'transparent', border:'1px solid grey', margin:'0 10px', color:'black', cursor:'pointer'}} onClick={()=>[setdelete_id(item?.combined_id), setdelete_name(item?.user_id)]}>DELETE</button>
              </div>    
            ))
          : <h3>NO USERS FOUND</h3>
        }

        {
          getid !== '' &&
          <ChatWidget onCloseChat={()=> setgetid('')} getid={getid} />
        }
      </div>

      {
        delete_id &&
        <>
            <div className='popup'>
                <div className='popup_box'>
                    <div className='popup_box_header'>
                        <h3>Confirm delete</h3>
                        <div onClick={()=> setdelete_id('')}>
                            <MdClose size={25}/>
                        </div>
                    </div>

                    <h3>Delete {delete_name} Account</h3>
                    
                    <div style={{width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                        <div></div>

                        <button style={{padding: '10px 15px', backgroundColor:'#0463ca', border:'none', color:'white', cursor:'pointer', borderRadius:'15px'}} onClick={handleDelete}>Confirm</button>
                    </div>
                </div>
            </div>
        </>
        }
    </div>
  )
}

export default Chats