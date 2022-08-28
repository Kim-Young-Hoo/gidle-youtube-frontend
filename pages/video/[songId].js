import { getAllVideo, getFeaturedVideo } from "../../helpers/api-util";
import VideoList from "../../components/video/video-list";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function SongFilterPage() {
  const router = useRouter();
  const songId = router.query.songId;

  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideo, setLoadedVideo] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    fetch("https://gidleyoutubecollections.ml/api/videos/" + songId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + `${process.env.API_KEY}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setLoadedVideo(data.data);
        console.log(data.data);
      });
  }, []);

  if (!loadedVideo) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <VideoList video={loadedVideo}></VideoList>
    </div>
  );
}

export default SongFilterPage;
