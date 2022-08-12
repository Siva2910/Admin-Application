import react from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../firebase/index";
import { useRouter } from "next/router";
import styles from "../styles/auth.module.css";
import { useAuthState } from "react-firebase-hooks/auth";

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

function SignInScreen() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(firebase.auth());  

  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/centers",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
    },
  };
  if (loading) {
    return (
      <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
    );
  }
  if (user) {
    router.push({
      pathname: "centers",
    });
    return (
      <div style={{ widht: "100%", alignItems: "center", padding: "5em" }}>

        
      </div>
    );
  }
  return (
      <div className={styles.splitScreen}>
        <div className={styles.topPane}>
        
        </div>
        <div className={styles.bottomPane}>
            <form className={styles.form}>
            <h3 style={{textAlign:'center',position:'absolute',top:'30%',left:'66%'}}>Welcome Admin !!</h3>
            <div className="mb-3" style={{position:'absolute',top:'40%'}}>
              <div className="d-grid btn">
                <StyledFirebaseAuth
                  uiConfig={uiConfig}
                  firebaseAuth={firebase.auth()}
                />
              </div>
            </div>
          </form>
        </div>
      </div>

  )
}

export default SignInScreen;
