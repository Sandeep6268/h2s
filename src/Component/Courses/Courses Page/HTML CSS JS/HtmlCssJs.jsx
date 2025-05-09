import React, { useEffect, useState } from "react";
import "../../../Youtube/Youtube.css";
import Footer from "../../../Footer/Footer";
import Header from "../../../Header/Header";
import axios from "axios";

const HtmlCssJs = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    course: "htmlcssjs",
  });

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

    try {
      // Correct URL without `/api/auth/`
      await axios.post(
        "https://h2s-backend-urrt.onrender.com/api/certificate-request/", // Correct backend URL
        formData
      );
      alert(
        "Form submitted successfully! You will get your certificate within 24 hours at you gmail"
      );
      setShowForm(false); // Hide the form after submission
    } catch (err) {
      console.error(err);
      alert("Submission failed.");
    }
  };

  const [selectedVideo, setSelectedVideo] = useState({
    videoId: "8cVkLeCqUHk",
    title: "Default Title",
    description: "Default Description",
  });
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const playlistId = "PLuoKHxXYY-udAi4nE7D8qZATGIxABFhCI"; // ✅ Tumhara Playlist ID
  const apiKey = "AIzaSyAYs4Z_-AVB7n9v1TYVDgiS7NdnjUoYIw0"; // ✅ Tumhara API Key

  useEffect(() => {
    const fetchPlaylistItems = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=20&key=${apiKey}`
        );
        const data = await response.json();
        // console.log(data); // Debugging ke liye
        setVideos(data.items || []);
        setLoading(false);

        // ✅ Default first video set kar do
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
  }, []);

  if (loading) return <div>Loading...</div>;

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
                <select
                  className="form-control my-2"
                  name="course"
                  onChange={handleFormChange}
                >
                  <option value="htmlcss">HTML + CSS</option>
                  <option value="htmlcssjs">HTML + CSS + JS</option>
                  <option value="python">Python</option>
                  <option value="python_django">Python + Django</option>
                  <option value="react">React</option>
                  <option value="react_js">React + JavaScript</option>
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
      <Footer />
    </>
  );
};

export default HtmlCssJs;
