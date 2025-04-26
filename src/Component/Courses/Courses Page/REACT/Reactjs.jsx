import React, { useContext, useEffect, useState } from "react";
import "../../../Youtube/Youtube.css";
// import like from "../../assets/like.png";
// import dislike from "../../assets/dislike.png";
// import share from "../../assets/share.png";
// import save from "../../assets/save.png";
// import { API_KEY, Contexapi, value_converter } from "../../Contex";
// import moment from "moment/moment";

const Reactjs = () => {
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

  //   const fetchVideoData = async () => {
  //     try {
  //       const VideoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
  //       const res = await fetch(VideoDetails_url);
  //       const data = await res.json();

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
    <div className="playvideo">
      <iframe
        src={`https://www.youtube.com/embed/8cVkLeCqUHk?autoplay=1`}
        title="YouTube Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <div className="playvideo-info">
        <h3>title</h3>
        <div className="video-sub-content">
          <div className="views-time">
            <span>views &bull; now</span>
          </div>
          <div className="video-other-task">
            <span className="other-task">
              {/* <img src={like} alt="like" /> */}
              <p> "0"</p>
            </span>
            <span className="other-task">
              {/* <img src={dislike} alt="dislike" /> */}
              <p>1</p>
            </span>
            <span className="other-task">
              {/* <img src={share} alt="share" /> */}
              <p>Share</p>
            </span>
            <span className="other-task">
              {/* <img src={save} alt="save" /> */}
              <p>Save</p>
            </span>
          </div>
        </div>
        <hr />
        <div className="creator-detail">
          <div className="about-creator">
            <div className="userprofile">
              {/* <img
                src={channelData ? channelData.snippet.thumbnails.medium.url : ""}
                alt="channel"
              /> */}
            </div>
            <div className="about-channel">
              <h3>channel name</h3>
              <p>Subscribers</p>
            </div>
          </div>
          <div className="subscribe-btn">
            <button>Subscribe</button>
          </div>
        </div>
        <div className="description">
          <p>desc</p>
          <hr />
        </div>
        <div className="comments">
          <h3>Comments</h3>
          <div className="comment-1">
            <div className="user-pic">
              {/* <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="user" /> */}
            </div>
            <div className="user-detail">
              <div className="user-name-time">
                <h3>namw</h3> &bull;
                <p>date</p>
              </div>
              <div className="comment-content">
                <p>text</p>
              </div>
              <div className="like-dislike-icons">
                <span className="like-icon">
                  {/* <img src={like} alt="like" /> */}
                  <p>like</p>
                </span>
                <span className="dislike-icon">
                  {/* <img src={dislike} alt="dislike" /> */}
                  <p>2</p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reactjs;