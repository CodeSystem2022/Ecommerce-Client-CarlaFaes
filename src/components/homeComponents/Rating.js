import React from 'react'
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

const Ratings = ({value,text}) => {

  return (
    // <div>
    //   <i className={value >=1?"1": value >=0.5 ?"0,5":"0"}>
    //   {value}</i>
    //   <i className={value >=2?"2": value >=1.5 ?"1,5":"0"}>{value}
    //   </i>
    //   <i className={value >=3?"3": value >=2.5 ?"2,5":"0"}>
    //   </i>
    //   <span>{text && value}</span>
    // </div>
    <Box
    sx={{
      width: 200,
      display: 'flex',
      alignItems: 'center',
    }}
  >
   
    <Rating name="read-only" value={value} readOnly />
  </Box>
  )
}

export default Ratings