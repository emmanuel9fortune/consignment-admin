import React, { useState, useRef, useEffect } from "react";
import "../styles/ChatWidget.css";
import { FaArrowDown } from "react-icons/fa";
import axios from "axios";

export default function ChatWidget({onCloseChat, getid}) {

    const [chats, setchats] = useState([])
    const [messages, setmessages] = useState('')
    const [reload, setreload] = useState(0)
    const chatContainerRef = useRef(null);

    const getuser_id = getid 

    useEffect(()=>{
        const func =async()=>{
            try {
                const res = await axios.post('https://smartledgerassist.com/ledger/adminchats.php', {user_id: getuser_id + '@admin'})      
                if(res.data.status === 'success'){
                    setchats(res.data.chats)
                    setreload(0)
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        func()
         const interval = setInterval(func, 2000); // poll every 2 seconds
         return () => clearInterval(interval);
    },[reload, getuser_id])

    const handleSubmit =async()=>{
        const user_id = '@admin'
        const combined_id = getuser_id + '@admin'
        const friend_id = getuser_id

        const value={
            user_id,
            combined_id,
            friend_id,
            message: messages,
        }

        try {
            const res = await axios.post('https://smartledgerassist.com/ledger/adminchat.php', value)    
            if(res.data.status === 'success'){
                setreload(reload + 1)
                setmessages('')
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleDelete =async(id)=>{
        try {
            const res = await axios.post('https://smartledgerassist.com/ledger/deletechat.php', {id})    
            if(res.data.status === 'success'){
                setreload(reload + 1)
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="chatbox-container">
        <div className="chatbox-header">
        <div className="header-left">
            <div className="agent-info">
            <h4>Chat with</h4>
            <span style={{display:'flex', alignItems:'center'}} ><span style={{position:'initial', height:'10px', width:'10px', display:'block', margin:'0 5px 0 0', border:'none'}} className="chat-badge"></span>user {getid}</span>
            </div>
        </div>

        <button className="chat-close" onClick={onCloseChat}>
            <FaArrowDown/>
        </button>
        </div>

        <div className="chatbox-body" ref={chatContainerRef}>

            {
                chats?.length > 0 &&
                chats?.map((item, i)=>(
                    item?.user_id !== getuser_id ?
                    <div key={i} className="message user">
                        <div className="bubble" style={{position:'relative'}}>
                            <p>{item?.message}</p>
                        </div>
                        <button style={{backgroundColor:'red', color:'white', padding:'10px'}} onClick={()=> handleDelete(item?.id)} >DELETE CHAT</button>
                    </div>
                    :
                    <div key={i} className="message friend" >
                        <div className="bubble">{item?.message}</div>
                    </div>
                ))
            }
        </div>

        <div className="chatbox-input">
            <input value={messages} onChange={(e)=> setmessages(e.target.value)} type="text" placeholder="Type your message here..." />
            {
                messages !== ''?
                <button onClick={handleSubmit} className="send-button">➤</button>
                :
                <button style={{backgroundColor:'grey'}} className="send-button">➤</button>
            }
        </div>

        <div className="powered">Powered by SmartLedger</div>
    </div>
  );
}

