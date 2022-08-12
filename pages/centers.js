import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Typography from '@mui/material/Typography';


import firebase from "../firebase/index";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { deleteCenter } from "./api";

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';


const Centers = () => {
  const db = firebase.firestore();

  const [user, loading, error] = useAuthState(firebase.auth());
  const router = useRouter();
  const [search,setSearch]=useState("");


  const [tempUser, setTempUser] = useState([]);
  const [userFlag, setUserFlag] = useState(0);

  useEffect(async () => {
    console.log("inside useEffect");
    const querySnapshot = await getDocs(collection(db, "centers"));
    const size = querySnapshot.size;
    var count = 0;
    var temp = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());

      temp.push(doc.data());
      count++;
      if (count == size) {
        setUserFlag(1);

        setTempUser(temp);
      }
    });
  }, []);

 
  const deleterow=async (rowData) => {
    console.log(rowData)
    var temp = tempUser;

    temp=temp.filter((x)=>x.phone!=rowData.phone);
    setUserFlag(0);
    await deleteCenter(rowData)
      .then(() => {
        setTempUser(temp);
        console.log(
          
          "deleted value successfully"
        );
      })
      .catch((err) => {
        console.log(err)
        console.log("deleting value failed");
      });
    setUserFlag(1);
  }
 

  if (loading) {
    return (
      <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
    );
  }
  if (user) {
    return (
      <div>
        <Header />
        <div style={{ padding: "20px", height: "100%" }}>
          {userFlag == 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1>Hold On..... Data is on the Way!!!!</h1>
            </div>
          ) : (
            <div style={{ width: "100%" }}>
              <TextField label="Search for address" value={search} onChange={(e)=>setSearch(e.target.value)} color="secondary" focused />

              {tempUser &&tempUser.map(x=>{if (x.address.startsWith(search)) return (<Card sx={{ minWidth: 275}} style={{margin:"15px"}}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    <b>Address:</b> {x.address}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  <b>Name:</b>{x.name}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  <b>PinCode:</b>{x.pin}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  <b>District:</b>{x.district}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  <b>phone:</b>{x.phone}
                  </Typography>

                </CardContent>
                <CardActions>
                  <Button size="medium" onClick={()=>deleterow({
                      name:x.name,
                      pincode:x.pin,
                      district:x.district,
                      phone:x.phone
                    })}>Delete</Button>
                </CardActions>
              </Card>) }) }
            </div>
          )}
        </div>
      </div>
    );
  }
  if (user == null) {
    router.push({
      pathname: "/auth",
    });
    return (
      <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
    );
  }
};

export default Centers;
