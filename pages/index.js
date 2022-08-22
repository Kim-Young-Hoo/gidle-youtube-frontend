import { getAllVideo, getFeaturedVideo } from "../helpers/api-util";
import VideoList from "../components/video/video-list";
import { useState, useEffect } from "react";

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideo, setLoadedVideo] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    fetch("http://13.125.206.79:8000/videos/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setLoadedVideo(data.data);
        console.log(data.data);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
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
