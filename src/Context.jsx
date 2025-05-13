import React, { createContext } from "react";

export const Context = createContext();

export const COURSE_NAMES = {
  "/htmlcss89": "HTML + CSS",
  "/htmlcssjs62": "HTML + CSS + JS",
  "/python24": "Python",
  "/pythondjango90": "Python + Django",
  "/react79": "React",
  "/reactandjs43": "React + JavaScript",
};

export const userCoursesName = [
  { course_url: "/htmlcss89" },
  { course_url: "/htmlcssjs62" },
  { course_url: "/python24" },
  { course_url: "/pythondjango90" },
  { course_url: "/react79" },
  { course_url: "/reactandjs43" },
];
