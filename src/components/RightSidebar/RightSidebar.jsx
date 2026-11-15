import React from 'react'
import './RightSidebar.css'
import assets from '../../assets/assets'
const RightSidebar = () => {
  return (
    <div className='rs'>
      <div className="rs-profile"></div>
      <img src={assets.profile_img} alt=''/>
      <h>Richard Sanford<img src={assets.green_dot} alt=''/></h>
      <p>Hey,There i am Riched Sanford</p>
      
    </div>
  )
}

export default RightSidebar
