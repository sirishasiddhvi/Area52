import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { SnackContext } from "../Context/UserContext";
import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import countrydata from "../../countrydata.json";
const axios = require("axios");

export function AddStore() {
  const { snack, setSnack } = useContext(SnackContext);
  const navigate = useNavigate();
  const [err, setErr] = useState();
  const [store, setStore] = useState({
    num: "",
    code: "",
    uid: "",
    name: "",
    date: "",
    region: "",
    typee: "",
    statuss: "",
    footage: "",
    footagee: "",
    active_status: "",
    tracker1:"",
    tracker2:"",
    tracker3:"",
    tracker4:"",
    tracker5:"",
    tracker6:"",
    tracker7:"",
    tracker8:"",
    tracker9:"",
    tracker10:"",
  });
  const {
    num,
    code,
    name,
    uid,
    date,
    region,
    typee,
    statuss,
    footage,
    footagee,
    active_status,tracker1,tracker2,tracker3,tracker4,tracker5,tracker6,tracker7,tracker8,tracker9,tracker10,
  } = store;
  const [statename, setStateName] = useState("");
  const [city, setCity] = useState([]);
  const [cityname, setCityname] = useState("");
  const storeChange = (e) => {
    setStore({ ...store, [e.target.name]: e.target.value });
  };
  const handlestate = (e) => {
    const statename = e.target.value;
    const getCitydata = countrydata.find(
      (state) => state.state_name === statename
    ).cities;
    setCity(getCitydata);
    setStateName(statename);
    console.log(statename);
  };
  const handlecity = (e) => {
    const cityname = e.target.value;
    console.log(cityname);
    setCityname(cityname);
  };

  const storeSubmit = async (e) => {
    e.preventDefault();
    if (num.length < 1) {
      setErr(1);
      setSnack({
        message: "Enter your store number...",
        type: "error",
        open: true,
      });
    } else if (code.length < 1) {
      setErr(2);
      setSnack({
        message: "Enter your store code...",
        type: "error",
        open: true,
      });
    } else if (uid.length < 1) {
      setErr(3);
      setSnack({
        message: "Enter your store uid",
        type: "error",
        open: true,
      });
    } else if (name.length < 1) {
      setErr(4);
      setSnack({
        message: "Enter your store name",
        type: "error",
        open: true,
      });
    } else if (date.length < 1) {
      setErr(5);
      setSnack({
        message: "Enter your store opening date...",
        type: "error",
        open: true,
      });
    } else if (statename.length < 1) {
      setErr(6);
      setSnack({
        message: "please select state...",
        type: "error",
        open: true,
      });
    } else if (cityname.length < 1) {
      setErr(7);
      setSnack({
        message: "Enter your city",
        type: "error",
        open: true,
      });
    } else if (region.length < 1) {
      setErr(8);
      setSnack({
        message: "please select region... ",
        type: "error",
        open: true,
      });
    } else if (typee.length < 1) {
      setErr(9);
      setSnack({
        message: "please select store type... ",
        type: "error",
        open: true,
      });
    } else if (statuss.length < 1) {
      setErr(10);
      setSnack({
        message: "please select status of store... ",
        type: "error",
        open: true,
      });
    } else if (footage.length < 1) {
      setErr(11);
      setSnack({
        message: "please select area in square meters... ",
        type: "error",
        open: true,
      });
    } else if (footagee.length < 1) {
      setErr(12);
      setSnack({
        message: "please select area in square feet... ",
        type: "error",
        open: true,
      });
    } else {
      const formdata = new FormData();
      formdata.append("store_no", num);
      formdata.append("code", code);
      formdata.append("uid", uid);
      formdata.append("name", name);
      formdata.append("open_date", date);
      formdata.append("state", statename);
      formdata.append("city", cityname);
      formdata.append("region", region);
      formdata.append("type", typee);
      formdata.append("status", statuss);
      formdata.append("foot_m2", footage);
      formdata.append("foot_ft2", footagee);
      formdata.append("active_status", active_status);
      formdata.append("tracker1", tracker1);
      formdata.append("tracker2", tracker2);
      formdata.append("tracker3", tracker3);
      formdata.append("tracker4", tracker4);
      formdata.append("tracker5", tracker5);
      formdata.append("tracker6", tracker6);
      formdata.append("tracker7", tracker7);
      formdata.append("tracker8", tracker8);
      formdata.append("tracker9", tracker9);
      formdata.append("tracker10", tracker10);
      await axios.post("/api/add_store", formdata).then(function(res) {
        console.log("hi");
        if (res.data.status === true) {
          setSnack({
            message: res.data.msg,
            type: "success",
            open: true,
          });
          navigate("/Dashboard/storeinfo");
        } else {
          setSnack({
            message: res.data.msg,
            type: "error",
            open: true,
          });
        }
      });
    }
  };
  return (
    <Box
      sx={{
        borderRadius: "10px",
        // backgroundColor: "#f9f2e8",
        my: 12,
        mx: 25,
        px: 5,
        py: 1,
        width: "60%",
        boxShadow:5
      }}
    >
      <Grid item justifyContent="center" alignItems="center" xs={12}>
        <Typography variant="h4">Enter store details</Typography>
      </Grid>
      <br />
      <form onSubmit={storeSubmit}>
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="flex-start"
          alignItems="left"
        >
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField
            size="small"
              label="Store No."
              name="num"
              type="number"
              variant="outlined"
              color={err === 1 ? "error" : ""}
              focused={err === 1 ? true : false}
              value={num}
              onChange={storeChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField
             size="small"
              label="Store Code"
              name="code"
              variant="outlined"
              color={err === 2 ? "error" : ""}
              focused={err === 2 ? true : false}
              value={code}
              onChange={storeChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField
             size="small"
              label="uid"
              name="uid"
              variant="outlined"
              color={err === 3 ? "error" : ""}
              focused={err === 3 ? true : false}
              value={uid}
              onChange={storeChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField
             size="small"
              label="Store Name"
              name="name"
              variant="outlined"
              color={err === 4 ? "error" : ""}
              focused={err === 4 ? true : false}
              value={name}
              onChange={storeChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField
             size="small"
              fullWidth
              //label="Store Opening Date"
              name="date"
              type="date"
              variant="outlined"
              color={err === 5 ? "error" : ""}
              focused={err === 5 ? true : false}
              value={date}
              onChange={storeChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField
             size="small"
              fullWidth
              id="select"
              label="state"
              name="state"
              // value={state}
              color={err === 6 ? "error" : ""}
              focused={err === 6 ? true : false}
              select
              onChange={(e) => handlestate(e)}
            >
              <MenuItem value="">--Select state--</MenuItem>
              {countrydata.map((getstate, index) => (
                <MenuItem value={getstate.state_name} key={index}>
                  {getstate.state_name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField
             size="small"
              select
              fullWidth
              label="City"
              name="city"
              variant="outlined"
              color={err === 7 ? "error" : ""}
              focused={err === 7 ? true : false}
              onChange={(e) => handlecity(e)}
            >
              <MenuItem value="">--Select city--</MenuItem>
              {city.map((getcity, index) => (
                <MenuItem value={getcity.city_name} key={index}>
                  {getcity.city_name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField
              fullWidth
              size="small"
              select
              label="Region"
              name="region"
              variant="outlined"
              color={err === 8 ? "error" : ""}
              focused={err === 8 ? true : false}
              value={region}
              onChange={storeChange}
            >
              <MenuItem value="EAST">EAST</MenuItem>
              <MenuItem value="WEST">WEST</MenuItem>
              <MenuItem value="SOUTH">SOUTH</MenuItem>
              <MenuItem value="NORTH">NORTH</MenuItem>
              <MenuItem value="SOUTH&EAST">SOUTH&EAST</MenuItem>
              <MenuItem value="NORTH&EAST">NORTH&EAST</MenuItem>
              <MenuItem value="SOUTH&WEST">SOUTH&WEST</MenuItem>
              <MenuItem value="NORTH&WEST">NORTH&WEST</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField
             size="small"
              fullWidth
              select
              label="Type"
              name="typee"
              variant="outlined"
              color={err === 9 ? "error" : ""}
              focused={err === 9 ? true : false}
              value={typee}
              onChange={storeChange}
            >
              <MenuItem value="L&B">L&B</MenuItem>
              <MenuItem value="NON-L&B">NON-L&B</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField
             size="small"
              label="status"
              name="statuss"
              variant="outlined"
              color={err === 10 ? "error" : ""}
              focused={err === 10 ? true : false}
              value={statuss}
              onChange={storeChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField
             size="small"
              label="Footage"
              name="footage"
              type="number"
              variant="outlined"
              color={err === 11 ? "error" : ""}
              focused={err === 11 ? true : false}
              value={footage}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">sq.m</InputAdornment>
                ),
              }}
              onChange={storeChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField
             size="small"
              label="Footage"
              name="footagee"
              type="number"
              variant="outlined"
              color={err === 12 ? "error" : ""}
              focused={err === 12 ? true : false}
              value={footagee}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">sq.ft</InputAdornment>
                ),
              }}
              onChange={storeChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField
             size="small"
              label="active_status"
              name="active_status"
              variant="outlined"
              color={err === 13 ? "error" : ""}
              focused={err === 13 ? true : false}
              value={active_status}
              onChange={storeChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField
             size="small" label="tracker1" fullWidth
             name="tracker1" value={tracker1}
             onChange={storeChange}></TextField>
             </Grid>
             <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField
             size="small" label="tracker2" fullWidth
             name="tracker2" value={tracker2}
             onChange={storeChange}/>
             </Grid>
             <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField
             size="small" label="tracker3" fullWidth
             name="tracker3" value={tracker3}
             onChange={storeChange}/>
             </Grid>
             <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField
             size="small" label="tracker4" fullWidth
             name="tracker4" value={tracker4}
             onChange={storeChange}/>
             </Grid>
             <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField
             size="small" label="tracker5" fullWidth
             name="tracker5" value={tracker5}
             onChange={storeChange}/>
             </Grid>
             <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField
             size="small" label="tracker6" fullWidth
             name="tracker6" value={tracker6}
             onChange={storeChange}/>
             </Grid>
             <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField
             size="small" label="tracker7" fullWidth
             name="tracker6" value={tracker6}/>
             </Grid>
             <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField
             size="small" label="tracker8" fullWidth
             name="tracker6" value={tracker6}/>
             </Grid>
             <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField
             size="small" label="tracker9" fullWidth
             name="tracker6" value={tracker6}/>
             </Grid>
             <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField
             size="small" label="tracker10" fullWidth
             name="tracker6" value={tracker6}/>
             </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button
             size="small"
              variant="contained"
              onClick={() => navigate("/Dashboard/storeinfo")}
            >
              Back
            </Button>
            &nbsp;&nbsp;
            <Button  size="small"type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
