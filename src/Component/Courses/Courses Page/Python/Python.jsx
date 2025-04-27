import React, { useContext, useEffect, useState } from "react";
import "../../../Youtube/Youtube.css";
// import like from "../../assets/like.png";
// import dislike from "../../assets/dislike.png";
// import share from "../../assets/share.png";
// import save from "../../assets/save.png";
// import { API_KEY, Contexapi, value_converter } from "../../Contex";
// import moment from "moment/moment";

const Python = () => {
  const [selectedVideo, setSelectedVideo] = useState({
    videoId: "8cVkLeCqUHk",
    title: "Default Title",
    description: "Default Description",
  });
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const playlistId = "PLuoKHxXYY-ufOxC0egfCIH2pNExge8lyD"; // ✅ Tumhara Playlist ID
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
    <>
      <div className="playvideo">
        <iframe
          src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1&rel=0`}
          title={selectedVideo.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>

        <div className="playvideo-info">
          <h3>{selectedVideo.title}</h3>
          <hr />
          <div className="description">
            <p>{selectedVideo.description}</p>
            <hr />
          </div>
        </div>
      </div>

      <div>
        <h1>Modules</h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
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
              style={{ cursor: "pointer" }}
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                style={{ width: "300px" }}
              />
              <h3>{video.snippet.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Python;
