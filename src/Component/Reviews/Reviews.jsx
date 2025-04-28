import React, { useState, useEffect } from "react";
import "./Reviews.css";

const Reviews = () => {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  // Load reviews from localStorage
  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    setReviews(storedReviews);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !review.trim()) return;

    const wordCount = review.trim().split(/\s+/).length;
    if (wordCount > 50) {
      alert("Review cannot be more than 50 words!");
      return;
    }

    const newReview = { id: Date.now(), name, review };
    const updatedReviews = [newReview, ...reviews];

    setReviews(updatedReviews);
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    setName("");
    setReview("");
  };

  const handleDelete = (id) => {
    const updatedReviews = reviews.filter((r) => r.id !== id);
    setReviews(updatedReviews);
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
  };

  return (
    <>
      <h2 className="review-heading py-2 text-primary container-fluid">Share Your Experience</h2>
      <div className="review-container">
        <form onSubmit={handleSubmit} className="review-form">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="input-field"
          />
          <textarea
            value={review}
            onChange={(e) => {
              const words = e.target.value.trim().split(/\s+/);
              if (words.length <= 50) {
                setReview(e.target.value);
              }
            }}
            placeholder="Write your review here (max 50 words)..."
            className="textarea-field"
            rows={4}
          />
          <button type="submit" className="submit-button">
            Submit Review
          </button>
        </form>
      </div>
      <h2 className="text-center py-3 my-5 container-fluid bg-black text-primary">
        Users Reviews
      </h2>
      <div className="review-list">
        
          {reviews.map((r) => (
            <div key={r.id} className="review-item">
              <div className="review-header">
                <h4 className="review-name">{r.name}</h4>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(r.id)}
                >
                  Delete
                </button>
              </div>
              <p className="review-text">{r.review}</p>
            </div>
          )
        )}
        <div className="review-item">
          <div className="review-header">
            <h4 className="review-name">Anamika</h4>
          </div>
          <p className="review-text">
            I loved the Python course! It was super easy to follow, and I
            received my certificate quickly after completing it. Highly
            recommend it for beginners!
          </p>
        </div>
        <div className="review-item">
          <div className="review-header">
            <h4 className="review-name">Tahir </h4>
          </div>
          <p className="review-text">
            Bought the HTML and CSS combo. Great content, explained very
            clearly. The certificate adds a lot of value to my resume. Thank you
            team!
          </p>
        </div>
        <div className="review-item">
          <div className="review-header">
            <h4 className="review-name">Munim</h4>
          </div>
          <p className="review-text">
            The JavaScript course was well-structured. I enjoyed the assignments
            and projects. Receiving the certificate after completion was a nice
            bonus.
          </p>
        </div>
        <div className="review-item">
          <div className="review-header">
            <h4 className="review-name"> Harish</h4>
          </div>
          <p className="review-text">
            I joined the React course and it exceeded my expectations. Clean UI,
            smooth learning, and the certificate really boosts confidence.
            Highly recommended!
          </p>
        </div>
        <div className="review-item">
          <div className="review-header">
            <h4 className="review-name">Mohit Redy</h4>
          </div>
          <p className="review-text">
            Great platform to learn Django! Everything was simple yet powerful.
            Got my certificate within minutes after finishing the final project.
          </p>
        </div>
        <div className="review-item">
          <div className="review-header">
            <h4 className="review-name">Kavya Desai</h4>
          </div>
          <p className="review-text">
            The courses are affordable and rich in quality. Loved the Python +
            Django full-stack course. Also, the certificate looks very
            professional!
          </p>
        </div>
        <div className="review-item">
          <div className="review-header">
            <h4 className="review-name"> Ankit Sharma</h4>
          </div>
          <p className="review-text">
            I completed the HTML, CSS, and JavaScript course in just 2 weeks.
            The certificate helped me during my internship interviews. Thank
            you!
          </p>
        </div>
        <div className="review-item">
          <div className="review-header">
            <h4 className="review-name">Ishita Jain</h4>
          </div>
          <p className="review-text">
            The Python course is beginner-friendly. I started from scratch and
            now I can build small projects. The certificate was a cherry on top!
          </p>
        </div>
        <div className="review-item">
          <div className="review-header">
            <h4 className="review-name">Rohan Kapoor</h4>
          </div>
          <p className="review-text">
            Completed my React course today! Best part? Certificate is instantly
            available after completion. Very motivating platform for new
            learners!
          </p>
        </div>
        <div className="review-item">
          <div className="review-header">
            <h4 className="review-name">Tanya Malhotra</h4>
          </div>
          <p className="review-text">
            Django course was amazing. Step-by-step guidance with hands-on
            projects. Loved the way they reward certificates at the end of the
            journey.
          </p>
        </div>
        <div className="review-item">
          <div className="review-header">
            <h4 className="review-name"> Yash Patel</h4>
          </div>
          <p className="review-text">
            I learned so much from the JavaScript course. The mini-projects were
            fun! I proudly added the certificate to my LinkedIn profile.
          </p>
        </div>
        <div className="review-item">
          <div className="review-header">
            <h4 className="review-name">Mitali Sen</h4>
          </div>
          <p className="review-text">
            Fantastic platform! Enrolled for Python + Django course and
            completed it easily. Certification process was smooth. Worth every
            rupee!
          </p>
        </div>
        <div className="review-item">
          <div className="review-header">
            <h4 className="review-name">Harshita Rawat</h4>
          </div>
          <p className="review-text">
            Courses are beginner to intermediate level friendly. Completed HTML
            & CSS with ease. Certificate issued immediately after final test.
            5/5 stars!
          </p>
        </div>
        <div className="review-item">
          <div className="review-header">
            <h4 className="review-name">Pooja Singh</h4>
          </div>
          <p className="review-text">
            After completing React course, I feel much more confident. Website
            experience is smooth and the certificate looks premium quality.
            Thank you!
          </p>
        </div>
        <div className="review-item">
          <div className="review-header">
            <h4 className="review-name">Aditya Nair</h4>
          </div>
          <p className="review-text">
            I wasn't sure at first but after completing Python course, I am
            super happy! Practical learning and a genuine certificate at the
            end.
          </p>
        </div>
      </div>
    </>
  );
};

export default Reviews;
