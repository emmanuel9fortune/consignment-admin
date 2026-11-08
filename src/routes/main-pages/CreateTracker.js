import React, { useState } from 'react'
import SideBar from '../../components/Sidebar'
import SubHeader from '../../components/SubHeader'
import TrafficLight from '../../components/Traffic'
import CustomSelect from '../../components/CustomSelect'
import { FaImage } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'
import { toast } from 'react-toastify'
import locations from '../../components/countries.json'
import CountrySearch from '../../components/CustomSearch'
import { db } from '../../firebase'

function CreateTracker() {

  const [mapArr, setmapArr] = useState([])

  const [fst_stage, setfst_stage] = useState('')
  const [sec_stage, setsec_stage] = useState('')
  const [trd_stage, settrd_stage] = useState('')
  const [frt_stage, setfrt_stage] = useState('')
  const [invoice, setinvoice] = useState('')
  const [amount, setamount] = useState(0)
  const [status, setstatus] = useState('')
  const [expected_arrival, setexpected_arrival] = useState('')
  const [track_number, settrack_number] = useState('')
  const [quantity, setquantity] = useState('')
  const [service, setservice] = useState('')
  const [weight, setweight] = useState('')
  const [description, setdescription] = useState('')
  const [receiver_name, setreceiver_name] = useState('')
  const [receiver_email, setreceiver_email] = useState('')
  const [receiver_address, setreceiver_address] = useState('')
  const [phone_number, setphone_number] = useState('')
  const [send_name, setsend_name] = useState('')
  const [sender_email, setsender_email] = useState('')
  const [sender_address, setsender_address] = useState('')
  const [location, setlocation] = useState('')
  const [shipment_date, setshipment_date] = useState('')
  const [ship_amount_status, setship_amount_status] = useState('')
  const [tax_amount_status, settax_amount_status] = useState('')
  const [duty_amount_status, setduty_amount_status] = useState('')
  const [img, setimg] = useState('')
  

  const AddTracker =async()=>{
    const tracker ={
      fst_stage: fst_stage || 'orange',
      sec_stage: sec_stage || 'orange',
      trd_stage: trd_stage || 'orange',
      frt_stage: frt_stage || 'orange',
      invoice: invoice || '804',
      amount: amount,
      status: status || 'PENDING',
      expected_arrival: expected_arrival || 'PENDING',
      track_number: track_number || 'PENDING',
      quantity: quantity || 'PENDING',
      service: service || 'PENDING',
      weight: weight || 'PENDING',
      description: description || 'PENDING',
      map: JSON.stringify(mapArr),
      receiver_name: receiver_name || 'PENDING',
      receiver_email: receiver_email || 'PENDING',
      receiver_address: receiver_address || 'PENDING',
      phone_number: phone_number || 'PENDING',
      send_name: send_name || 'PENDING',
      sender_email: sender_email || 'PENDING',
      sender_address: sender_address || 'PENDING',
      location: location || 'PENDING',
      shipment_date: shipment_date || 'PENDING',
      ship_amount_status: ship_amount_status || 'UNPAID',
      tax_amount_status: tax_amount_status || 'UNPAID',
      duty_amount_status: duty_amount_status || 'UNPAID',
    }

    const formData = new FormData()
    formData.append('data', JSON.stringify(tracker))
    formData.append('image', img)

    try {
      
      await db.collection('userchat').add({tracker})
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const handleDeleteMap =(id)=>{
    const map = mapArr.filter((item)=> item?.point !== id)
    setmapArr(map)
  }

  const handleSelect = (country) => {    
    if(mapArr?.length === 11 ){
      toast.success('Maximum Length Reached')
    }
    setmapArr(prev => [...prev, {point: JSON.stringify(country?.coordinates)}])

  };


  

  return (
    <div className='dashboard_container'>
      <SideBar/>
      
      <div className='dashboard_body'>
        <SubHeader/>
        <div  style={{width:'100%', height:'50px'}} ></div>

        <div className='create_tracker_input_fields' >
          <div className='create_tracker_input_field'>
            <h1 style={{margin:'20px 0'}} >ADD TRACKER</h1>
            <div  style={{width:'100%', height:'50px'}} ></div>

            <div className='_header_box' >
                <TrafficLight active={fst_stage} />
                <div className='_header_txt'>
                    <p>CONFIRMED</p>
                    <p style={{color:'grey'}}>PACKAGE CONFIRMED IN PORT</p>
                    <CustomSelect
                        options={[
                        {value: 'orange' , label: 'PENDING'},
                        {value: 'red' , label: 'HOLD'},
                        {value: 'green' , label: 'PASS'},
                        ]} 
                        onChange={(value)=> setfst_stage(value)}
                        placeholder={fst_stage}
                    />
                </div>
            </div>
            <div className='_header_box' >
                <TrafficLight active={sec_stage} />
                <div className='_header_txt'>
                    <p>SHIPPED</p>
                    <p  style={{color:'grey'}}>PACKAGE IS ON THE WAY</p>
                    <CustomSelect
                        options={[
                        {value: 'orange' , label: 'PENDING'},
                        {value: 'red' , label: 'HOLD'},
                        {value: 'green' , label: 'PASS'},
                        ]} 
                        onChange={(value)=> setsec_stage(value)}
                        placeholder='Select status'
                    />
                </div>
            </div>
            <div className='_header_box' >
                <TrafficLight active={trd_stage} />
                <div className='_header_txt'>
                    <p>SAILING</p>
                    <p  style={{color:'grey'}}>ON THE WAY</p>
                    <CustomSelect
                        options={[
                        {value: 'orange' , label: 'PENDING'},
                        {value: 'red' , label: 'HOLD'},
                        {value: 'green' , label: 'PASS'},
                        ]} 
                        onChange={(value)=> settrd_stage(value)}
                        placeholder='Select status'
                    />
                </div>
            </div>
            <div className='_header_box' >
                <TrafficLight active={frt_stage} />
                <div className='_header_txt'>
                    <p>DESTINATION</p>
                    <p  style={{color:'grey'}}>PACKAGE DELIVERED</p>
                    <CustomSelect
                        options={[
                        {value: 'orange' , label: 'PENDING'},
                        {value: 'red' , label: 'HOLD'},
                        {value: 'green' , label: 'PASS'},
                        ]} 
                        onChange={(value)=> setfrt_stage(value)}
                        placeholder='Select status'
                    />
                </div>
            </div>

            <div className='admin_input_field_' >
              <label>INVOICE</label>
              <input value={invoice} onChange={(e)=>setinvoice(e.target.value)} placeholder='Enter Invoice' />
            </div>

            <div className='admin_input_field_' >
              <label>SHIPPING COST</label>
              <input type='number' value={amount} onChange={(e)=>setamount(e.target.value)} placeholder='Enter amount' />
            </div>

            <div className='admin_input_field_' >
              <label>SHIPPING STATUS</label>

              <div className={`payment-toggle ${ship_amount_status ? "is-paid" : "is-unpaid"}`}>
                <button
                  className="toggle-option paid-option"
                  onClick={() => setship_amount_status(true)}
                  style={{transparent:'background'}}
                >
                  <span className="toggle-icon">✓</span>
                  Paid
                </button>

                <button
                  className="toggle-option unpaid-option"
                  onClick={() => setship_amount_status(false)}
                  style={{transparent:'background'}}
                >
                  <span className="toggle-icon">!</span>
                  Unpaid
                </button>
              </div>
            </div>

            <div className='admin_input_field_' >
              <label>STATUS</label>
              <input value={status} onChange={(e)=>setstatus(e.target.value)} placeholder='Enter Status' />
            </div>

            <div className='admin_input_field_' >
              <label>EXPECTED ARRIVAL</label>
              <input  value={expected_arrival} onChange={(e)=>setexpected_arrival(e.target.value)} placeholder='Enter Expected arrival' type='date' />
            </div>

            <div className='admin_input_field_' >
              <label>TRACKING NO.</label>
              <input value={track_number} onChange={(e)=>settrack_number(e.target.value)} placeholder='Enter Tracking Number' />
            </div>

            <div className='admin_input_field_' >
              <label>QUANTITY</label>
              <input value={quantity} onChange={(e)=>setquantity(e.target.value)} placeholder='Enter Quantity' />
            </div>

            <div className='admin_input_field_' >
              <label>SERVICE</label>
              <input value={service} onChange={(e)=>setservice(e.target.value)} placeholder='Enter Service' />
            </div>

            <div className='admin_input_field_' >
              <label>WEIGHT</label>
              <input value={weight} onChange={(e)=>setweight(e.target.value)} placeholder='Enter Weight' />
            </div>

            <div className='admin_input_field_' >
              <label>DESCRIPTION</label>
              <input value={description} onChange={(e)=>setdescription(e.target.value)} placeholder='Enter Description' />
            </div>
          </div>

          <div className='create_tracker_input_field'>

            <div className='create_tracker_map_field'>
              {
                mapArr?.map((item, i)=>(
                <div key={i} className='create_tracker_map_field_box'>
                  <p>{item?.point}</p>
                  <div onClick={()=>handleDeleteMap(item?.point)} className='create_tracker_map_field_btn'>
                    <MdDelete size={25} />
                  </div>
                </div>
                ))
              }
            </div>

            <div className='admin_input_field_' >
              <label>EDIT MAP</label>
              <div>
                <CountrySearch data={locations} onSelect={handleSelect} />
               </div>
            </div>

            <div className='admin_input_field_' >
              <label>RECEIVE NAME</label>
              <input  value={receiver_name} onChange={(e)=>setreceiver_name(e.target.value)} placeholder='Enter Receiver Name' />
            </div>

            <div className='admin_input_field_' >
              <label>RECEIVER EMAIL</label>
              <input value={receiver_email} onChange={(e)=>setreceiver_email(e.target.value)} placeholder='Enter Receiver Email' />
            </div>

            <div className='admin_input_field_' >
              <label>RECEIVER ADDRESS</label>
              <input value={receiver_address} onChange={(e)=>setreceiver_address(e.target.value)} placeholder='Enter Receiver Address' />
            </div>

            <div className='admin_input_field_' >
              <label>RECEIVER PHONE NUMBER</label>
              <input value={phone_number} onChange={(e)=>setphone_number(e.target.value)} placeholder='Enter Receiver Address' />
            </div>

            <div className='admin_input_field_' >
              <label>SENDER NAME</label>
              <input value={send_name} onChange={(e)=>setsend_name(e.target.value)} placeholder='Enter Sender Name' />
            </div>

            <div className='admin_input_field_' >
              <label>SENDER EMAIL</label>
              <input value={sender_email} onChange={(e)=>setsender_email(e.target.value)} placeholder='Enter Sender Email' />
            </div>

            <div className='admin_input_field_' >
              <label>SENDER ADDRESS</label>
              <input value={sender_address} onChange={(e)=>setsender_address(e.target.value)} placeholder='Enter Sender Address' />
            </div>

            <div className='admin_input_field_' >
              <label>LOCATIONS</label>
              <input value={location} onChange={(e)=>setlocation(e.target.value)} placeholder='Enter Location' />
            </div>

            <div className='admin_input_field_' >
              <label>SHIPMENT DATE</label>
              <input value={shipment_date} onChange={(e)=>setshipment_date(e.target.value)} placeholder='Enter Description' type='date' />
            </div>

            <div className='image_uploader' >
              <input onChange={(e)=> setimg(e.target.files[0])} style={{display:'none'}} type='file' id='file' />\
              {
                !img ?
                <label htmlFor='file'>
                  <FaImage size={200} color='grey' />
                </label>
                : 
                <div style={{
                  backgroundImage:`url(${URL.createObjectURL(img)})`, 
                  width:'100%', 
                  backgroundPosition:'center', 
                  backgroundSize:'cover',
                  height:'300px'
                }} />
              }
              <label htmlFor='file'>
                <button className='img_select_btn'>SELECT IMAGE</button>
              </label>
            </div>
          </div>
        </div>

        <button onClick={AddTracker} className='create_btn'>CREATE TRACKER</button>
      </div>
    </div>
  )
}

export default CreateTracker