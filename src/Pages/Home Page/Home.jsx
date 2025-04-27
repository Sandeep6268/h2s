import React from 'react'
import './Home.css'
import Header from '../../Component/Header/Header'
import Hero from '../../Component/HeroSection/Hero'
import CoursePage from '../../Component/Courses/Courses Page/CoursePage'
import Footer from '../../Component/Footer/Footer'
import Reviews from '../../Component/Reviews/Reviews'

const Home = () => {
  return (
    <>
        <Header/>
        <Hero/>
        <CoursePage/>
        <Reviews/>
        <Footer/>
    </>
  )
}

export default Home