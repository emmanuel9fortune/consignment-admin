import React, { useEffect, useState } from 'react'
import SideBar from '../../components/Sidebar'
import SubHeader from '../../components/SubHeader'
import { MdArrowBack, MdClose, MdPerson, MdPersonPinCircle } from 'react-icons/md'
import '../../styles/dashboard.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import CustomSelect from '../../components/CustomSelect'
import EditTrackers from './EditTrackers'
import { db } from '../../firebase'
import { useNavigate } from 'react-router-dom'

function Home() {

  const [track, settrack] = useState([])
  const [reload, setreload] = useState(0)
  const [ids, setids] = useState([])
  
  useEffect(()=>{
      db.collection('userchat').onSnapshot((snapshot)=>{
        setids(
          snapshot.docs.map((doc)=>({
            id : doc.id,
            data : doc.data()
          }))
        )
      })
  },[])     

  const [getid, setgetid] = useState('')

  const navigate = useNavigate()

  const handleGetid=async(id)=>{
    setgetid(id)
    navigate(`/edittracker/${id}`)
  }


  const [delete_id, setdelete_id ] = useState('')
  const [delete_name, setdelete_name ] = useState('')

  const handleDelete =async(id)=>{
    try {
      db.collection('userchat').doc(getid).delete()
    } catch (error) {
      console.log(error);
    }
  }

  

  return (
    <div className='dashboard_container'>
      <SideBar/>
      
      <div className='dashboard_body'>
        <SubHeader/>

        <div  style={{width:'100%', height:'50px'}} ></div>
        
        {
          getid === '' &&
          <h3 style={{width:'100%', margin:'20px 0'}}>ADMIN DASHBOARD</h3>
        }

        {
          getid === '' ?
          ids?.length > 0 ?
            ids?.map((item, i)=>(
              <div key={i} className='user_slides'>
                  <div>
                    <div className='dashboard_body_header_displays_icon'>
                      <MdPerson size={25} />
                    </div>
                    <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                      <h3>{item?.data?.tracker?.receiver_name || item?.data?.receiver_name}</h3>
                      <small style={{fontSize:'12px'}} >{item?.data?.tracker?.receiver_address || item?.data?.receiver_address}</small>
                    </div>
                  </div>

                  <div style={{display:'flex', alignItems:'center'}}>
                    <button style={{cursor:'pointer'}} onClick={()=>handleGetid(item?.id)}>VIEW</button>
                    <button style={{backgroundColor:'transparent', border:'1px solid grey', margin:'0 10px', color:'black', cursor:'pointer'}} onClick={()=>[setdelete_id(item?.id), setdelete_name(item?.data?.tracker?.receiver_name)]}>DELETE</button>
                  </div>
              </div>    
            ))
          : <h3>NO TRACKER FOUND</h3>
          : null
        }

        {
          getid !== '' &&
          <EditTrackers id={getid} setgetid={setgetid} />
        }

        
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

                        <h3>Delete {delete_name} Tracker</h3>
                        
                        <div style={{width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                           <div></div>

                            <button style={{padding: '10px 15px', backgroundColor:'#0463ca', border:'none', color:'white', cursor:'pointer', borderRadius:'15px'}} onClick={handleDelete}>Confirm</button>
                        </div>
                    </div>
                </div>
            </>
        }
      </div>
    </div>
  )
}

export default Home