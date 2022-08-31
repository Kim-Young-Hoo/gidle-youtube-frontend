import classes from "./video-item.module.css";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import { getCookies, setCookies, removeCookies } from "cookies-next";
import axios from 'axios';

function VideoItem(props) {
  const humanReadableDate = new Date(props.upload_date).toLocaleDateString("kr", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });


  function handleDeleteClick() {
    axios({
      url: "https://gidleyoutubecollections.ml/api/videos/",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + `${process.env.API_KEY}`,
      },
      data: {id: props.id},
    })
      .then((res) => {
        if (res.status === 200) {
          alert("삭제 성공 : " + res.data.detail);
        }
      })
      .catch((err) => {
        alert("삭제 실패 : " + err.response.data.detail);
      });
  }
  console.log(props)
  return (
    <li className={classes.item}>
      {getCookies().loggedIn === "true" && (
        <button className={classes.visible} onClick={handleDeleteClick}><h2>삭제하기</h2></button>
      )}
      <div className={classes.video}>
        <iframe
          title="YouTube video player"
          src={`${props.url}?rel=0&showinfo=0&autohide=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
      <div className={classes.content}>
        <div className={classes.summary}>
          {/* <div className={classes.title}>
            <h2>{props.title}</h2>
          </div>
          <hr></hr> */}
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.channel}>
            <AddressIcon />
            <h3>{props.channel_name}</h3>
          </div>

        </div>
      </div>
    </li>
  );
}

export default VideoItem;
