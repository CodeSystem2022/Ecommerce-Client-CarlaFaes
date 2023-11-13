import React from 'react'
import Header from '../components/Header'
import ShopSection from "../components/homeComponents/ShopSection"
import ContactInfo from "../components/homeComponents/ContactInfo"
import CallToActionSection from "../components/homeComponents/CallToActionSection"
import { useParams } from "react-router";
import { Container } from '@mui/material'


const HomeScreen = () => {
    window.scrollTo(0, 0)
    const {keywords}=useParams()
    const {pageNumber}=useParams()
    console.log(keywords, "keyword de homescreen","page number",pageNumber)
  return (
    <div  className='mx-auto'>
        <Header/>
        <Container fixed>
        <ShopSection keywords={keywords} pageNumber={pageNumber}/>
        {/* <CallToActionSection/>
        <ContactInfo/> */}
        </Container>
    </div>
  )
}

export default HomeScreen