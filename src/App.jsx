import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import Routes from "../src/pages/Routes"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import { Toaster } from "sonner";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "./config/firebase";
import { useAuthContext } from "./Contexts/AuthContext";
import Loader from "./components/Loader";


function App() {
  const { isAppLoading } = useAuthContext()

  if (isAppLoading) {
    return <Loader />;
  }
  return (
    <>
      <Toaster richColors position="bottom-right" />
      <Routes></Routes>
    </>
  );
}


export default App;
