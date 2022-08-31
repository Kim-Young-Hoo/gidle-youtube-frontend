import axios from "axios";
import { Button, Form } from "semantic-ui-react";
import { useRef } from "react";
import router, { useRouter } from "next/router";
import { getCookies, getCookie, setCookies, removeCookies } from "cookies-next";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  function handleLogout() {
    setCookies("loggedIn", false);
    router.push("/");
  }

  if (getCookies().loggedIn === "true") {
    return (
      <div>
        <label>로그아웃 하시겠습니꺼?</label>
        <Button onClick={handleLogout} color="red">
          Logout
        </Button>
      </div>
    );
  }

  function handleLogin(event) {
    event.preventDefault();
    var { id, password } = document.forms[0];

    axios({
      url: "https://gidleyoutubecollections.ml/api/login/",
      method: "POST",
      data: { id: id.value, password: password.value },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + `${process.env.API_KEY}`,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setCookies("loggedIn", true, { maxAge: 3600 });
          router.push("/");
        }
      })
      .catch((err) => {
        setCookies("loggedIn", false, { maxAge: 3600 });
        alert("login failed");
      });
  }
  return (
    <div style={{ padding: "100px 0", textAlign: "center" }}>
      <Form onSubmit={handleLogin}>
        <Form.Field inline>
          <input placeholder="ID" name="id" required></input>
        </Form.Field>
        <Form.Field inline>
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          ></input>
        </Form.Field>
        <Button color="red">Login</Button>
      </Form>
    </div>
  );
}
