import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home Page/Home";
import HtmlCssJs from "./Component/Courses/Courses Page/HTML CSS JS/HtmlCssJs";
import PythonDjango from "./Component/Courses/Courses Page/PYTHON AND DJANGO/PythonDjango";
import Reactjs from "./Component/Courses/Courses Page/REACT/Reactjs";
import Python from "./Component/Courses/Courses Page/Python/Python";
import ReactandJs from "./Component/Courses/Courses Page/REACT AND JS/ReactandJs";
import NotificationPopup from "./Component/Notification/NotificationPopup";
import Contact from "./Pages/Contact Page/Contact";
import Login from "./Pages/Login Page/Login";
import Register from "./Pages/Login Page/Register";
import { ContextProvider } from "./Context"; // Import the ContextProvider

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <NotificationPopup />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contactus" element={<Contact />} />
          <Route path="/htmlcssjs62" element={<HtmlCssJs />} />
          <Route path="/python24" element={<Python />} />
          <Route path="/react79" element={<Reactjs />} />
          <Route path="/reactandjs43" element={<ReactandJs />} />
          <Route path="/pythondjango90" element={<PythonDjango />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
