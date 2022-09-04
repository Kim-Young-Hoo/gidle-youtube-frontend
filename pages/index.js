import VideoItem from "../components/video/video-item";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import FilterNavigation from "../components/layout/filter-navigation";

function HomePage(props) {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();
  const observer = useRef();

  if (!data) {
    return <p>Loading...</p>;
  }

  useEffect(() => {
    if (data) {
      setData((prevVideos) => {
        const newData = [...prevVideos, ...props.data].reduce(function(acc, current) {
          if (acc.findIndex(({ id }) => id === current.id) === -1) {
            acc.push(current);
          }
          return acc;
        }, []);
        return newData;
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
    const query = router.query;
    query.pageNumber = parseInt(pageNumber, 10) + 1;
    console.log("handlepagination", filters)
    query.filters = filters;
    router.push(
      {
        pathname: path,
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
          handlePagination(props.pageNumber, props.queryFilters);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, handlePagination]
  );

  function handleFilters(filter) {
    const filterString = filter.join(",").toString();
    setData([]);
    handlePagination(-1, filterString);
  }

  // function handleAllFilters(event) {
  //   const filterString = event.filters.join(",").toString();
  //   handlePagination(-1, filterString, event.allFilter);
  // }

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
  const queryFilters = query.query.filters || '1,2,3,4,5,6'


  const response = await axios({
    url: "https://gidleyoutubecollections.ml/api/videos/",
    method: "GET",
    params: { page_number: pageNumber, limit: 6, video_filter: queryFilters },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + `${process.env.API_KEY}`,
    },
  });
  const data = await response.data;

  return {
    props: {
      data: data.data,
      pageNumber: pageNumber,
      lastPageNumber: data.last_page,
      queryFilters: queryFilters,
    },
  };
}

export default HomePage;
