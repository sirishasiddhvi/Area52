import React, { useState, useEffect } from "react";
import { Typography, Button, Box, Stack, Grid,Dialog,DialogContent,DialogContentText,IconButton } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import DataTable from "react-data-table-component";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DataTableExtensions from "react-data-table-component-extensions";
const axios = require("axios");

export function QuaterlyViewReport() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    getdata();
  }, []);
  const getdata = async () => {
    setLoading(true)
    const fromDate = localStorage.getItem("from");
    const toDate = localStorage.getItem("to");
    const formdata = new FormData();
console.log(loading)
    console.log(fromDate, toDate);
    formdata.append("serv_from", fromDate);
    formdata.append("serv_to", toDate);
    await axios.post("/api/quarterly_view", formdata).then(function (res) {
      if (res.data.status === true) {
        setData(res.data.data);
        setLoading(false);
        console.log(res.data.data);
setLoading(false)
      } else {
        console.log("heloooo");
      }
    });
  };
  const columns = [
    { name: " Store No", selector: "store_no", sortable: true },
    { name: "Store Code", selector: "store_code", sortable: true ,width:"5%"},
    { name: "Store Name", selector: "store_name", sortable: true, width:"5%" },
    { name: "City", selector: "city", sortable: true },
    { name: "State", selector: "state", sortable: true },
    { name: "Region", selector: "region", sortable: true },
    { name: "Avg Footagem2", selector: "avg_footagem2", sortable: true ,width:"6%"},
    { name: "Avg Footageft2", selector: "avg_footageft2", sortable: true ,width:"6%"},
    { name: "Sum Elec kWh", selector: "sum_elec_kwh", sortable: true ,width:"5%"},
    { name: "Avg Elec kWh", selector: "avg_elec_kwh", sortable: true ,width:"5%"},
    { name: "Sum DG kWh", selector: "sum_dg_kwh", sortable: true ,width:"5%"},
    { name: "Avg DG kWh", selector: "avg_dg_kwh", sortable: true ,width:"5%"},
    { name: "Sum HVAC kWh", selector: "sum_hvac_kwh", sortable: true ,width:"6%" },
    { name: "Avg HVAC kWh", selector: "avg_hvac_kwh", sortable: true ,width:"6%"},
    { name: "Sum R22 kg", selector: "sum_r22_kg", sortable: true ,width:"5%"},
    { name: "Avg R22 kg", selector: "avg_r22_kg", sortable: true ,width:"5%"},
    { name: "Sum R404 kg", selector: "sum_r404_kg", sortable: true ,width:"5%"},
    { name: "Avg R404 kg", selector: "avg_r404_kg", sortable: true,width:"5%" },
    { name: "Sum R407 kg", selector: "sum_r407_kg", sortable: true ,width:"5%"},
    { name: "Avg R407 kg", selector: "avg_r407_kg", sortable: true ,width:"5%"},
    { name: "Sum Other Kg", selector: "sum_other_kg", sortable: true ,width:"5%"},
    { name: "Avg Other Kg", selector: "avg_other_kg", sortable: true ,width:"5%"},
  ];
  const tableData = {
    columns,
    data,
  };
  return (
    <Box
      sx={{
        m: 10,
        
      }}
    >
      <Stack direction="row ">
        <Typography variant="h4">Quarter Report</Typography>&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;
      </Stack>
      <Box
        sx={{
          width: 1100,
          overflow: "hidden",
          backgroundColor: "white",
        }}
      ><div>
      <DataTableExtensions
        print={false}
        exportHeaders 
        columns={columns}
        filterPlaceholder="Search..."
        {...tableData}
       export={true}
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
          highlightOnHover
        />
      </DataTableExtensions></div>
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-end"
      >
        {/* <Link to="/Dashboard/quaterlyreports">
          <ArrowBackIcon fontSize="very very small" />
          back
        </Link> */}
        <Button
          variant="contained"
          onClick={() => navigate("/Dashboard/quaterlyreports")}
        >
          Back
        </Button>{" "}
      </Grid>
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
