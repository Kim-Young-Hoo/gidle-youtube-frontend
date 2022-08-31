import React, { useState } from "react";
import classes from "./add-video-modal.module.css";
import { Radio, Button, Form } from "semantic-ui-react";
import axios from "axios";
import { useRef } from "react";

function AddVideoModal(props) {
  const quiz = props.quiz[0];
  const [showModal, setShowModal] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState(1);
  const youtubeUrlRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    const youtubeUrl = youtubeUrlRef.current.value;
    const youtubeData = {
      url: youtubeUrl,
      quiz_id: quiz.id,
      quiz_answer: selectedRadio,
    };

    axios({
      url: "https://gidleyoutubecollections.ml/api/videos/",
    //   url: "http://localhost:8888/api/videos/",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + `${process.env.API_KEY}`,
      },
      data: youtubeData,
    })
      .then((res) => {
        if (res.status === 201) {
          alert("등록 성공 : " + res.data.detail);
        }
      })
      .catch((err) => {
        alert("등록에 실패했습니다 : " + err.response.data.detail);
      });
  }

  function handlClickRadioButton(event) {
    setSelectedRadio(event.target.value);
  }

  return (
    <div>
      <Form onSubmit={submitHandler}>
        {/* <form className={classes.form} onSubmit={submitHandler}> */}
        <div className={classes.modal}>
          <h1>새 영상 추가하기</h1>
          <h2>Youtube 영상 주소 : </h2>
          <Form.Field>
            <input
              className={classes.input}
              type="url"
              required
              id="video"
              placeholder="EX) https://www.youtube.com/watch?v=mBLy9FO88uY"
              ref={youtubeUrlRef}
            ></input>
          </Form.Field>
          <h3>Q: {quiz.problem}</h3>
          <div className={classes.choices}>
            <div>
              <label>
                <input
                  type="radio"
                  value="1"
                  checked={selectedRadio === "1"}
                  onChange={handlClickRadioButton}
                ></input>
                {quiz.choice1}
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="2"
                  checked={selectedRadio === "2"}
                  onChange={handlClickRadioButton}
                ></input>
                {quiz.choice2}
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="3"
                  checked={selectedRadio === "3"}
                  onChange={handlClickRadioButton}
                ></input>
                {quiz.choice3}
              </label>
            </div>
          </div>
          <Button color="purple">제출</Button>
        </div>
        {/* </form> */}
      </Form>
    </div>
  );
}

export default AddVideoModal;
