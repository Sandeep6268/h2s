import React from 'react'
import './Home.css'
import Header from '../../Component/Header/Header'
import Hero from '../../Component/HeroSection/Hero'
import CoursePage from '../../Component/Courses/Courses Page/CoursePage'
import Footer from '../../Component/Footer/Footer'

const Home = () => {
  return (
    <>
        <Header/>
        <Hero/>
        <CoursePage/>
        <Footer/>
    </>
  )
}

export default Home