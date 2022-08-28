import { getAllVideo, getFeaturedVideo } from "../helpers/api-util";
import VideoList from "../components/video/video-list";
import { useState, useEffect } from "react";

function HomePage(props) {
  const loadedVideo = props.videos;
  if (!loadedVideo) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <VideoList video={loadedVideo}></VideoList>
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://gidleyoutubecollections.ml/api/videos/",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + `${process.env.API_KEY}`,
      },
    }
  );

  const videos = await response.json();

  return {
    props: {
      videos: videos.data,
    },
    revalidate: 60,
  };
}

export default HomePage;
