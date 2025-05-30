import {useEffect, useState} from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import Button from "../components/Button";
import { useAuth } from '../components/context/fakeauth';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const {login,isauthenticated}=useAuth();
  const navigate=useNavigate();
/*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Handles the form submission.
   * Prevents the default form submission behavior (e.g. page reload).
   * If both email and password are truthy, calls the `login` function from the
   * `useAuth` hook and passes the email and password as arguments.
   * @param {Event} e The Event object from the form submission
   */
/*******  7a1c7e66-a729-490b-8357-d319946aecee  *******/  

useEffect(function(){if(isauthenticated){navigate("/app/cities")}},[isauthenticated,navigate]);
function handlesubmit(e){
  e.preventDefault();
  if(email&&password)login(email,password);
}
  return (
    <main className={styles.login}>
      <PageNav/>
      <form className={styles.form} onSubmit={handlesubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
      <Button type="primary">login</Button>
        </div>
      </form>
    </main>
  );
}
