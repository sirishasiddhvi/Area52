import React, { useState, useEffect } from "react";
import { Typography, Grid, Box, Button, Stack ,Dialog,DialogContent,DialogContentText,IconButton} from "@mui/material";
import DataTable from "react-data-table-component";
import { useNavigate, Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
const axios = require("axios");

export function YearlyViewReports() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    getdata();
  }, []);
  const getdata = async () => {
    const fromDate = localStorage.getItem("from_1");
    const toDate = localStorage.getItem("to_1");
    console.log(fromDate)
    console.log(toDate)
    const formdata = new FormData();
    formdata.append("serv_from", fromDate);
    formdata.append("serv_to", toDate);
    await axios.post("/api/yearly_view",formdata).then((res) => {
      if (res.data.status === true) {
        setData(res.data.data);
        setLoading(false);
        console.log(res.data.data);
      }
    });
  };
  const downloadZip = async () => {
    await axios
      .get("api/download1", {
        responseType: "blob",
      })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "file.zip"); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
  };
  const columns = [
    { name: " Store No", selector: "store_no", sortable: true },
    { name: "Store Code", selector: "store_code", sortable: true,width:"5%" },
    { name: "Store Name", selector: "store_name", sortable: true ,width:"5%"},
    { name: "City", selector: "city", sortable: true },
    { name: "State", selector: "state", sortable: true },
    { name: "Region", selector: "region", sortable: true },
    { name: "Avg Footagem2", selector: "avg_footagem2", sortable: true ,width:"7%" },
    { name: "Avg Footageft2", selector: "avg_footageft2", sortable: true ,width:"7%" },
    { name: "Sum Elec kWh", selector: "sum_elec_kwh", sortable: true ,width:"5%" },
    { name: "Avg Elec kWh", selector: "avg_elec_kwh", sortable: true ,width:"5%" },
    { name: "Sum DG kWh", selector: "sum_dg_kwh", sortable: true ,width:"5%" },
    { name: "Avg DG kWh", selector: "avg_dg_kwh", sortable: true ,width:"5%" },
    { name: "Sum HVAC kWh", selector: "sum_hvac_kwh", sortable: true ,width:"5%" },
    { name: "Avg HVAC kWh", selector: "avg_hvac_kwh", sortable: true ,width:"5%" },
    { name: "Sum R22 kg", selector: "sum_r22_kg", sortable: true ,width:"5%" },
    { name: "Avg R22 kg", selector: "avg_r22_kg", sortable: true ,width:"5%" },
    { name: "Sum R404 kg", selector: "sum_r404_kg", sortable: true ,width:"5%" },
    { name: "Avg R404 kg", selector: "avg_r404_kg", sortable: true ,width:"5%" },
    { name: "Sum R407 kg", selector: "sum_r407_kg", sortable: true ,width:"5%" },
    { name: "Avg R407 kg", selector: "avg_r407_kg", sortable: true ,width:"5%" },
    { name: "Sum Other Kg", selector: "sum_other_kg", sortable: true ,width:"5%" },
    { name: "Avg Other Kg", selector: "avg_other_kg", sortable: true ,width:"5%" },
  ];
  const tableData = {
    columns,
    data,
  };
  return (
    <Box sx={{ m: 9 }}>
      <Stack direction="row ">
        <Typography variant="h4">Year Report</Typography>&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;
        {/* <Button
          variant="contained"
          color="warning"
        >
          Download
        </Button> */}
      </Stack>
      <Box
        sx={{
          width: 1100,
          overflow: "hidden",
          backgroundColor: "white",
        }}
      >
        <DataTableExtensions
          print={false}
          exportHeaders 
        columns={columns}
          filterPlaceholder="Search..."
          {...tableData}
        >
          <DataTable
            customStyles={{
              headCells: {
                style: {
                  color: "white",
                  fontSize: "15px",
                  fontWeight: "bold",
                  paddingLeft: "0 8px",
                  justifyContent: "center",
                  backgroundColor: "#2f7d32",
                },
              },
            }}
            id="html-excel"
            columns={columns}
            data={data}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="600px"
            highlightOnHover
          />
        </DataTableExtensions>
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-end"
      >
        {/* <Link to="/Dashboard/yearlyreports" style={{ underline: "none" }}>
          <ArrowBackIcon fontSize="very very small" align="left" />
          back
        </Link> */}    
      <Button variant="contained" onClick={()=>navigate("/Dashboard/yearlyreports")}>Back</Button> </Grid>
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
    </Box>
  );
}
