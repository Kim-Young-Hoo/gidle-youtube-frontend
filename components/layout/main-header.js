import Link from "next/link";
import classes from "./main-header.module.css";

function MainHeader() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">아이들 유튜브 저장소 </Link>
      </div>
      <nav className={classes.navigation}>
        <ul>
          <li>
            <Link href="/video">Browse All Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
