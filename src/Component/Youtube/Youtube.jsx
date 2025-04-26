import React, { useContext, useEffect, useState } from "react";
// import "./youtube.css";
// import like from "../../assets/like.png";
// import dislike from "../../assets/dislike.png";
// import share from "../../assets/share.png";
// import save from "../../assets/save.png";
// import { API_KEY, Contexapi, value_converter } from "../../Contex";
// import moment from "moment/moment";

const PlayVideo = () => {
  //   const { setCataId,setCatagoryIdPlay } = useContext(Contexapi);
  //   const [apiData, setApiData] = useState('');
  //   const [channelData, setChannelData] = useState(null);
  //   const [comments, setComments] = useState(null);

  //   useEffect(() => {
  //     if (videoId) {
  //       setApiData(null);
  //       setChannelData(null);
  //       setComments(null);
  //       setCataId(null);
  //       fetchVideoData();
  //     }
  //   }, [videoId]);

    // const fetchVideoData = async () => {
    //   try {
    //     const VideoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    //     const res = await fetch(VideoDetails_url);
    //     const data = await res.json();

  //       if (data.items && data.items.length > 0) {
  //         setCatagoryIdPlay((data.items[0].snippet.categoryId));
  //         const timer = setTimeout(() => {
  //           setApiData(data.items[0]);
  //           clearTimeout(timer);
  //         }, 3000);
  //       } else {
  //         console.warn("⚠ No video data found!");
  //       }
  //     } catch (error) {
  //       console.error("❌ Error fetching video data:", error);
  //     }
  //   };

  //   useEffect(() => {
  //     if (apiData) {
  //       fetchOtherData();
  //       fetchCommentData();

  //       console.log("📌 Setting categoryId:", apiData.snippet.categoryId);
  //       setCataId(apiData.snippet.categoryId);
  //     }
  //   }, [apiData]);

  //   const fetchOtherData = async () => {
  //     try {
  //       const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData?.snippet.channelId}&key=${API_KEY}`;
  //       const res = await fetch(channelData_url);
  //       const data = await res.json();
  //       setChannelData(data.items[0]);
  //     } catch (error) {
  //       console.error("❌ Error fetching channel data:", error);
  //     }
  //   };

  //   const fetchCommentData = async () => {
  //     try {
  //       const commentData_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
  //       const res = await fetch(commentData_url);
  //       const data = await res.json();
  //       setComments(data.items);
  //     } catch (error) {
  //       console.error("❌ Error fetching comments:", error);
  //     }
  //   };

  return (
    <></>
    // <div className="playvideo">
    //   <iframe
    //     src={`https://www.youtube.com/embed/8cVkLeCqUHk?autoplay=1`}
    //     title="YouTube Video"
    //     frameBorder="0"
    //     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    //     referrerPolicy="strict-origin-when-cross-origin"
    //     allowFullScreen
    //   ></iframe>
    //   <div className="playvideo-info">
    //     <h3>title</h3>
    //     <hr />
    //     <div className="description">
    //       <p>desc</p>
    //       <hr />
    //     </div>
    //   </div>
    // </div>
  );
};

export default PlayVideo;
