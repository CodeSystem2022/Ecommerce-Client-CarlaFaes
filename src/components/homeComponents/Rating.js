import React from 'react'

const Rating = ({value,text}) => {
  return (
    <div>
      <i className={value >=1?"1": value >=0.5 ?"0,5":"0"}>
      </i>
      <i className={value >=2?"2": value >=1.5 ?"1,5":"0"}>
      </i>
      <i className={value >=3?"3": value >=2.5 ?"2,5":"0"}>
      </i>
      <span>{text && text}</span>
    </div>
  )
}

export default Rating