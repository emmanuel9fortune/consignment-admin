import React, { useEffect, useState } from 'react'
import '../styles/banner.css'

 const images =[
    "/assets/ban1.jpg",
    "/assets/ban2.jpg",
  ]

function Banner() {
 
  const [index, setindex] = useState(0)

  useEffect(()=>{
    const interval = setInterval(()=>{
      setindex((prev)=> (prev + 1) % images.length )
    }, 4000)
    return ()=> clearInterval(interval)
  },[])
 
  return (
    <div className='BannerContainer'>
      <div className='BannerImageOverlay'></div>
      <div className='BannerImages' key={index} style={{backgroundImage:`url(${images[index]})`}}></div>
    </div>
  )
}

export default Banner