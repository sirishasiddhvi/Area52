import React, { useState, useContext, useEffect } from "react";
import { SnackContext } from "../Context/UserContext";
import {
  Box,
  Button,
  Grid,
  TextField,
  MenuItem,
  TableCell,
  Paper,
  TableBody,
  Table,
  TableContainer,
  TableRow,
  TableHead,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from "@mui/material";
import moment from "moment";
const axios = require("axios");

export function FollowUp() {
  // const [month, setMonth] = useState();
  const [loading, setLoading] = useState();
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(null);
  const { snack, setSnack } = useContext(SnackContext);
  const [open, setOpen] = useState(false);
  const [store_no, setStore_no] = useState();
  const [poc_name, setPoc_name] = useState();
  const [poc_mobile, setPoc_mobile] = useState();
  const [poc_email, setPoc_email] = useState();
  const [follow_1, setFollow_1] = useState();
  const [follow_2, setFollow_2] = useState();
  const [follow_3, setFollow_3] = useState();
  const [bill_paid, setBill_paid] = useState();
  const [notes, setNotes] = useState();
  var today = new Date();
  console.log(today);
  var month_now = moment(today).format("MMMM");
  const [month, setMonth] = useState(month_now);
  console.log(month);
  const month_name = [
    { id: "01-2022", month: "January" },
    { id: "02-2022", month: "February" },
    { id: "03-2022", month: "March" },
    { id: "04-2022", month: "April" },
    { id: "05-2022", month: "May" },
    { id: "06-2022", month: "June" },
    { id: "07-2022", month: "July" },
    { id: "08-2022", month: "August" },
    { id: "09-2022", month: "september " },
    { id: "10-2022", month: "October" },
    { id: "11-2022", month: "November" },
    { id: "12-2022", month: "December" },
  ];
  function handleClick(index) {
    setEdit(index);
  }

  function handleChange(e, index) {
    let newData = [...data];
    newData[index].follow_1 = e.target.value;
    setData(newData);
  }

  function handleBlur(e, index) {
    setEdit(null);
  }
  useEffect(() => {
    handleSubmit()
  },[]);
  const handleSubmit = () => {
    const formdata = new FormData();
    formdata.append("month", month_now);
    axios.post("/api/follow_monthly", formdata).then(function (res) {
      if (res.data.status === true) {
        // console.log(month);
        console.log(res.data.data);
        setData(res.data.data);
        setLoading(false);
        setSnack({
          message: res.data.msg,
          type: "success",
          open: true,
        });
      } else {
        setSnack({
          message: res.data.msg,
          type: "error",
          open: true,
        });
      }
    });
  }
  
  const monthSubmit = async (e) => {
    e.preventDefault();
    console.log(month);
    const formdata = new FormData();
    formdata.append("month", month);
    await axios.post("/api/follow_monthly", formdata).then(function (res) {
      console.log("hi");
      if (res.data.status === true) {
        console.log(month);
        console.log(res.data.data);
        setData(res.data.data);
        setLoading(false);
        setSnack({
          message: res.data.msg,
          type: "success",
          open: true,
        });
      } else {
        setSnack({
          message: res.data.msg,
          type: "error",
          open: true,
        });
      }
    });
  };
  return (
    <Box sx={{ m: 12, height: "500px" }}>
      <form onSubmit={monthSubmit}>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <TextField
            select
            fullwidth
            size="small"
            label="Month"
            name="month"
            variant="outlined"
            value={month}
            sx={{
              borderRadius: "8px",
              width: "10%",
            }}
            onChange={(e) => setMonth(e.target.value)}
          >
            {month_name.map((months) => (
              <MenuItem value={months.month}>{months.month}</MenuItem>
            ))}
          </TextField>
          &nbsp;&nbsp;
          <Button type="submit" variant="contained">
            search
          </Button>
        </Grid>
      </form>
      <Box sx={{ m: 2, height: 500, display: "flex", overflow: "hidden" }}>
        <TableContainer component={Paper} sx={{ backgroundColor: "#f9f2e8" }}>
          <Table stickyHeader size="small">
            <TableHead sx={{ backgroundColor: "#2f7d32", color: "white" }}>
              <TableRow>
                <TableCell sx={{ backgroundColor: "#2f7d32", color: "white" }}>
                  <Typography>ID</Typography>
                </TableCell>
                <TableCell sx={{ backgroundColor: "#2f7d32", color: "white" }}>
                  <Typography>Store No.</Typography>
                </TableCell>
                <TableCell sx={{ backgroundColor: "#2f7d32", color: "white" }}>
                  <Typography>Store Code</Typography>
                </TableCell>
                <TableCell sx={{ backgroundColor: "#2f7d32", color: "white" }}>
                  <Typography>Store Name</Typography>
                </TableCell>
                <TableCell sx={{ backgroundColor: "#2f7d32", color: "white" }}>
                  <Typography> POC Name</Typography>
                </TableCell>
                <TableCell sx={{ backgroundColor: "#2f7d32", color: "white" }}>
                  <Typography> POC Mob. </Typography>
                </TableCell>
                <TableCell sx={{ backgroundColor: "#2f7d32", color: "white" }}>
                  <Typography>M&S Email </Typography>
                </TableCell>
                <TableCell sx={{ backgroundColor: "#2f7d32", color: "white" }}>
                  <Typography> follow-1</Typography>
                </TableCell>
                <TableCell sx={{ backgroundColor: "#2f7d32", color: "white" }}>
                  <Typography> follow-2</Typography>
                </TableCell>
                <TableCell sx={{ backgroundColor: "#2f7d32", color: "white" }}>
                  <Typography> follow-3</Typography>
                </TableCell>
                <TableCell sx={{ backgroundColor: "#2f7d32", color: "white" }}>
                  <Typography>Bill Paid</Typography>
                </TableCell>
                <TableCell sx={{ backgroundColor: "#2f7d32", color: "white" }}>
                  <Typography>MMS</Typography>
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#2f7d32", color: "white" }}
                ></TableCell>
              </TableRow>
            </TableHead>
            {loading ? (
              <></>
            ) : (
              data.map((data, index) => (
                <TableBody sx={{ backgroundColor: "white" }}>
                  <TableRow key={index}>
                    <TableCell>{data.id}</TableCell>
                    <TableCell>{data.store_no}</TableCell>
                    <TableCell>{data.store_code}</TableCell>
                    <TableCell>{data.store_name}</TableCell>
                    <TableCell>{data.poc_name}</TableCell>
                    <TableCell>{data.poc_mobile}</TableCell>
                    <TableCell>{data.poc_email}</TableCell>
                    <TableCell onClick={() => handleClick(index)}>
                      {edit === index ? (
                        <TextField
                          select
                          size="small"
                          name="second_follow"
                          label="Secondfollowup"
                          value={data.follow_1}
                          sx={{ m: 2, width: "80%" }}
                          // onChange={(e) => setFollow_1(e.target.value)}
                          onChange={e => handleChange(e, index)}
                                    onBlur={e => handleBlur(e, index)}
                        >
                          <MenuItem value="">--None--</MenuItem>
                          <MenuItem value="Yes">Yes</MenuItem>
                          <MenuItem value="No">No</MenuItem>
                        </TextField>
                      ) : (
                        data.follow_1
                      )}
                    </TableCell>
                    <TableCell>{data.follow2}</TableCell>
                    <TableCell>{data.follow3}</TableCell>
                    <TableCell>{data.bill_paid}</TableCell>
                    <TableCell>{data.mms}</TableCell>
                  </TableRow>
                </TableBody>
              ))
            )}
          </Table>
        </TableContainer>
        <Button
                        variant="contained"
                        size="small"
                        onClick={handleSubmit}
                      >
                        Save
                      </Button>
      </Box>
    </Box>
  );
}
