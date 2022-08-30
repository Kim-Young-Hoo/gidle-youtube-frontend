import Link from "next/link";
import classes from "./sub-navigation.module.css";

function SubNavigation(props) {
  const data = props.data;

  return (
      <nav className={classes.navigation}>
        <ul>
          {data.map((song) => (
            <li>
              <Link href={"/video/" + song.id}>{song.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
  );
}

export default SubNavigation;
