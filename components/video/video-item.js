import Link from "next/link";
import classes from "./video-item.module.css";
import Button from "../ui/button";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
import Card from "../ui/card";

function VideoItem(props) {
  const { id, url, title, featured, is_shorts, channel, upload_date } = props;
  const humanReadableDate = new Date(upload_date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const exploreLink = `/video/${id}`;

  return (
    <li className={classes.item}>
      <iframe
        title="YouTube video player"
        src={props.url}
        className={classes.image}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{props.title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
        </div>
      </div>
    </li>
  );
}

export default VideoItem;
