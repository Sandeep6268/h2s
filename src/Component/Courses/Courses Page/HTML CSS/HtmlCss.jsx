import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Context } from '../../../../Context';
import axios from 'axios';
import '../../../Youtube/Youtube.css';
import Header from '../../../Header/Header';
import Footer from '../../../Footer/Footer';

const HtmlCss = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.username || "",
    mobile: "",
    email: user?.email || "",
    course: "htmlcss",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState(""); // success or error

  const [selectedVideo, setSelectedVideo] = useState({
    videoId: "8cVkLeCqUHk",
    title: "Default Title",
    description: "Default Description",
  });
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const playlistId = "PLuoKHxXYY-ueLt0K_tbBHtfMAV91uQudW"; // Your Playlist ID
  const apiKey = "AIzaSyAYs4Z_-AVB7n9v1TYVDgiS7NdnjUoYIw0"; // Your API Key

  useEffect(() => {
    // Check if user has access to this course
    if (user) {
      const hasAccess = user.purchasedCourses?.some(course => course.course_id === courseId);
      if (!hasAccess) {
        navigate('/courses');
      }
    } else {
      navigate('/login');
    }

    const fetchPlaylistItems = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=20&key=${apiKey}`
        );
        const data = await response.json();
        setVideos(data.items || []);
        setLoading(false);

        if (data.items && data.items.length > 0) {
          const firstVideo = data.items[0].snippet;
          setSelectedVideo({
            videoId: firstVideo.resourceId.videoId,
            title: firstVideo.title,
            description: firstVideo.description,
          });
        }
      } catch (error) {
        console.error("Error fetching playlist items:", error);
        setLoading(false);
      }
    };

    fetchPlaylistItems();
  }, [user, courseId, navigate]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.mobile || !formData.email || !formData.course) {
      setModalMessage("Please fill all fields.");
      setModalType("error");
      setShowModal(true);
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(
        "https://h2s-backend-urrt.onrender.com/api/certificate-request/", 
        {
          ...formData,
          user: user.id
        }
      );
      setModalMessage(
        "Form submitted successfully! You will get your certificate within 24 hours at your email."
      );
      setModalType("success");
    } catch (err) {
      console.error(err);
      setModalMessage("Submission failed. Please try again.");
      setModalType("error");
    } finally {
      setIsLoading(false);
      setShowModal(true);
      setShowForm(false);
    }
  };

  if (loading) return <div className="text-center my-5">Loading course content...</div>;

  return (
    <>
      <Header />
      <div className="course-content-container">
        <div className="container-fluid my-2 main-yt-div row align-content-center margin-top">
          <div className="col-md-9 yt-video-div">
            <div className="iframe-div w-100" style={{ height: "400px" }}>
              <iframe
                className="w-100 h-100"
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1&rel=0`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>

            <div className="playvideo-info">
              <h1>HTML & CSS Course</h1>
              <h3>{selectedVideo.title}</h3>
              <hr />
              <div className="description">
                <p>{selectedVideo.description}</p>
                <hr />
              </div>
            </div>
          </div>

          <div className="col-md-3 h-100">
            <h2 className="text-primary">Course Modules</h2>
            <div className="modules-container">
              {videos.map((video) => (
                <div
                  onClick={() =>
                    setSelectedVideo({
                      videoId: video.snippet.resourceId.videoId,
                      title: video.snippet.title,
                      description: video.snippet.description,
                    })
                  }
                  key={video.snippet.resourceId.videoId}
                  className="module-card"
                >
                  <img
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                    className="module-thumbnail"
                  />
                  <p className="module-title">{video.snippet.title}</p>
                </div>
              ))}
            </div>
          </div>
          
          <button
            className="btn btn-primary w-25 mx-auto mt-3"
            onClick={() => setShowForm(true)}
          >
            Request Certificate
          </button>
        </div>

        {/* Certificate Request Modal */}
        {showForm && (
          <div className="modal show d-block" tabIndex="-1" style={{ background: "#00000088" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Certificate Form</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowForm(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <input
                    className="form-control my-2"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleFormChange}
                  />
                  <input
                    className="form-control my-2"
                    name="mobile"
                    placeholder="Mobile"
                    value={formData.mobile}
                    onChange={handleFormChange}
                  />
                  <input
                    className="form-control my-2"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleFormChange}
                  />
                  <small><span className="text-danger">Note:-</span>Enter your registered email only</small>
                  <select
                    className="form-control my-2"
                    name="course"
                    value={formData.course}
                    onChange={handleFormChange}
                  >
                    <option value="htmlcss">HTML + CSS</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowForm(false)}
                  >
                    Close
                  </button>
                  <button 
                    className="btn btn-primary" 
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="loader-container">
            <div className="loader">
              <div className="face">
                <div className="circle"></div>
              </div>
              <div className="face">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        )}

        {/* Success/Error Modal */}
        {showModal && (
          <div id="modal-container">
            {modalType === "success" ? (
              <div id="success-box">
                <div className="dot"></div>
                <div className="dot two"></div>
                <div className="face">
                  <div className="eye"></div>
                  <div className="eye right"></div>
                  <div className="mouth happy"></div>
                </div>
                <div className="shadow scale"></div>
                <div className="message">
                  <h1 className="alert">Success!</h1>
                  <p>{modalMessage}</p>
                </div>
                <button className="button-box" onClick={closeModal}>
                  <p className="green">continue</p>
                </button>
              </div>
            ) : (
              <div id="error-box">
                <div className="dot"></div>
                <div className="dot two"></div>
                <div className="face2">
                  <div className="eye"></div>
                  <div className="eye right"></div>
                  <div className="mouth sad"></div>
                </div>
                <div className="shadow move"></div>
                <div className="message">
                  <h1 className="alert">Error!</h1>
                  <p>{modalMessage}</p>
                </div>
                <button className="button-box" onClick={closeModal}>
                  <p className="red">try again</p>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default HtmlCss;