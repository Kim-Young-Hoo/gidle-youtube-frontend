import { getAllVideo, getFeaturedVideo } from "../helpers/api-util";
// import VideoList from "../components/video/video-list";
import VideoItem from "../components/video/video-item";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import { getCookies, setCookies, removeCookies } from "cookies-next";
import axios from "axios";

function HomePage(props) {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const router = useRouter();
  const observer = useRef();
  console.log(getCookies().loggedIn)

  if (!data) {
    return <p>Loading...</p>;
  }

  useEffect(() => {
    if (data) {
      if (props.pageNumber === 0) {
        setData([]);
      }

      setData((prevVideos) => {
        return [...new Set([...prevVideos, ...props.data])];
      });
      if (parseInt(props.pageNumber, 10) < parseInt(props.lastPageNumber, 10)) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    }
  }, [props.data]);

  const handlePagination = (pageNumber) => {
    const path = router.pathname;
    const query = router.query;
    query.pageNumber = parseInt(pageNumber, 10) + 1;
    router.push(
      {
        pathname: "/",
        query: query,
      },
      "/",
      { scroll: false }
    );
  };

  const lastElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          handlePagination(props.pageNumber);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, handlePagination]
  );

  return (
    <ul className="video-ul">
      {data.map((video, index) => {
        return (
          <div
            key={video.id}
            ref={data.length === index + 1 ? lastElementRef : null}
          >
            <VideoItem
              key={video.id}
              id={video.id}
              url={video.url}
              title={video.title}
              featured={video.featured}
              is_shorts={video.is_shorts}
              channel_name={video.channel_name}
              upload_date={video.upload_date}
            />
          </div>
        );
      })}
    </ul>
  );
}

export async function getServerSideProps(query) {
  // console.log(query)
  const pageNumber = query.query.pageNumber || 0;
  // console.log(pageNumber);

  const response = await axios({
    url: "https://gidleyoutubecollections.ml/api/videos/",
    method: "GET",
    params: { page_number: pageNumber, limit: 6 },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + `${process.env.API_KEY}`,
    },
  });
  const data = await response.data;
  // console.log(data);

  return {
    props: {
      data: data.data,
      pageNumber: pageNumber,
      lastPageNumber: data.last_page,
    },
  };
}

export default HomePage;
