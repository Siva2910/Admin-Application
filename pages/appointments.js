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


const Appointments = () => {
  const db = firebase.firestore();

  const [user, loading, error] = useAuthState(firebase.auth());
  const router = useRouter();

  const [search,setSearch]=useState("");
  const [tempUser, setTempUser] = useState([]);
  const [userFlag, setUserFlag] = useState(0);

  useEffect(async () => {
    console.log("inside useEffect");
    const querySnapshot = await getDocs(collection(db, "appointments"));
    const size = querySnapshot.size;
    var count = 0;
    var temp = [];
    const d = new Date();
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const date = `${year}-${month}-${day}`;
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      console.log(doc.data())


      if (doc.id.includes(date)) {
        temp = temp.concat(doc.data()["appointments"]);
      }
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

    temp=temp.filter((x)=>x.phone!=rowData.patient);
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
      <div style={{ widht: "100%", alignItems: "center", padding: "5em" }}>
        <h1>Webpage is Loading.... Just a Second</h1>
      </div>
    );
  }
  if (user) {
    return (
      <div>
        <Header />
        <div style={{  padding: "20px", height: "100%" }}>
          {userFlag == 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h5>Hold on Admin... Just a Second..</h5>
            </div>
          ) : (
            <div>
              <TextField label="Search for vaccine" value={search} onChange={(e)=>setSearch(e.target.value)} color="secondary" focused />
              {console.log(tempUser)}
              {tempUser && tempUser.map(x=>{if (x.vaccine?.startsWith(search)) return (<Card sx={{ minWidth: 275}} style={{margin:"15px"}}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    <b>Patient:</b> {x.phone}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  <b>Center Name:</b>{x.name}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  <b>Vaccine Name:</b>{x.vaccine}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  <b>Dose:</b>{x.dose}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  <b>PinCode:</b>{x.pincode}
                  </Typography>

                </CardContent>
                <CardActions>
                  <Button size="medium" onClick={()=>deleterow({
                      patient:x.phone,
                      name:x.name,
                      vaccine:x.vaccine,
                      dose:x.dose
                    })}>Delete</Button>
                </CardActions>
              </Card>) }) 
            
              }
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
      <div style={{ widht: "100%", alignItems: "center", padding: "5em" }}>
 
        <h1>Calm down.... Website is Loading</h1>
      </div>
    );
  }
};

export default Appointments;
