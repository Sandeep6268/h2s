import React, { useState, useEffect } from "react";
import { Card, Button, Badge, Container } from "react-bootstrap";
import "./Reviews.css";

const Reviews = () => {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [wordCount, setWordCount] = useState(0);

  // Your existing reviews_content array remains the same
  const reviews_content = [
    {
      name: "Harish",
      message:
        "I joined the React course and it exceeded my expectations. Clean UI, smooth learning, and the certificate really boosts confidence. Highly recommended!",
    },
    {
      name: "Mohit Reddy",
      message:
        "Great platform to learn Django! Everything was simple yet powerful. Got my certificate within minutes after finishing the final project.",
    },
    {
      name: "Anjali Verma",
      message:
        "The Python course was a game-changer. I finally understand the basics clearly. Super satisfied!",
    },
    {
      name: "Rahul Singh",
      message:
        "Excellent support and clear instructions. The JavaScript content is very well curated.",
    },
    {
      name: "Priya Sharma",
      message:
        "Loved the real-world projects. Helped me build a strong portfolio. Highly recommended!",
    },
    {
      name: "Amit Das",
      message:
        "React course was super smooth. The explanations and examples were on point.",
    },
    {
      name: "Sneha Patel",
      message:
        "Great value for money. Learned full-stack development in one place.",
    },
    {
      name: "Vikram Roy",
      message:
        "Django deployment was so easy with their guidance. Appreciate the effort!",
    },
    {
      name: "Divya Menon",
      message:
        "I loved how interactive the quizzes and assignments were. Helped me stay engaged.",
    },
    {
      name: "Karan Mehta",
      message:
        "Highly practical and to the point. Got a certificate that added real value to my CV.",
    },
    {
      name: "Neha Joshi",
      message:
        "Fantastic course content! Really appreciated the explanations and structure.",
    },
    {
      name: "Ravi Kumar",
      message:
        "Great learning experience with clear explanations. Helped me get a strong foundation in React.",
    },
    {
      name: "Swati Jain",
      message:
        "Loved the hands-on approach in the full-stack course. Highly recommend this platform.",
    },
    {
      name: "Nikhil Rao",
      message:
        "Detailed and organized content. It’s perfect for beginners and advanced learners alike.",
    },
    {
      name: "Pooja Nair",
      message:
        "The assignments were very practical and helped me understand the concepts better.",
    },
    {
      name: "Aditya Bhatt",
      message:
        "Amazing learning experience. The projects really helped me build real-world skills.",
    },
    {
      name: "Meera Kulkarni",
      message:
        "I enjoyed learning from the experts. The course was engaging and well-paced.",
    },
    {
      name: "Sameer Khan",
      message:
        "Django was made so easy! Excellent course material and clear instructions.",
    },
    {
      name: "Tanvi Desai",
      message:
        "I loved the community support. The feedback on my projects was very valuable.",
    },
    {
      name: "Rajiv Menon",
      message:
        "The certificate helped me get a job interview. Thanks for all the help and great resources.",
    },
    {
      name: "Rohit Kapoor",
      message:
        "Fantastic learning platform. Clear explanations, and the course content is up-to-date.",
    },
    {
      name: "Sonia Yadav",
      message:
        "Loved the assignments and challenges that helped me apply the theory in real-time.",
    },
    {
      name: "Sandeep Singh",
      message:
        "The Python content was really helpful and provided solid foundational knowledge.",
    },
    {
      name: "Simran Kaur",
      message:
        "I was able to learn at my own pace and apply everything to build a project.",
    },
    {
      name: "Prashant Shah",
      message:
        "The full-stack course was very detailed. I feel much more confident in my skills.",
    },
    {
      name: "Ankur Gupta",
      message:
        "Amazing experience! The course helped me solidify my understanding of both front-end and back-end.",
    },
    {
      name: "Alok Yadav",
      message:
        "Clear, concise, and well-structured courses. Loved the practical examples.",
    },
    {
      name: "Ritika Arora",
      message:
        "The course materials were very comprehensive, and I had fun learning Django.",
    },
    {
      name: "Aman Mehta",
      message:
        "I appreciate the easy-to-follow approach in the React course. Learned a lot.",
    },
    {
      name: "Shweta Agarwal",
      message:
        "The course was beginner-friendly, and I loved how interactive everything was.",
    },
    {
      name: "Ravi Verma",
      message:
        "Highly recommend the platform. I can now confidently work on Django projects.",
    },
    {
      name: "Tarun Gupta",
      message:
        "Amazing course, very detailed with practical examples. The instructors were excellent.",
    },
    {
      name: "Madhavi Sharma",
      message:
        "Great course structure and easily understandable. I learned at my own pace.",
    },
    {
      name: "Nitin Patel",
      message:
        "Had a wonderful experience learning React. The course exceeded my expectations!",
    },
    {
      name: "Jaya Kumari",
      message:
        "Enjoyed every bit of the full-stack course. It really helped me grow my skill set.",
    },
    {
      name: "Vikas Joshi",
      message:
        "The Django course helped me grasp advanced concepts more easily. Great learning experience.",
    },
    {
      name: "Sahil Kumar",
      message:
        "Great platform! Helped me land a job interview by improving my coding skills.",
    },
    {
      name: "Simran Singh",
      message:
        "Excellent course! The content was well-structured, and the explanations were clear.",
    },
    {
      name: "Suman Yadav",
      message:
        "Loved learning full-stack development from scratch. Everything was perfectly explained.",
    },
    {
      name: "Kishore Babu",
      message:
        "Great course materials and assignments! I’m now more confident in building web apps.",
    },
    {
      name: "Lalit Sharma",
      message:
        "The course helped me understand the core concepts deeply and build my skills.",
    },
    {
      name: "Nisha Agarwal",
      message: "Fantastic content and a structured approach to learning React.",
    },
    {
      name: "Anil Verma",
      message:
        "I learned so much from the practical exercises in the course. Thanks for the opportunity!",
    },
    {
      name: "Vikash Reddy",
      message:
        "Highly recommend! The courses are detailed and the community support is amazing.",
    },
    {
      name: "Geeta Kumari",
      message:
        "The content was easy to follow, and I could work on my project without any issues.",
    },
    {
      name: "Arvind Patel",
      message:
        "Learning Django was an absolute pleasure. The lessons were very clear and informative.",
    },
    {
      name: "Manju Agarwal",
      message:
        "The course was really engaging, and I loved the hands-on approach to learning.",
    },
    {
      name: "Krishna Yadav",
      message:
        "React course is awesome! Helped me understand both the fundamentals and advanced topics.",
    },
    {
      name: "Monika Kaur",
      message:
        "Great course for beginners. The assignments helped solidify my understanding.",
    },
    {
      name: "Rajesh Singh",
      message:
        "Fantastic course and materials. I felt supported the entire way through my learning.",
    },
    {
      name: "Snehal Patil",
      message:
        "Great place to learn full-stack development. Loved the entire journey.",
    },
    {
      name: "Arvind Kumar",
      message:
        "Really informative! I now feel more confident working with React and Django.",
    },
    {
      name: "Divya Singh",
      message:
        "The course is well-structured, and the projects helped me build a solid portfolio.",
    },
    {
      name: "Vijay Mehta",
      message:
        "Wonderful learning experience. The instructors were really helpful in answering queries.",
    },
    {
      name: "Ravi Patel",
      message:
        "Fantastic learning journey! The tutorials were clear and practical.",
    },
    {
      name: "Pankaj Kumar",
      message:
        "I’m now comfortable working with both front-end and back-end technologies.",
    },
    {
      name: "Neelam Verma",
      message:
        "Loved how easy it was to follow the lessons and learn step by step.",
    },
    {
      name: "Umesh Reddy",
      message:
        "I feel ready to work on real-world projects after completing this course!",
    },
    {
      name: "Simran Bhat",
      message:
        "The course structure is great for both beginners and advanced learners.",
    },
    {
      name: "Manoj Gupta",
      message:
        "I can now confidently build React applications. The course was very insightful.",
    },
    {
      name: "Deepika Sharma",
      message:
        "The hands-on projects were fun and helped me develop my skills faster.",
    },
    {
      name: "Kiran Mehta",
      message:
        "Very comprehensive course. Everything was explained well from the basics to advanced topics.",
    },
    {
      name: "Ajay Yadav",
      message:
        "Perfect platform for anyone looking to learn full-stack web development.",
    },
    {
      name: "Harpreet Kaur",
      message:
        "The interactive quizzes and assignments helped me retain knowledge much better.",
    },
    {
      name: "Chandan Singh",
      message:
        "I enjoyed learning with this platform. The courses were engaging and educational.",
    },
    {
      name: "Aarti Jain",
      message:
        "I gained a lot of confidence in web development after taking this course.",
    },
    {
      name: "Yogesh Kumar",
      message:
        "Really enjoyed the structure of the course. Clear and concise learning material.",
    },
    {
      name: "Ranjan Patel",
      message:
        "The course covered everything I needed to know and more. Great experience!",
    },
    {
      name: "Nidhi Agarwal",
      message:
        "I’m confident in my full-stack skills now. The course was very detailed and well-paced.",
    },
    {
      name: "Shivani Mehta",
      message:
        "Amazing content, excellent projects, and clear explanations. Very helpful!",
    },
    {
      name: "Kunal Reddy",
      message: "The resources and support were amazing. I learned a lot!",
    },
    {
      name: "Amit Kumar",
      message:
        "Very detailed and well-structured course. The assignments were perfect for hands-on learning.",
    },
    {
      name: "Preeti Verma",
      message:
        "Great course for beginners! Everything is explained in simple terms, and I loved it.",
    },
    {
      name: "Rohit Yadav",
      message:
        "The full-stack web development course helped me feel prepared for real job opportunities.",
    },
    {
      name: "Ashwin Singh",
      message:
        "I learned everything I needed to build my own web applications. Great experience!",
    },
    {
      name: "Kriti Agarwal",
      message:
        "Perfect course if you want to dive into full-stack development. A wonderful learning experience.",
    },
    {
      name: "Amit Gupta",
      message:
        "I feel more confident with React after completing the course. Highly recommend it!",
    },
    {
      name: "Manju Reddy",
      message:
        "The course was excellent. I really appreciate how hands-on everything was.",
    },
    {
      name: "Vijay Kumar",
      message:
        "This platform is perfect for anyone who wants to learn full-stack development.",
    },
    {
      name: "Neelam Joshi",
      message:
        "I highly recommend this course to anyone looking to boost their web development skills.",
    },
    {
      name: "Satish Patil",
      message:
        "The content was superb, and the assignments made the learning process easier.",
    },
    {
      name: "Renu Sharma",
      message:
        "I’m very satisfied with how the course was designed. Everything was explained in-depth.",
    },
    {
      name: "Sushma Yadav",
      message:
        "Fantastic! It was exactly what I needed to take my coding skills to the next level.",
    },
  ];

  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    setReviews(storedReviews);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !review.trim()) return;

    if (wordCount > 50) {
      alert("Review cannot be more than 50 words!");
      return;
    }

    const newReview = {
      id: Date.now(),
      name,
      review,
      timestamp: new Date().toLocaleString(),
    };
    const updatedReviews = [newReview, ...reviews];

    setReviews(updatedReviews);
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    setName("");
    setReview("");
    setWordCount(0);
  };

  const handleDelete = (id) => {
    const updatedReviews = reviews.filter((r) => r.id !== id);
    setReviews(updatedReviews);
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
  };

  const handleReviewChange = (e) => {
    const text = e.target.value;
    const words = text.trim() ? text.trim().split(/\s+/) : [];
    if (words.length <= 50) {
      setReview(text);
      setWordCount(words.length);
    }
  };

  // Combine user reviews with default reviews
  const allReviews = [
    ...reviews,
    ...reviews_content.map((r, i) => ({
      id: `default-${i}`,
      name: r.name,
      review: r.message,
      timestamp: new Date().toLocaleString(),
    })),
  ];

  return (
    <div data-bs-theme="dark">
      <Container className="py-5">
        {/* Review Form Section */}
        <Card className="mb-5 border-primary shadow-lg">
          <Card.Header className="bg-dark text-primary border-primary">
            <h2 className="mb-0">Share Your Experience</h2>
          </Card.Header>
          <Card.Body>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="form-control bg-dark text-white border-primary"
                  required
                />
              </div>
              <div className="mb-3 position-relative">
                <textarea
                  value={review}
                  onChange={handleReviewChange}
                  placeholder="Write your review here (max 50 words)..."
                  className="form-control bg-dark text-white border-primary"
                  rows={4}
                  required
                />
                <Badge
                  pill
                  bg={wordCount > 50 ? "danger" : "primary"}
                  className="position-absolute bottom-0 end-0 m-2"
                >
                  {wordCount}/50 words
                </Badge>
              </div>
              <Button
                variant="primary"
                type="submit"
                className="w-100 py-2 fw-bold"
              >
                Submit Review
              </Button>
            </form>
          </Card.Body>
        </Card>

        {/* Reviews Display Section */}
        <h2 className="text-center mb-4 text-primary py-3 bg-black rounded">
          <i className="fas fa-comments me-2"></i> User Testimonials
        </h2>

        <div className="reviews-grid">
          {allReviews.map((r) => (
            <Card
              key={r.id}
              className="review-card h-100 border-primary bg-dark text-white shadow-sm"
            >
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <Card.Title className="text-primary mb-1">
                      <i className="fas fa-user-circle me-2"></i>
                      {r.name}
                    </Card.Title>
                    
                  </div>
                  {!r.id.includes("default") && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(r.id)}
                      className="rounded-circle"
                    >
                      <i className="fas fa-times"></i>
                    </Button>
                  )}
                </div>
                <Card.Text className="review-text">
                  <i className="fas fa-quote-left text-primary me-2"></i>
                  {r.review}
                  <i className="fas fa-quote-right text-primary ms-2"></i>
                </Card.Text>
                <div className="text-end">
                  <Badge bg="secondary" className="me-1">
                    <i className="fas fa-star text-warning"></i> 
                  </Badge>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Reviews;
