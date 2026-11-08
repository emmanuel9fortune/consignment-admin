import React, { useEffect, useState } from 'react'
import locations from '../../components/countries.json'
import CustomSelect from '../../components/CustomSelect'
import TrafficLight from '../../components/Traffic'
import { MdArrowBack, MdDelete } from 'react-icons/md'
import axios from 'axios'
import { toast } from 'react-toastify'
import CountrySearch from '../../components/CustomSearch'

function EditTrackers({id, setgetid}) {
    
    const [mapArr, setmapArr] = useState([])
    const [fst_stage, setfst_stage] = useState('')
    const [sec_stage, setsec_stage] = useState('')
    const [trd_stage, settrd_stage] = useState('')
    const [frt_stage, setfrt_stage] = useState('')
    const [invoice, setinvoice] = useState('')
    const [amount, setamount] = useState('')
    const [status, setstatus] = useState('')
    const [expected_arrival, setexpected_arrival] = useState('')
    const [track_number, settrack_number] = useState('')
    const [quantity, setquantity] = useState('')
    const [service, setservice] = useState('')
    const [weight, setweight] = useState('')
    const [description, setdescription] = useState('')
    const [map, setmap] = useState('')
    const [receiver_name, setreceiver_name] = useState('')
    const [receiver_email, setreceiver_email] = useState('')
    const [receiver_address, setreceiver_address] = useState('')
    const [phone_number, setphone_number] = useState('')
    const [send_name, setsend_name] = useState('')
    const [sender_email, setsender_email] = useState('')
    const [sender_address, setsender_address] = useState('')
    const [location, setlocation] = useState('')
    const [shipment_date, setshipment_date] = useState('')
    const [reload, setreload] = useState(0)
    const [originalValues, setOriginalValues] = useState({})

      
    useEffect(()=>{
        const func=async()=>{
        try {
            const res = await axios.post('https://control.whitneyblack.com/gettracker.php', {id})    
            console.log(res);
                    
            if(res.data.status === 'success'){
                const gettrack = res.data?.info
                
                setOriginalValues(gettrack)
                setfst_stage(gettrack?.fst_stage)
                setsec_stage(gettrack?.sec_stage)
                settrd_stage(gettrack?.trd_stage)
                setfrt_stage(gettrack?.frt_stage)
                setinvoice(gettrack?.invoice)
                setamount(gettrack?.amount)
                setstatus(gettrack?.status)
                setexpected_arrival(gettrack?.expect_arrival)
                settrack_number(gettrack?.track_number)
                setquantity(gettrack?.quantity)
                setservice(gettrack?.service)
                setweight(gettrack?.weight)
                setdescription(gettrack?.description)
                setmapArr(gettrack?.map !== '[]' ? JSON.parse(gettrack?.map) : [])
                setreceiver_name(gettrack?.receiver_name)
                setreceiver_email(gettrack?.receiver_email)
                setreceiver_address(gettrack?.receiver_address)
                setsend_name(gettrack?.sender_name)
                setsender_email(gettrack?.sender_email)
                setsender_address(gettrack?.sender_address)
                setlocation(gettrack?.location)
                setshipment_date(gettrack?.shipment_date)
                setreload(0)
            }
        } catch (error) {
            console.log(error.message);
            
        }
        }
        func()
    },[reload, id])


    const handleDeleteMap =(id)=>{
        const map = mapArr.filter((item)=> item?.point !== id)
        setmapArr(map)
    }

    

    const hasChanges = () => {
        const changes = {};

        if (fst_stage && fst_stage !== originalValues.fst_stage) changes.fst_stage = fst_stage;
        if (sec_stage && sec_stage !== originalValues.sec_stage) changes.sec_stage = sec_stage;
        if (trd_stage && trd_stage !== originalValues.trd_stage) changes.trd_stage = trd_stage;
        if (frt_stage && frt_stage !== originalValues.frt_stage) changes.frt_stage = frt_stage;
        if (invoice && invoice !== originalValues.invoice) changes.invoice = invoice;
        if (amount && amount !== originalValues.amount) changes.amount = amount;
        if (status && status !== originalValues.status) changes.status = status;
        if (expected_arrival && expected_arrival !== originalValues.expect_arrival) changes.expected_arrival = expected_arrival;
        if (track_number && track_number !== originalValues.track_number) changes.track_number = track_number;
        if (quantity && quantity !== originalValues.quantity) changes.quantity = quantity;
        if (service && service !== originalValues.service) changes.service = service;
        if (weight && weight !== originalValues.weight) changes.weight = weight;
        if (description && description !== originalValues.description) changes.description = description;
        if (mapArr && JSON.stringify(mapArr) !== originalValues.map) changes.map = mapArr;
        if (receiver_name && receiver_name !== originalValues.receiver_name) changes.receiver_name = receiver_name;
        if (receiver_email && receiver_email !== originalValues.receiver_email) changes.receiver_email = receiver_email;
        if (receiver_address && receiver_address !== originalValues.receiver_address) changes.receiver_address = receiver_address;
        if (phone_number && phone_number !== originalValues.phone_number) changes.phone_number = phone_number;
        if (send_name && send_name !== originalValues.sender_name) changes.send_name = send_name;
        if (sender_email && sender_email !== originalValues.sender_email) changes.sender_email = sender_email;
        if (sender_address && sender_address !== originalValues.sender_address) changes.sender_address = sender_address;
        if (location && location !== originalValues.location) changes.location = location;
        if (shipment_date && shipment_date !== originalValues.shipment_date) changes.shipment_date = shipment_date;

        return changes;
    };
    
    
    const changes = hasChanges()    
    

    const handleSave =async()=>{
        try {
            const value ={
                fst_stage: fst_stage,
                sec_stage: sec_stage,
                trd_stage: trd_stage,
                frt_stage: frt_stage,
                invoice: invoice,
                amount: amount,
                status: status,
                expected_arrival: expected_arrival,
                track_number: track_number,
                quantity: quantity,
                service: service,
                weight: weight,
                description: description,
                map: JSON.stringify(mapArr),
                receiver_name: receiver_name,
                receiver_email: receiver_email,
                receiver_address: receiver_address,
                phone_number: phone_number,
                send_name: send_name,
                sender_email: sender_email,
                sender_address: sender_address,
                location: location,
                shipment_date: shipment_date,
                id
            }

            const res = await axios.post('https://control.whitneyblack.com/edittracker.php', value) 
            console.log(res);
                       
            if(res.data?.status === 'success'){
                toast.success('TRACKER SAVED SUCCESSFULLY')
                setreload(reload + 1)
            }
                  
        } catch (error) {
            console.log(error);
        }
    }

    const handleSelect = (country) => {    
        if(mapArr?.length === 11 ){
          toast.success('Maximum Length Reached')
        }
        setmapArr(prev => [...prev, {point: JSON.stringify(country?.coordinates)}])
    };
    

  return (
    <>
        <button style={{padding: '10px 15px', cursor:'pointer', borderRadius:'15px', display:'flex', alignItems:'center', width:'fit-content'}} onClick={()=> setgetid('')} >
        <MdArrowBack size={23} />
        Back
        </button>

        <div className='create_tracker_input_fields' >
            <div className='create_tracker_input_field'>
            <h1 style={{margin:'20px 0'}} >EDIT TRACKER</h1>

            {
                Object.keys(changes)?.length > 0 &&
                <div style={{display:'flex', alignItems:'center', position:'absolute', top:'5px', right:'10px', backgroundColor:'white', padding:'10px', zIndex:20000, border:'1px solid blue'}} >
                    <p style={{margin:'0 10px'}}>{Object.keys(changes)?.length} Changes detected. Click to save changes</p>
                    <button style={{backgroundColor:'blue', color:'white', border:'none', padding:'10px'}} onClick={handleSave} >SAVE</button>
                </div>
            }
            
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
                        placeholder={sec_stage}
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
                        placeholder={trd_stage}
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
                        placeholder={frt_stage}
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
                <label>STATUS</label>
                <input value={status} onChange={(e)=>setstatus(e.target.value)} placeholder='Enter Status' />
            </div>

            <div className='admin_input_field_' >
                <label>EXPECTED ARRIVAL</label>
                <input value={expected_arrival} onChange={(e)=>setexpected_arrival(e.target.value)} placeholder='Enter Expected arrival' type='date' />
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

            {
                mapArr?.length > 0 &&
                <h3>Map Locations</h3>
            }
            <div className='create_tracker_map_field'>
                {
                    mapArr?.length > 0 &&
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
                    <div>
                    <CountrySearch data={locations} onSelect={handleSelect} />
                    </div>
                </div>
            </div>

            <div className='admin_input_field_' >
                <label>RECEIVE NAME</label>
                <input value={receiver_name} onChange={(e)=>setreceiver_name(e.target.value)} placeholder='Enter Receiver Name' />
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
                <label>COMPANY LOCATION</label>
                <input value={location} onChange={(e)=>setlocation(e.target.value)} placeholder='Enter Location' />
            </div>

            <div className='admin_input_field_' >
                <label>SHIPMENT DATE</label>
                <input value={shipment_date} onChange={(e)=>setshipment_date(e.target.value)} placeholder='Enter Description' type='date' />
            </div>
            </div>
        </div>
    </>
  )
}

export default EditTrackers