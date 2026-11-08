import React, { useEffect, useState } from 'react'
import '../../styles/signup.css'
import { MdLogin, MdVisibility, MdVisibilityOff } from 'react-icons/md'
import StatsGrid from '../../components/Svg'
import { toast } from 'react-toastify'

function Login() {

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const Actual_email = '@admin' 
    const Actual_pass = '@admin123' 

    const handleSubmit =async()=>{
        if(Actual_email === email && Actual_pass === password){
            localStorage.setItem('admin_id', Actual_email)
            window.location.reload()
        }else{
            toast.error('Wrong Login Details')
        }
    }

    const [vis, setvis] = useState(false)

  return (
    <div className='sign-up' >

        {/* <div className='sign_up_container absolute inset-0 z-[1] hidden h-full w-full grid-cols-16 grid-rows-9 lg:grid' ></div> */}
        <div className='sign_up_container_' >
            <div className='sign_up_box1'>
                <h1>Login Admin Dashboard</h1>
            </div>
            <StatsGrid/>

            <div className='sign_up_form'>
                <div className='sign_up_form_'>
                    
                    <div className={!email ? 'reister_input_aka' : 'reister_input_aka reister_input_name'}>
                        <label>User Name</label>
                        <input type='text' value={email} onChange={(e)=> setemail(e.target.value)} />
                    </div>
                    
                    <div className={!password ? 'reister_input_aka' : 'reister_input_aka reister_input_name'} >
                        <label>Enter Password</label>
                        <input type={!vis ? 'password' :'text'} value={password}  onChange={(e)=> setpassword(e.target.value)}  />
                        <div onClick={()=> vis ? setvis(false) : setvis(true)} style={{position:'absolute', right:'10px', top: '30%', width:'30px', height:'20px', cursor:'pointer', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center'}}>
                            {
                                vis ?
                                <MdVisibilityOff  size={20} />
                                :
                                <MdVisibility  size={20} />
                            }
                        </div>
                    </div>

                    <div onClick={handleSubmit} className='register_btn'>LOG IN</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login