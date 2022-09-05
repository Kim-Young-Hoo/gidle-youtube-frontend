export function VideoItem(props) {
  function videoFunction(url) {
    return (
      <iframe
        title="YouTube video player"
        src={`${url}?autoplay=1&rel=0&autohide=1&modestbranding=1&`}
        frameBorder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; autoplay;"
        allowFullScreen
        loading="lazy"
        width="100%"
      ></iframe>
    );
  }

  function imageFunction(url) {
    return (
      <div>
        <div className={classes.play}></div>
        <img src={url} width="100%" alt="no image"></img>
      </div>
    );
  }

  function changeComponent() {
    setShowVideo(true);
  }

  return (
    <div onClick={changeComponent} className={classes.video}>
      {showVideo === true
        ? videoFunction(props.url)
        : imageFunction(props.thumbnail_url)}
    </div>
  );
}
