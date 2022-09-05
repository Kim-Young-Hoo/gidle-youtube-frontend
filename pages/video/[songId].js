import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import VideoItem from "../../components/video/video-item";
import axios from "axios";
import FilterNavigation from "../../components/layout/filter-navigation";


function SongFilterPage(props) {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [songId, setSongId] = useState("");
  const router = useRouter();
  const observer = useRef();

  if (!data) {
    return <p>Loading...</p>;
  }

  useEffect(() => {
    if (data) {
      if (props.songId !== songId) {
        setData([]);
        setSongId(props.songId);
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

  const handlePagination = (pageNumber, filters) => {
    const path = router.pathname;
    console.log(props);
    const query = router.query;
    query.pageNumber = parseInt(pageNumber, 10) + 1;
    query.filters = filters;

    router.push(
      {
        pathname: "/video/" + props.songId,
        query: query,
      },
      "/video/" + props.songId,
      { scroll: false }
    );
  };

  const lastElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          handlePagination(props.pageNumber, props.queryFilters);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, handlePagination]
  );

  function handleFilters(filter) {
    const filterString = filter.join(",").toString()
    setData([])
    handlePagination(-1, filterString);
  }


  return (
    <React.Fragment>
      <FilterNavigation
        handleFilter={(filters) => handleFilters(filters)}
        checkedFilters={props.queryFilters}
      ></FilterNavigation>
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
                thumbnail_url={video.thumbnail_url}
                is_shorts={video.is_shorts}
                channel_name={video.channel_name}
                upload_date={video.upload_date}
              />
            </div>
          );
        })}
      </ul>
    </React.Fragment>
  );
}

export async function getServerSideProps(query) {
  const pageNumber = query.query.pageNumber || 0;
  const songId = query.query.songId;
  const queryFilters = query.query.filters || '1,2,3,4,5,6';
  console.log("??", query.query.filters)

  const response = await axios({
    url: "https://gidleyoutubecollections.ml/api/videos/" + songId,
    method: "GET",
    params: { page_number: pageNumber, limit: 6, video_filter: queryFilters },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + `${process.env.API_KEY}`,
    },
  });
  const data = await response.data;
  // console.log(data)

  return {
    props: {
      data: data.data,
      songId: songId,
      pageNumber: pageNumber,
      lastPageNumber: data.last_page,
      queryFilters: queryFilters,
    },
  };
}

// export async function getStaticProps(context) {
//   const songId = context.params.songId;
//   const response = await fetch(
//     "https://gidleyoutubecollections.ml/api/videos/" + songId,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + `${process.env.API_KEY}`,
//       },
//     }
//   );

//   const videos = await response.json();

//   return {
//     props: {
//       videos: videos.data,
//     },
//     revalidate: 60,
//   };
// }

// export async function getStaticPaths() {
//   const songFilters = [
//     { name: "LATATA", id: 1 },
//     { name: "한(一)", id: 2 },
//     { name: "Senroita", id: 3 },
//     { name: "Uh-Oh", id: 4 },
//     { name: "퀸덤&Lion", id: 12 },
//     { name: "Oh my god", id: 6 },
//     { name: "I'm the trend", id: 7 },
//     { name: "DUMDi DUMDi", id: 8 },
//     { name: "화(火花)", id: 9 },
//     { name: "개인활동기", id: 10 },
//     { name: "TOMBOY", id: 11 },
//   ];

//   const paths = songFilters.map((song) => ({
//     params: { songId: song.id.toString() },
//   }));

//   return {
//     paths: paths,
//     fallback: "blocking",
//   };
// }

export default SongFilterPage;
