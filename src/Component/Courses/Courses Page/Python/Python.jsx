import React, { useState, useEffect } from "react";
import "../../../Youtube/Youtube.css";
import Footer from "../../../Footer/Footer";
import Header from "../../../Header/Header";
import axios from "axios";

const Python = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    course: "python",
  });
  const [loading, setLoading] = useState(false); // Loading state for loader
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [modalMessage, setModalMessage] = useState(""); // Modal message
  const [modalType, setModalType] = useState(""); // Success/Error modal type

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Validate the form before submission
    if (
      !formData.name ||
      !formData.mobile ||
      !formData.email ||
      !formData.course
    ) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true); // Start loading spinner

    try {
      await axios.post(
        "https://h2s-backend-urrt.onrender.com/api/certificate-request/",
        formData
      );
      setModalType("success");
      setModalMessage(
        "Form submitted successfully! You will get your certificate within 24 hours at your Gmail."
      );
      setShowModal(true);
      setShowForm(false); // Hide the form after submission
    } catch (err) {
      console.error(err);
      setModalType("error");
      setModalMessage("Submission failed. Please try again.");
      setShowModal(true);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  const [selectedVideo, setSelectedVideo] = useState({
    videoId: "8cVkLeCqUHk",
    title: "Default Title",
    description: "Default Description",
  });
  const [videos, setVideos] = useState([]);

  const playlistId = "PLuoKHxXYY-ucS5BNqSteFoEjhJdd5esB3"; // Playlist ID
  const apiKey = "AIzaSyAYs4Z_-AVB7n9v1TYVDgiS7NdnjUoYIw0"; // API Key

  useEffect(() => {
    const fetchPlaylistItems = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=20&key=${apiKey}`
        );
        const data = await response.json();
        setVideos(data.items || []);
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
      }
    };

    fetchPlaylistItems();
  }, []);

  if (loading) {
    return (
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
    );
  }

  return (
    <>
      <Header />
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
            <h3>{selectedVideo.title}</h3>
            <hr />
            <div className="description">
              <p>{selectedVideo.description}</p>
              <hr />
            </div>
          </div>
        </div>

        <div className="col-md-3 h-100">
          <h1 className="text-primary">Modules</h1>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "50px",
              marginBlock: "10px",
              height: "700px",
              overflowY: "scroll",
              width: "100%",
              paddingBlock: "20px",
            }}
          >
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
                style={{
                  cursor: "pointer",
                  boxShadow: "0px 0px 5px white",
                  width: "90%",
                }}
                className="button-85 no-padding"
              >
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  style={{ width: "100%", borderRadius: "10px" }}
                />
                <p className="p-2">{video.snippet.title}</p>
              </div>
            ))}
          </div>
        </div>
        <button
          className="btn btn-info w-25 mx-auto"
          onClick={() => setShowForm(true)}
        >
          Get your certificate
        </button>
      </div>

      {showForm && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ background: "#00000088" }}
        >
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
                  onChange={handleFormChange}
                />
                <input
                  className="form-control my-2"
                  name="mobile"
                  placeholder="Mobile"
                  onChange={handleFormChange}
                />
                <input
                  className="form-control my-2"
                  name="email"
                  placeholder="Email"
                  onChange={handleFormChange}
                />
                <small>
                  <span className="text-danger">Note:-</span> Enter your
                  registered Gmail only
                </small>
                <select
                  className="form-control my-2"
                  name="course"
                  onChange={handleFormChange}
                >
                  <option value="python">Python</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowForm(false)}
                >
                  Close
                </button>
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
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
              <button
                className="button-box"
                onClick={() => setShowModal(false)}
              >
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
              <button
                className="button-box"
                onClick={() => setShowModal(false)}
              >
                <p className="red">try again</p>
              </button>
            </div>
          )}
        </div>
      )}

      <Footer />
    </>
  );
};

export default Python;
