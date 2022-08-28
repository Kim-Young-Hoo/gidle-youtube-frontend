import Link from "next/link";
import classes from "./sub-navigation.module.css";

function SubNavigation(props) {
  const data = props.data;

  return (
    <header className={classes.header}>
      <nav className={classes.navigation}>
        <ul>
          {data.map((song) => (
            <li>
              <Link href={"/video/" + song.id}>{song.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default SubNavigation;
