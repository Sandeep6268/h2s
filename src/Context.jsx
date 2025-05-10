import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleCoursePurchase = async (amount, courseId, courseName) => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      // Simulate payment processing
      const paymentSuccess = await processPayment(amount, courseId);
      
      if (paymentSuccess) {
        // Record the purchase in backend
        const response = await fetch('/api/record-purchase/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
          },
          body: JSON.stringify({
            course_id: courseId,
            course_name: courseName,
            payment_id: `pay_${Date.now()}`
          })
        });

        if (response.ok) {
          navigate(`/payment-success/${courseId}`);
        } else {
          console.error('Failed to record purchase');
          navigate('/payment-failed');
        }
      }
    } catch (error) {
      console.error('Error during purchase:', error);
      navigate('/payment-failed');
    }
  };

  const processPayment = async (amount, courseId) => {
    // In a real app, integrate with payment gateway here
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          id: `pay_${Date.now()}`,
          amount,
          courseId
        });
      }, 1000);
    });
  };

  return (
    <Context.Provider value={{ user, setUser, handleCoursePurchase }}>
      {children}
    </Context.Provider>
  );
};
