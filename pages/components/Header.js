import React from 'react'
import styles from "../../styles/Header.module.css";

import firebase from '../../firebase/index';
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";



function Header() {
const [user, loading, error] = useAuthState(firebase.auth());
const router = useRouter();
  async function logout() {
    await firebase
      .auth()
      .signOut()
      .then(() =>
        router.push({
          pathname: "/auth",
        })
      );
  }
if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (user) {
  return (
    <div className={styles.headContainer}>
        <div className={styles.headwrapper}>
            <div className={styles.title}>
                <b>Welcome <span>{user.displayName}</span></b>
            </div>
           <div className={styles.links}>
           <a href="/add"><b>Add Vaccination Center</b></a>
           <a href="/centers"><b>View Vaccination Centers</b></a>
           <a href="/appointments"><b>View Booked Slots</b></a>
           <a href="#" onClick={logout}>
              <b>Logout</b>
            </a>
           </div>
        </div>

    </div>
  )}
  return(
    <div></div>
  ) 
  
}

export default Header;