import { getAllVideo, getFeaturedVideo } from "../helpers/api-util";
import VideoList from "../components/video/video-list";
import { useState, useEffect } from "react";
import config from "../helpers/config";

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideo, setLoadedVideo] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    fetch("https://gidleyoutubecollections.ml/api/videos/", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + config['api_key']
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

// export async function getStaticProps() {
//   console.log(allVideo)
//   return {
//     props: {
//       allVideo: allVideo,
//     },
//   };
// }
export default HomePage;
