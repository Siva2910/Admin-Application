import React, { useState, useEffect } from "react";
import firebase from "../firebase/index";
import { useAuthState } from "react-firebase-hooks/auth";
import Header from "./components/Header";
import Auth from "./auth";

export default function Home() {
  const [user, loading, error] = useAuthState(firebase.auth());
  useEffect(()=>{
    console.log(loading, user);
  },[user])
  if (user) {
    return (
      <div>
        <Header />
      </div>
    );
  }
  return <Auth />;
}
