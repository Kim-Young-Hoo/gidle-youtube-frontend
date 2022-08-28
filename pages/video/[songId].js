// import { getAllVideo, getFeaturedVideo } from "../../helpers/api-util";
import VideoList from "../../components/video/video-list";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function SongFilterPage(props) {
  const videos = props.videos;

  if (!videos) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <VideoList video={videos}></VideoList>
    </div>
  );
}

export async function getStaticProps(context) {
  const songId = context.params.songId;
  const response = await fetch(
    "https://gidleyoutubecollections.ml/api/videos/" + songId,
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

export async function getStaticPaths() {
  const songFilters = [
    { name: "LATATA", id: 1 },
    { name: "한(一)", id: 2 },
    { name: "Senroita", id: 3 },
    { name: "Uh-Oh", id: 4 },
    { name: "퀸덤&Lion", id: 12 },
    { name: "Oh my god", id: 6 },
    { name: "I'm the trend", id: 7 },
    { name: "DUMDi DUMDi", id: 8 },
    { name: "화(火花)", id: 9 },
    { name: "개인활동기", id: 10 },
    { name: "TOMBOY", id: 11 },
  ];

  const paths = songFilters.map((song) => ({
    params: { songId: song.id.toString() },
  }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export default SongFilterPage;
