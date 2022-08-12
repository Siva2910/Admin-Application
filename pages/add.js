import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import CardContent from "@mui/material/CardContent";

import firebase from "../firebase/index";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { addCenter } from "./api";

const Add = () => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [state, setState] = useState({});
  const router = useRouter();

  const handleOnChange = (e) => {
    const { value } = e.target;
    setState({ ...state, [e.target.id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(state);
    addCenter(state)
      .then(() => {
        alert("center added successfully");
        setState({ name: "", district: "", phone: "", address: "", pin: "" });
      })
      .catch((err) => {
        alert(err);
        console.log("adding content failed");
      });
  };

  if (loading) {
    return (
      <div style={{ widht: "100%", alignItems: "center", padding: "5em" }}>
        <h1>Hold On.... Form is loading to fill the Vaccination Details</h1>
      </div>
    );
  }
  if (user) {
    return (
      <div>
        <Header />
        <div style={{ padding: "20px", height: "100%" }}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ height: "100%" }}
          >
            <CardContent
              style={{
                width: "50em",
                padding: "20px",
                margin: "20px",
                borderRadius: "15px",
              }}
            >
              <h1 style={{ textAlign: "center", color: "#005" }}>
                {" "}
                GO ON !!! People are Dying !! Add More Vaccination Centres
              </h1>
              <TextField
                id="name"
                label="Vaccination Center Name"
                style={{
                  width: "100%",
                  marginBottom: "20px",
                }}
                value={state.name}
                onChange={(e) => handleOnChange(e)}
                variant="outlined"
              />
              <TextField
                id="Vaccinaiton Centre address"
                multiline
                maxRows={4}
                label="Address"
                style={{
                  width: "100%",
                  marginBottom: "20px",
                }}
                value={state.address}
                onChange={(e) => handleOnChange(e)}
                variant="outlined"
              />
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <TextField
                  id="district"
                  label="District"
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                  }}
                  value={state.district}
                  onChange={(e) => handleOnChange(e)}
                  variant="outlined"
                />
                <TextField
                  id="pin"
                  label="pin"
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                  }}
                  value={state.pin}
                  onChange={(e) => handleOnChange(e)}
                  variant="outlined"
                />
              </Grid>
              <TextField
                id="phone"
                label="Phone Number"
                style={{
                  width: "100%",
                  marginBottom: "20px",
                  background: "#fbfbff",
                }}
                value={state.phone}
                onChange={(e) => handleOnChange(e)}
                variant="outlined"
              />
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  variant="success"
                  style={{ margin: "15px 0;" }}
                  onClick={handleSubmit}
                >
                  <b>Click Me to add Vaccination Centre</b>
                </Button>
              </Grid>
            </CardContent>
          </Grid>
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

        <h1>Calm Down...... Website is Loading</h1>
      </div>
    );
  }
};

export default Add;
