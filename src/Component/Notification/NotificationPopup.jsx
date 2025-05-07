import React, { useEffect, useState } from "react";
import "./NotificationPopup.css"; // we'll create this css file

const notifications = [
  { name: "Priya Sharma", course: "Python", action: "bought the course" },
  {
    name: "Rahul Mehta",
    course: "HTML + CSS",
    action: "received a certificate",
  },
  { name: "Sneha Verma", course: "React.js", action: "bought the course" },
  {
    name: "Aarav Singh",
    course: "Python + Django",
    action: "received a certificate",
  },
  {
    name: "Mohit Rajput",
    course: "HTML + CSS + JavaScript",
    action: "bought the course",
  },
  { name: "Ishita Jain", course: "Python", action: "received a certificate" },
  { name: "Aditya Sinha", course: "HTML + CSS", action: "bought the course" },
  {
    name: "Kavya Desai",
    course: "Python + Django",
    action: "received a certificate",
  },
  { name: "Sarthak Agarwal", course: "React.js", action: "bought the course" },
  {
    name: "Isha Bhatt",
    course: "HTML + CSS + JavaScript",
    action: "received a certificate",
  },
  { name: "Yash Patel", course: "Python", action: "bought the course" },
  { name: "Mitali Sen", course: "React.js", action: "received a certificate" },
  { name: "Ankit Sharma", course: "HTML + CSS", action: "bought the course" },
  {
    name: "Ishaan Malik",
    course: "Python + Django",
    action: "received a certificate",
  },
  { name: "Tanya Malhotra", course: "React.js", action: "bought the course" },
  { name: "Rohan Kapoor", course: "Python", action: "received a certificate" },
  {
    name: "Mehak Gupta",
    course: "HTML + CSS + JavaScript",
    action: "bought the course",
  },
  {
    name: "Arjun Nair",
    course: "HTML + CSS",
    action: "received a certificate",
  },
  {
    name: "Pooja Singh",
    course: "Python + Django",
    action: "bought the course",
  },
  {
    name: "Harshita Rawat",
    course: "React.js",
    action: "received a certificate",
  },
  { name: "Devansh Bhatia", course: "Python", action: "bought the course" },
  {
    name: "Riya Ahuja",
    course: "HTML + CSS",
    action: "received a certificate",
  },
  {
    name: "Siddharth Kaul",
    course: "HTML + CSS + JavaScript",
    action: "bought the course",
  },
  {
    name: "Neha Rawat",
    course: "Python + Django",
    action: "received a certificate",
  },
  { name: "Lakshya Joshi", course: "React.js", action: "bought the course" },
  { name: "Simran Chawla", course: "Python", action: "received a certificate" },
  { name: "Viraj Tiwari", course: "HTML + CSS", action: "bought the course" },
  {
    name: "Aditi Chauhan",
    course: "React.js",
    action: "received a certificate",
  },
  {
    name: "Bhavya Tripathi",
    course: "Python + Django",
    action: "bought the course",
  },
  {
    name: "Manish Vyas",
    course: "HTML + CSS + JavaScript",
    action: "received a certificate",
  },
  { name: "Anaya Das", course: "React.js", action: "bought the course" },
  { name: "Ayush Raj", course: "Python", action: "received a certificate" },
  { name: "Saanvi Mishra", course: "HTML + CSS", action: "bought the course" },
  {
    name: "Vihaan Kapoor",
    course: "Python + Django",
    action: "received a certificate",
  },
  {
    name: "Divya Saini",
    course: "HTML + CSS + JavaScript",
    action: "bought the course",
  },
  {
    name: "Reyansh Chauhan",
    course: "React.js",
    action: "received a certificate",
  },
  { name: "Avantika Dey", course: "Python", action: "bought the course" },
  {
    name: "Kabir Saxena",
    course: "HTML + CSS",
    action: "received a certificate",
  },
  {
    name: "Ira Bhatnagar",
    course: "Python + Django",
    action: "bought the course",
  },
  {
    name: "Shaurya Arora",
    course: "React.js",
    action: "received a certificate",
  },
  {
    name: "Anvi Khatri",
    course: "HTML + CSS + JavaScript",
    action: "bought the course",
  },
  {
    name: "Nishant Chaturvedi",
    course: "Python",
    action: "received a certificate",
  },
  { name: "Sanya Kapoor", course: "HTML + CSS", action: "bought the course" },
  { name: "Krish Gupta", course: "React.js", action: "received a certificate" },
  {
    name: "Arya Sharma",
    course: "Python + Django",
    action: "bought the course",
  },
  {
    name: "Vivaan Chauhan",
    course: "HTML + CSS + JavaScript",
    action: "received a certificate",
  },
  { name: "Ishaan Awasthi", course: "Python", action: "bought the course" },
  {
    name: "Aarohi Kapoor",
    course: "React.js",
    action: "received a certificate",
  },
  {
    name: "Prisha Joshi",
    course: "Python + Django",
    action: "bought the course",
  },
  {
    name: "Rudra Singh",
    course: "HTML + CSS",
    action: "received a certificate",
  },
  { name: "Aanya Malhotra", course: "Python", action: "bought the course" },
  {
    name: "Dhruv Patel",
    course: "HTML + CSS + JavaScript",
    action: "received a certificate",
  },
  { name: "Manya Tiwari", course: "React.js", action: "bought the course" },
  {
    name: "Arnav Bhatt",
    course: "Python + Django",
    action: "received a certificate",
  },
  { name: "Navya Sharma", course: "HTML + CSS", action: "bought the course" },
  { name: "Parth Verma", course: "Python", action: "received a certificate" },
  { name: "Jiya Rajput", course: "React.js", action: "bought the course" },
  {
    name: "Om Sinha",
    course: "HTML + CSS + JavaScript",
    action: "received a certificate",
  },
  { name: "Anirudh Kapoor", course: "Python", action: "bought the course" },
  {
    name: "Kritika Chauhan",
    course: "Python + Django",
    action: "received a certificate",
  },
  { name: "Tanmay Das", course: "React.js", action: "bought the course" },
  {
    name: "Vedika Sharma",
    course: "HTML + CSS",
    action: "received a certificate",
  },
  { name: "Aadhya Joshi", course: "Python", action: "bought the course" },
  {
    name: "Reyansh Taneja",
    course: "HTML + CSS + JavaScript",
    action: "received a certificate",
  },
  { name: "Avni Nair", course: "Python + Django", action: "bought the course" },
  {
    name: "Shanaya Kapoor",
    course: "React.js",
    action: "received a certificate",
  },
  { name: "Tanishq Gupta", course: "Python", action: "bought the course" },
  { name: "Myra Dey", course: "HTML + CSS", action: "received a certificate" },
  {
    name: "Kabir Ahuja",
    course: "Python + Django",
    action: "bought the course",
  },
  {
    name: "Anaya Mishra",
    course: "React.js",
    action: "received a certificate",
  },
  {
    name: "Shaurya Sinha",
    course: "HTML + CSS + JavaScript",
    action: "bought the course",
  },
  { name: "Saanvi Patel", course: "Python", action: "received a certificate" },
  { name: "Vihaan Arora", course: "HTML + CSS", action: "bought the course" },
  {
    name: "Pranav Bhatt",
    course: "React.js",
    action: "received a certificate",
  },
  {
    name: "Ira Chauhan",
    course: "Python + Django",
    action: "bought the course",
  },
  { name: "Aarav Joshi", course: "Python", action: "received a certificate" },
  {
    name: "Vivaan Tiwari",
    course: "HTML + CSS + JavaScript",
    action: "bought the course",
  },
  { name: "Aryan Raj", course: "Python", action: "received a certificate" },
  { name: "Kiara Kapoor", course: "React.js", action: "bought the course" },
  {
    name: "Arjun Sinha",
    course: "HTML + CSS",
    action: "received a certificate",
  },
  {
    name: "Diya Joshi",
    course: "Python + Django",
    action: "bought the course",
  },
  {
    name: "Kabir Chawla",
    course: "HTML + CSS + JavaScript",
    action: "received a certificate",
  },
  { name: "Anvi Sharma", course: "React.js", action: "bought the course" },
  {
    name: "Shaurya Rajput",
    course: "Python",
    action: "received a certificate",
  },
  { name: "Prisha Dey", course: "HTML + CSS", action: "bought the course" },
  { name: "Reyansh Sinha", course: "Python", action: "received a certificate" },
  { name: "Aadhya Tripathi", course: "React.js", action: "bought the course" },
  {
    name: "Ishaan Kapoor",
    course: "Python + Django",
    action: "received a certificate",
  },
  {
    name: "Manya Sharma",
    course: "HTML + CSS + JavaScript",
    action: "bought the course",
  },
  { name: "Vivaan Raj", course: "Python", action: "received a certificate" },
];

const NotificationPopup = () => {
  const [currentNotification, setCurrentNotification] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * notifications.length);
      setCurrentNotification(notifications[randomIndex]);
    }, 30000); // every 30 seconds

    return () => clearInterval(interval); // cleanup
  }, []);

  useEffect(() => {
    if (currentNotification) {
      const timer = setTimeout(() => {
        setCurrentNotification(null);
      }, 4000); // hide after 4 seconds
      return () => clearTimeout(timer);
    }
  }, [currentNotification]);

  return (
    <>
      {currentNotification && (
        <div className="notification-popup">
          <strong>{currentNotification.name}</strong>{" "}
          {currentNotification.action} - <em>{currentNotification.course}</em>
        </div>
      )}
    </>
  );
};

export default NotificationPopup;
