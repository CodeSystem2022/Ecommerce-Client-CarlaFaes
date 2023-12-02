import React from 'react'
import Header from '../components/Header'
import ShopSection from "../components/homeComponents/ShopSection"
import CallToActionSection from "../components/homeComponents/CallToActionSection"
import Footer from '../components/homeComponents/Footer'
import { useParams } from "react-router";
import { Container } from '@mui/material'

const HomeScreen = () => {
    window.scrollTo(0, 0)
    const {keywords}=useParams()
    const {pageNumber}=useParams()
   
  return (
    <div  className='mx-auto'>
        <Header/>
        <Container fixed>
        <ShopSection keywords={keywords} pageNumber={pageNumber}/>
        <CallToActionSection/>
        </Container>
        <Footer/>
    </div>
  )
}

export default HomeScreen