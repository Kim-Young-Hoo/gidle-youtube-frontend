import Link from "next/link";
import classes from "./main-header.module.css";
import AddVideoModal from "../modals/add-video-modal";
import { useContext, useState } from "react";
import Backdrop from "./Backdrop";
import axios from "axios";

function MainHeader() {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [quiz, setQuiz] = useState({});

  async function addVideoModalHandler() {
    await axios({
      url: "https://gidleyoutubecollections.ml/api/quiz/",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + `${process.env.API_KEY}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log(res)
          setQuiz(res.data.data);
        }
      })
      .catch((err) => {
        alert("asd");
      });
    setModalIsOpen(true);
    
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  return (
    <div>
      <header className={classes.header}>
        <div className={classes.logo}>
          <Link href="/">아이들 유튜브 저장소 </Link>
        </div>
        <nav className={classes.navigation}>
          <ul>
            <li>
              <button onClick={addVideoModalHandler} className={classes.button}>
                <h1>영상 추가 +</h1>
              </button>
            </li>
          </ul>
        </nav>
      </header>
      {isModalOpen ? (
        <AddVideoModal
          quiz={quiz}
          onCancel={closeModalHandler}
          onConfirm={closeModalHandler}
        />
      ) : null}
      {isModalOpen ? <Backdrop onClick={closeModalHandler} /> : null}
    </div>
  );
}

export default MainHeader;
