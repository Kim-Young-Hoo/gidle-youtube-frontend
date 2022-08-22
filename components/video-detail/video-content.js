import classes from './video-content.module.css';

function VideoContent(props) {
  return (
    <section className={classes.content}>
      {props.children}
    </section>
  );
}

export default VideoContent;
