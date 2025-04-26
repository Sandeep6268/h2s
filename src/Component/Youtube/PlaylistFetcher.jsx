// import React, { useEffect, useState } from "react";

// const PlaylistFetcher = () => {
//   const [videoId, setVideoId] = useState(null); // Video ID ko store karne ke liye
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const playlistId = "PLuoKHxXYY-ueLt0K_tbBHtfMAV91uQudW"; // ✅ Tumhara Playlist ID
//   const apiKey = "AIzaSyAYs4Z_-AVB7n9v1TYVDgiS7NdnjUoYIw0"; // ✅ Tumhara API Key

//   useEffect(() => {
//     const fetchPlaylistItems = async () => {
//       try {
//         const response = await fetch(
//           `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=20&key=${apiKey}`
//         );
//         const data = await response.json();
//         console.log(data); // Debugging ke liye
//         setVideos(data.items || []);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching playlist items:", error);
//         setLoading(false);
//       }
//     };

//     fetchPlaylistItems();
//   }, []);

//   if (loading) return <div>Loading...</div>;

// //   return (
    
// //   );
// };

// // export default PlaylistFetcher;
