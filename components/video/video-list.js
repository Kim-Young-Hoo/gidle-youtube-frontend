import VideoItem from "./video-item";
import classes from "./video-list.module.css"

function VideoList(props) {
  const data = props.video;

  return (
    <ul className={classes.list}>
      {data.map((video) => (
        <VideoItem
          key={video.id}
          id={video.id}
          url={video.url}
          title={video.title}
          featured={video.featured}
          is_shorts={video.is_shorts}
          channel={video.channel}
        />
      ))}
    </ul>
  );
}

export default VideoList;
