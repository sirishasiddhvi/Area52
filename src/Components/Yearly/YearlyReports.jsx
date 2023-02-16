import {
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  TableBody,
  Button,
  Typography,
  Box,
  MenuItem,
  Paper,TextField,Grid
} from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
const axios = require("axios");
const years = [
  { id: "1", year: "2020-2021" },
  { id: "2", year: "2021-2022" },
  { id: "3", year: "2022-2023" },
  { id: "4", year: "2023-2024" },
  { id: "5", year: "2024-2025" },
  { id: "6", year: "2025-2026" },
  { id: "7", year: "2026-2027" },
  { id: "8", year: "2027-2028" },
  { id: "9", year: "2028-2029 " },
  { id: "10", year: "2029-2030" },
  
];

export function YearlyReports() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [approve, setApprove] = useState("pending");
  const [disable, setDisable] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const navigate = useNavigate();
  var today= new Date();
  var month_now= moment(today).format('MMMM')
  if (month_now=="January"||month_now=="February"||month_now=="March"){
    var year_now=moment(today).format('YYYY')-1
    console.log(year_now)
  }else{
    var year_now=moment(today).format('YYYY')
  }
  const [year_1,setYear_1]= useState(year_now)
  const [year,setYear] = useState(year_1+"-"+(year_1+1));
  
  useEffect(() => {
    const formdata= new FormData()
    formdata.append("year",year_1)
    formdata.append("year1",year_1+1)
    axios.post("/api/yearly_reports",formdata).then((res) => {
      if (res.data.status === true) {
        console.log("hi");
        console.log(res.data.data);
        setData(res.data.data);
        localStorage.setItem("months",JSON.stringify(res.data.data[0].months))
        localStorage.setItem("month_1",res.data.data[0].month1)
        localStorage.setItem("month_2",res.data.data[0].month2)
        localStorage.setItem("month_3",res.data.data[0].month3)
        localStorage.setItem("month_4",res.data.data[0].month3)
        localStorage.setItem("month_5",res.data.data[0].month5)
        localStorage.setItem("month_6",res.data.data[0].month6)
        localStorage.setItem("month_7",res.data.data[0].month7)
        localStorage.setItem("month_8",res.data.data[0].month8)
        localStorage.setItem("month_9",res.data.data[0].month9)
        localStorage.setItem("month_10",res.data.data[0].month10)
        localStorage.setItem("month_11",res.data.data[0].month11)
        localStorage.setItem("month_12",res.data.data[0].month12)
        setLoading(false);
      } else {
      }
    });
    
  }, []);
  const getdata = async () => {
    console.log(year)
    const years = year.split("-");
    console.log(years[0]);
    console.log(years[1]);
    const formdata = new FormData()
    formdata.append('year',years[0]);
    formdata.append("year1",years[1]);
    await axios.post("/api/yearly_reports",formdata).then((res) => {
      if (res.data.status === true) {
        console.log(res.data.data);
        setData(res.data.data);
        console.log(data);
        setLoading(false);
      } else {
        console.log("heloooo");
      }
    });
  };
  const openPopUp = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleApprove = () => {
    setApprove("approved");
    setDisable(true);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ m: 12,width:"40%" }}>
       <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
      <Typography variant="h4" align="left">Yearly Reports</Typography>
      <TextField
             select
            fullwidth
            size="small"
            label=" Year"
           name="year"
           value={year}
            variant="outlined"
           
            sx={{
              borderRadius: "8px",
              width: "25%",
            }}
            onChange={(e) => setYear(e.target.value)}
          >
           {years.map((yearly) => (
              <MenuItem value={yearly.year}>{yearly.year}</MenuItem>
            ))}
          </TextField>
          <Button type="submit" variant="contained" onClick={getdata}>
            search
          </Button></Grid>
      <Box sx={{  p: 1,
          display: "flex",
          flexDirection: "column",
          height: 500,
           width: 1000,
          overflow: "hidden",}}>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead sx={{ backgroundColor: "#2f7d32" }}>
              <TableRow>
                <TableCell>
                  <Typography sx={{color:"white"}}>Year</Typography>{" "}
                </TableCell>
                <TableCell>
                  <Typography sx={{color:"white"}}>Service from</Typography>{" "}
                </TableCell>
                <TableCell>
                  <Typography sx={{color:"white"}}>Service To</Typography>{" "}
                </TableCell>
                {/* <TableCell>
                  <Typography sx={{color:"white"}}>Approved Status</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{color:"white"}}>Approval Button</Typography>
                </TableCell> */}
                <TableCell>
                  <Typography sx={{color:"white"}}>View Report</Typography>{" "}
                </TableCell>
                <TableCell>
                  <Typography sx={{color:"white"}}> Elec-View </Typography>{" "}
                </TableCell>
                <TableCell>
                  <Typography sx={{color:"white"}}>DG-View </Typography>{" "}
                </TableCell>
                <TableCell>
                  <Typography sx={{color:"white"}}>HVAC-View </Typography>{" "}
                </TableCell>
                <TableCell>
                  <Typography sx={{color:"white"}}>R22-View </Typography>{" "}
                </TableCell>
                <TableCell>
                  <Typography sx={{color:"white"}}>R404-View </Typography>{" "}
                </TableCell><TableCell>
                  <Typography sx={{color:"white"}}>R407-View </Typography>{" "}
                </TableCell><TableCell>
                  <Typography sx={{color:"white"}}>Other-View </Typography>{" "}
                </TableCell>
                {/* <TableCell>
                  <Typography sx={{color:"white"}}>Download Report</Typography>
                </TableCell>
                <TableCell>
                  <Typography>Source bills</Typography>{" "}
                </TableCell> */}
              </TableRow>
            </TableHead>
            {loading ? (
              <></>
            ) : (
              data.map((data) => (
                <TableBody>
                  <TableRow>
                    <TableCell>2022-23</TableCell>
                    <TableCell>{data.service_from}</TableCell>
                    <TableCell>{data.service_to}</TableCell>
                    {/* <TableCell>{approve}</TableCell> */}
                    {/* <TableCell>
                      <div>
                        <Button
                          aria-describedby={id}
                          variant="contained"
                          onClick={openPopUp}
                          color="success"
                          disabled={disable === true ? true : false}
                        >
                          Approve
                        </Button>
                        <Popover
                          id={id}
                          open={open}
                          anchorEl={anchorEl}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                        >
                          <Box sx={{ p: 2, backgroundColor: "#f9f2e8" }}>
                            <Typography sx={{ p: 1 }}>
                              Are you sure to approve
                            </Typography>
                            &nbsp;{" "}
                            <Button
                              variant="contained"
                              color="success"
                              onClick={handleApprove}
                            >
                              Yes
                            </Button>
                            &nbsp;&nbsp;
                            <Button
                              variant="contained"
                              color="error"
                              onClick={handleClose}
                            >
                              No
                            </Button>
                          </Box>
                        </Popover>
                      </div>
                    </TableCell> */}
                    <TableCell>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => {
                          localStorage.setItem("from_1",data.service_fromm)
                          localStorage.setItem("to_1",data.service_too)
                          navigate("/Dashboard/yearlyviewreports")}}
                      >
                        view
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => {
                          navigate("/Dashboard/yearlyelecreports")}}
                      >
                        Elec
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => {
                          navigate("/Dashboard/yearlydgreports")}}
                      >
                       DG
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => {
                          navigate("/Dashboard/yearlyhvacreports")}}
                      >
                       HVAC
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => {
                          navigate("/Dashboard/yearlyr22reports")}}
                      >
                       R22
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => {
                          navigate("/Dashboard/yearlyr404reports")}}
                      >
                       R404
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => {
                          navigate("/Dashboard/yearlyr407reports")}}
                      >
                        R407
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => {
                          navigate("/Dashboard/yearlyotherreports")}}
                      >
                       other
                      </Button>
                    </TableCell>
                    {/* <TableCell>
                      <Button variant="contained" color="warning">
                        Download
                        <DownloadOutlinedIcon />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="error">
                        Download
                        <DownloadOutlinedIcon />
                      </Button>
                    </TableCell> */}
                  </TableRow>
                </TableBody>
              ))
            )}
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
