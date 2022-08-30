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

  return (
    <li className={classes.item}>
      <div className={classes.video}>
        <iframe
          title="YouTube video player"
          src={props.url}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
      <div className={classes.content}>
        <div className={classes.summary}>
          <div className={classes.title}>
            <h2>{props.title}</h2>
          </div>
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
