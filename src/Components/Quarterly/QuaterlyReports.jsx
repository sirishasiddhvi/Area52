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
  TextField,Paper,MenuItem
} from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import React,{useState,useEffect,useContext} from "react";
import { SnackContext, UserContext } from "../Context/UserContext";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
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
  const [year,setYear] = useState();
  const [loading, setLoading] = useState(true);
  const [fromDate,setFromDate]=useState({})
  const [toDate,setToDate]=useState({})
  const navigate = useNavigate();
  // useEffect(() => {
  //   getdata();
  // }, []);

  const getdata = async() => {
    const years = year.split("-");
    console.log(years[0]);
    console.log(years[1]);
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
                    <Typography sx={{color:"white"}}> View Report</Typography> 
                  </TableCell>
                  {/* <TableCell>
                    <Typography sx={{color:"white"}}> Download Report</Typography> 
                  </TableCell> */}
                  {/* <TableCell>
                    <Typography sx={{color:"white"}}> Delete Report</Typography> 
                  </TableCell> */}
                </TableRow>
              </TableHead>
              {loading ? (
                <></>
              ) : (
                data.map((data) => (
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
                          View
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
                )))}
            </Table>
          </TableContainer>
         
        </Box>
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
