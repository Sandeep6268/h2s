import React, { useEffect, useState } from "react";
import "./NotificationPopup.css"; // we'll create this css file

const notifications = [
  { name: "Aarav Sharma", course: "python", action: "bought the course" },
  {
    name: "Ishita Mehta",
    course: "html css js",
    action: "received a certificate",
  },
  { name: "Rohan Verma", course: "react", action: "completed the course" },
  { name: "Diya Kapoor", course: "python django", action: "started learning" },
  { name: "Vivaan Jain", course: "html css", action: "enrolled in the course" },
  {
    name: "Sanya Nair",
    course: "react javascript",
    action: "bought the course",
  },
  { name: "Lakshya Raj", course: "python", action: "received a certificate" },
  { name: "Avni Dey", course: "react", action: "completed the course" },
  { name: "Kabir Chauhan", course: "html css js", action: "started learning" },
  { name: "Prisha Das", course: "html css", action: "bought the course" },
  {
    name: "Aryan Tiwari",
    course: "python django",
    action: "enrolled in the course",
  },
  {
    name: "Tanya Sinha",
    course: "react javascript",
    action: "received a certificate",
  },
  { name: "Shaurya Ahuja", course: "python", action: "completed the course" },
  { name: "Jiya Bhatt", course: "react", action: "started learning" },
  { name: "Rudra Patel", course: "html css", action: "bought the course" },
  {
    name: "Kiara Tripathi",
    course: "python django",
    action: "received a certificate",
  },
  { name: "Dhruv Sethi", course: "html css js", action: "started learning" },
  {
    name: "Myra Joshi",
    course: "react javascript",
    action: "completed the course",
  },
  {
    name: "Reyansh Malhotra",
    course: "python",
    action: "enrolled in the course",
  },
  { name: "Ira Kapoor", course: "react", action: "bought the course" },
  { name: "Shaurya Singh", course: "html css", action: "completed the course" },
  { name: "Navya Desai", course: "python django", action: "started learning" },
  {
    name: "Kabir Saxena",
    course: "react javascript",
    action: "received a certificate",
  },
  { name: "Aadhya Mehta", course: "html css js", action: "bought the course" },
  { name: "Anvi Rajput", course: "python", action: "enrolled in the course" },
  { name: "Tanmay Gupta", course: "react", action: "completed the course" },
  { name: "Vedika Chawla", course: "html css", action: "started learning" },
  {
    name: "Aarohi Sinha",
    course: "python django",
    action: "received a certificate",
  },
  { name: "Riaan Joshi", course: "html css js", action: "bought the course" },
  {
    name: "Saanvi Kapoor",
    course: "react javascript",
    action: "started learning",
  },
  { name: "Manav Bhatt", course: "python", action: "completed the course" },
  { name: "Manya Rawat", course: "react", action: "received a certificate" },
  { name: "Vihaan Arora", course: "html css", action: "bought the course" },
  {
    name: "Arya Mishra",
    course: "python django",
    action: "enrolled in the course",
  },
  {
    name: "Parth Nair",
    course: "react javascript",
    action: "started learning",
  },
  {
    name: "Simran Shah",
    course: "html css js",
    action: "received a certificate",
  },
  { name: "Ishaan Vyas", course: "python", action: "bought the course" },
  { name: "Aanya Malhotra", course: "react", action: "completed the course" },
  { name: "Yash Ahuja", course: "html css", action: "started learning" },
  {
    name: "Anaya Tripathi",
    course: "python django",
    action: "received a certificate",
  },
  { name: "Kabir Joshi", course: "html css js", action: "bought the course" },
  {
    name: "Aayushi Raj",
    course: "react javascript",
    action: "enrolled in the course",
  },
  { name: "Aarav Mehta", course: "python", action: "completed the course" },
  { name: "Isha Kapoor", course: "react", action: "started learning" },
  {
    name: "Aditya Chauhan",
    course: "html css",
    action: "received a certificate",
  },
  { name: "Mehak Desai", course: "python django", action: "bought the course" },
  { name: "Riya Sethi", course: "html css js", action: "started learning" },
  {
    name: "Shaurya Taneja",
    course: "react javascript",
    action: "completed the course",
  },
  { name: "Pranav Bhatt", course: "python", action: "enrolled in the course" },
  { name: "Avantika Nair", course: "react", action: "received a certificate" },
  { name: "Arnav Joshi", course: "html css", action: "bought the course" },
  {
    name: "Ira Tiwari",
    course: "python django",
    action: "completed the course",
  },
  {
    name: "Vivaan Sinha",
    course: "react javascript",
    action: "bought the course",
  },
  {
    name: "Navya Sharma",
    course: "html css js",
    action: "enrolled in the course",
  },
  {
    name: "Ritvik Deshmukh",
    course: "python",
    action: "received a certificate",
  },
  { name: "Kiara Ahuja", course: "react", action: "started learning" },
  { name: "Atharv Yadav", course: "html css", action: "bought the course" },
  {
    name: "Anika Verma",
    course: "python django",
    action: "completed the course",
  },
  { name: "Daksh Malhotra", course: "html css js", action: "started learning" },
  {
    name: "Mahira Shah",
    course: "react javascript",
    action: "received a certificate",
  },
  { name: "Arush Kapoor", course: "python", action: "enrolled in the course" },
  { name: "Nayra Vyas", course: "react", action: "bought the course" },
  { name: "Hriday Raj", course: "html css", action: "completed the course" },
  {
    name: "Tanishka Bhatt",
    course: "python django",
    action: "started learning",
  },
  {
    name: "Yuvraj Mehta",
    course: "html css js",
    action: "received a certificate",
  },
  {
    name: "Anaisha Singh",
    course: "react javascript",
    action: "bought the course",
  },
  { name: "Reyansh Tiwari", course: "python", action: "started learning" },
  { name: "Aanya Nair", course: "react", action: "completed the course" },
  { name: "Dhruv Sinha", course: "html css", action: "enrolled in the course" },
  {
    name: "Avni Patel",
    course: "python django",
    action: "received a certificate",
  },
  { name: "Aarav Shah", course: "html css js", action: "bought the course" },
  {
    name: "Saanvika Raj",
    course: "react javascript",
    action: "started learning",
  },
  {
    name: "Shaurya Deshmukh",
    course: "python",
    action: "completed the course",
  },
  { name: "Vanya Dey", course: "react", action: "enrolled in the course" },
  {
    name: "Rivaan Joshi",
    course: "html css",
    action: "received a certificate",
  },
  { name: "Meher Verma", course: "python django", action: "started learning" },
  {
    name: "Arjun Chauhan",
    course: "html css js",
    action: "completed the course",
  },
  {
    name: "Simran Dey",
    course: "react javascript",
    action: "bought the course",
  },
  { name: "Kabir Gupta", course: "python", action: "started learning" },
  { name: "Tara Mehta", course: "react", action: "completed the course" },
  { name: "Rayan Nair", course: "html css", action: "bought the course" },
  {
    name: "Sanaya Tiwari",
    course: "python django",
    action: "received a certificate",
  },
  {
    name: "Ishaan Bhatt",
    course: "html css js",
    action: "enrolled in the course",
  },
  {
    name: "Aarohi Shah",
    course: "react javascript",
    action: "completed the course",
  },
  { name: "Veer Malhotra", course: "python", action: "bought the course" },
  { name: "Jivika Kapoor", course: "react", action: "started learning" },
  { name: "Aryan Singh", course: "html css", action: "enrolled in the course" },
  {
    name: "Mahika Tripathi",
    course: "python django",
    action: "completed the course",
  },
  {
    name: "Kiaan Desai",
    course: "html css js",
    action: "received a certificate",
  },
  {
    name: "Ira Rajput",
    course: "react javascript",
    action: "started learning",
  },
  { name: "Yug Sinha", course: "python", action: "bought the course" },
  { name: "Anvi Verma", course: "react", action: "received a certificate" },
  { name: "Ayaan Dey", course: "html css", action: "started learning" },
  { name: "Nisha Ahuja", course: "python django", action: "bought the course" },
  {
    name: "Reyansh Vyas",
    course: "html css js",
    action: "completed the course",
  },
  {
    name: "Suhana Mehta",
    course: "react javascript",
    action: "enrolled in the course",
  },
  { name: "Rudra Patel", course: "python", action: "received a certificate" },
  { name: "Diya Malhotra", course: "react", action: "bought the course" },
  { name: "Shaurya Raj", course: "html css", action: "completed the course" },
  { name: "Myra Sethi", course: "python django", action: "started learning" },
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
