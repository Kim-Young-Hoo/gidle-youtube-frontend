import { getAllVideo, getFeaturedVideo } from "../helpers/api-util";
// import VideoList from "../components/video/video-list";
import VideoItem from "../components/video/video-item";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";

// import useVideoSearch from "../helpers/use-video-search";
import axios from "axios";

function HomePage(props) {
  const [data, setData] = useState([props.data]);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();
  const observer = useRef();

  useEffect(() => {
    if (props.pageNumber === 0) {
      setData([props.data]);
    }
  });

  useEffect(() => {
    if (data) {
      setData(props.data);
      if (parseInt(props.pageNumber, 10) < parseInt(props.lastPageNumber, 10)) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    }
  }, [props.data]);

  if (!data) {
    return <p>Loading...</p>;
  }

  const handlePagination = (pageNumber) => {
    // const path = router.pathname;
    const query = router.query;
    console.log(pageNumber);
    query.pageNumber = parseInt(pageNumber, 10) + 1;
    router.push(
      {
        // pathname: path,
        query: query,
      },
      undefined,
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
    <ul>
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
              channel={video.channel}
              upload_date={video.upload_date}
            />
          </div>
        );
      })}
    </ul>
  );
}

export async function getServerSideProps(query) {
  const pageNumber = query.query.pageNumber || 0;
  console.log(pageNumber);

  const response = await axios({
    url: "https://gidleyoutubecollections.ml/api/videos/",
    method: "GET",
    params: { page_number: pageNumber },
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
