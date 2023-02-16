import {
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Grid,
  Box,
  TableBody,
  Button,
  Typography,
  TextField,Paper,MenuItem,Dialog,DialogContent,DialogContentText,IconButton
} from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import React,{useState,useEffect,useContext} from "react";
import { SnackContext, UserContext } from "../Context/UserContext";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import {QuaterlyViewReport} from './QuaterlyViewReport';
import "react-data-table-component-extensions/dist/index.css";
const axios=require("axios");
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

export function QuaterlyReports() {
  const { snack, setSnack } = useContext(SnackContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  const [fromDate,setFromDate]=useState({})
  const [toDate,setToDate]=useState({})
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
  localStorage.setItem("year1",year_1)
    localStorage.setItem("year2",year_1+1)
    const formdata= new FormData()
    formdata.append("year",year_1)
    formdata.append("year1",year_1+1)
    axios.post("/api/quarterly_reports",formdata).then((res) => {
      if (res.data.status === true) {
        console.log("hi");
        console.log(res.data.data);
        setData(res.data.data);
        setLoading(false);
      } else {
      }
    });  
  }, []);

  const getdata = async() => {
    setLoading(true)
    console.log(year)
    const years = year.split("-");
    console.log(years[0]);
    console.log(years[1]);
    localStorage.setItem("year1",years[0])
    localStorage.setItem("year2",years[1])
    const formdata = new FormData()
    formdata.append('year',years[0]);
    formdata.append("year1",years[1]);
    await axios.post("/api/quarterly_reports",formdata).then((res) => {
      if (res.data.status === true) {
        setData(res.data.data);
        setLoading(false);
        console.log(res.data.data);
       
      }
    });
  };
  return (
    <div>
      <Box sx={{ m: 12 ,width:"90%" }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Typography variant="h4" align="left">Quarterly Reports</Typography>
          <TextField
            select
            fullwidth
            size="small"
            label="Year"
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
          </Button>
        </Grid>
        <Box sx={{ my: 5 }}>
          <TableContainer component={Paper}>
          <Table size="small">
              <TableHead sx={{ backgroundColor: "#2f7d32" }}>
                <TableRow>
                <TableCell>
                 <Typography sx={{color:"white"}}>  Quarter</Typography> 
                  </TableCell>
                  <TableCell>
                    <Typography sx={{color:"white"}}> Service from</Typography> 
                  </TableCell>
                  <TableCell>
                    <Typography sx={{color:"white"}}> Service to</Typography> 
                  </TableCell>
                  <TableCell>
                    <Typography sx={{color:"white"}}> Report</Typography> 
                  </TableCell>
                  <TableCell>
                  <Typography sx={{color:"white"}}> Monthly Report </Typography> 
                  </TableCell>
                  {/* <TableCell>
                    <Typography sx={{color:"white"}}> Download Report</Typography> 
                  </TableCell> */}
                  {/* <TableCell>
                    <Typography sx={{color:"white"}}> Delete Report</Typography> 
                  </TableCell> */}
                </TableRow>
              </TableHead>
              {/* {loading ? (
                <></>
              ) : ( */}
                {data.map((data) => (
                <TableBody  >
                    <TableRow>
                       <TableCell >
                    { data. quarter}
                    
                      </TableCell> 
                      <TableCell >
                      {data.service_from}
                      </TableCell>
                      <TableCell >
                      {data.service_to}
                      </TableCell>
                      <TableCell >
                      <Button
                          variant="contained"
                          color="warning"
                          onClick={()=>{  
                            localStorage.setItem("from",data.service_fromm)
                            localStorage.setItem("to",data.service_too)                         
                            navigate("/Dashboard/quaterlyviewreport")}}
                        >
                         view
                        </Button>
                        </TableCell >
                        <TableCell >
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={()=>{  
                            localStorage.setItem("month1",data.month1)
                            localStorage.setItem("month2",data.month2)                         
                            localStorage.setItem("month3",data.month3)                         
                            localStorage.setItem("quarter",data.quarter)                         
                            navigate("/Dashboard/monthwisereport")}}
                        >
                         view
                        </Button>
                      </TableCell>
                      {/* <TableCell >
                        <Button
                          variant="contained"
                          color="info"
                          //onClick={deleteReport}
                        >
                          Download
                        </Button>
                      </TableCell>
                      <TableCell >
                        <Button
                          variant="contained"
                          color="error"
                          //  onClick={downloadReport}
                        >
                          Delete
                        </Button>
                      </TableCell> */}
                      </TableRow>
                  </TableBody>
                ))}
            </Table>
          </TableContainer>
         
        </Box>
         <Dialog open={loading} onClose={() => {}}>
        <DialogContent>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <IconButton>
              <CircularProgress />
            </IconButton>
            <DialogContentText>Please wait....</DialogContentText>
          </Grid>
        </DialogContent>
      </Dialog>
        {/* {loading && (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
            <Typography variant="h4">Please wait......</Typography>
          </div>
        )} */}
      </Box>
      {/* <QuaterlyViewReport fromDate={fromDate} toDate={toDate} hidden/> */}
    </div>
  );
}
