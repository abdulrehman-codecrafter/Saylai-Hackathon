import { Button } from "antd";
import React, { useState } from "react";
// import { auth, firestore } from "../../config/firebase";
import { auth, firestore } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { toast, Toaster } from "sonner";
import { Link } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
export default function Register() {
  
  const [state, setState] = useState(initialState);
  const [isLoading,setIsLoading]=useState(false)
  const handleChange = (e) => {
    setState((preState) => ({ ...preState, [e.target.name]: e.target.value }));
  };
  
  const handleSubmit = async () => {

    event.preventDefault();
    const { userName, email, password, confirmPassword } = state;
    if (userName.length < 3) return toast.error("Invalid User Name"); 
    // if(! window.validateEmail(email)) return toast.error("Invalid Email")
    if(password.length<6) return toast.error("Password length must be greater than 6")
    if(password!==confirmPassword) return toast.error("Password do not match")

    try {
      setIsLoading(true)
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await setDoc(doc(firestore, "users", userCredential.user.uid), {
        userName,
        email,
        user_uid: userCredential.user.uid,
        createdDate: new Date(),
        roles:["customer"]

      });
      toast.success("User registered successfully ")

    } catch (error) {
      if(error.code==="auth/email-already-in-use") return toast.error("User already exists")
    } finally {
      setIsLoading(false)
    }
  };
  return (
    <>
      <div className="auth-container">
        <div className="auth-form" >
          <h1>Register</h1>
          <form action="" onSubmit={handleSubmit}>
            <div className="input-group mb-3 px-1">
              <input
                type="text"
                name="userName"
                id="userName"
                placeholder=""
                onChange={handleChange}
                value={state.userName}
              />
              <label htmlFor="userName">User Name</label>
            </div>
            <div className="input-group mb-3 px-1">
              <input
                type="email"
                name="email"
                id="email"
                placeholder=""
                onChange={handleChange}
                value={state.email}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-group mb-3 px-1">
              <input
                type="password"
                name="password"
                id="password"
                placeholder=""
                onChange={handleChange}
                value={state.password}
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="input-group mb-3 px-1">
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder=""
                onChange={handleChange}
                value={state.confirmPassword}
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
            </div>
            <Button loading={isLoading} onClick={handleSubmit} className="submit-btn">
              Register
            </Button>
          </form>
          <p className=" mt-2 text-center">Already have an account ? <Link className="text-decoration-none" to="/auth/login"> Login</Link></p>
        </div>
      </div>
    </>
  );
}
