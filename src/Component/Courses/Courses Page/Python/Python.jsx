import React, { useContext, useEffect, useState } from "react";
import "../../../Youtube/Youtube.css";

const Python = () => {
  const [selectedVideo, setSelectedVideo] = useState({
    videoId: "8cVkLeCqUHk",
    title: "Default Title",
    description: "Default Description",
  });
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const playlistId = "PLuoKHxXYY-ucS5BNqSteFoEjhJdd5esB3"; // ✅ Tumhara Playlist ID
  const apiKey = "AIzaSyAYs4Z_-AVB7n9v1TYVDgiS7NdnjUoYIw0"; // ✅ Tumhara API Key

  useEffect(() => {
    const fetchPlaylistItems = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=20&key=${apiKey}`
        );
        const data = await response.json();
        console.log(data); // Debugging ke liye
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
    // <div className="player-container  d-flex gap-5 flex-wrap">
    <div className="container-fluid my-2 mx-auto main-yt-div row align-items-center w-100 justify-content-center">
      <div className="col-md-9 yt-video-div pe-sm-0">
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

      <div className="col-md-3 ">
        <h1 className="text-primary">Modules</h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "50px",marginBlock:'10px',
            alignItems: "center",
            justifyContent: "center",
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
                width: "100%",
              }}
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                style={{ width: "100%" }}
              />
              <p className="p-2">{video.snippet.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Python;
