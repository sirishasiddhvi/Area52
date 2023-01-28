import React, { useState, useEffect } from "react";
import { Typography, Grid, Box, Button, Stack } from "@mui/material";
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
    await axios.get("/api/yearly_view").then((res) => {
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
    { name: "Store Code", selector: "store_code", sortable: true },
    { name: "Store Name", selector: "store_name", sortable: true },
    // { name: "Opening Date", selector: "store_opening_date", sortable: true },
    { name: "City", selector: "city", sortable: true },
    { name: "State", selector: "state", sortable: true },
    { name: "Region", selector: "region", sortable: true },
    // { name: "Status of Store", selector: "status_of_store", sortable: true },
    { name: "Sum Footagem2", selector: "sum_footagem2", sortable: true },
    { name: "Avg Footagem2", selector: "avg_footagem2", sortable: true },
    { name: "Sum Footageft2", selector: "sum_footageft2", sortable: true },
    { name: "Avg Footageft2", selector: "avg_footageft2", sortable: true },
    { name: "Sum Elec kWh", selector: "sum_elec_kwh", sortable: true },
    { name: "Avg Elec kWh", selector: "avg_elec_kwh", sortable: true },
    { name: "Sum DG kWh", selector: "sum_dg_kwh", sortable: true },
    { name: "Avg DG kWh", selector: "avg_dg_kwh", sortable: true },
    { name: "Sum HVAC kWh", selector: "sum_hvac_kwh", sortable: true },
    { name: "Avg HVAC kWh", selector: "avg_hvac_kwh", sortable: true },
    { name: "sUM R22 kg", selector: "sum_r22_kg", sortable: true },
    { name: "Avg R22 kg", selector: "avg_r22_kg", sortable: true },
    { name: "Sum R404 kg", selector: "sum_r404_kg", sortable: true },
    { name: "Avg R404 kg", selector: "avg_r404_kg", sortable: true },
    { name: "Sum R407 kg", selector: "sum_r407_kg", sortable: true },
    { name: "avg R407 kg", selector: "avg_r407_kg", sortable: true },
    { name: "Sum Other Kg", selector: "sum_other_kg", sortable: true },
    { name: "Avg Other Kg", selector: "avg_other_kg", sortable: true },
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
        }}
      >
        <DataTableExtensions
          print={false}
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
      <Button variant="contained" onClick={()=>navigate("/Dashboard/monthlyreports")}>Back</Button> </Grid>
    </Box>
  );
}
