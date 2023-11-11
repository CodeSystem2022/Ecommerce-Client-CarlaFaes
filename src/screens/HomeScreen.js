import React from 'react'
import Header from '../components/Header'
import ShopSection from "../components/homeComponents/ShopSection"
import ContactInfo from "../components/homeComponents/ContactInfo"
import CallToActionSection from "../components/homeComponents/CallToActionSection"
import { useParams } from "react-router";


const HomeScreen = () => {
    window.scrollTo(0, 0)
    const {keywords}=useParams()
    console.log(keywords, "keyword de homescreen")
  return (
    <div>
        <Header/>
        <ShopSection keywords={keywords}/>
        <CallToActionSection/>
        <ContactInfo/>
    </div>
  )
}

export default HomeScreen