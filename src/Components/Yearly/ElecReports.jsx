import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Typography,
  Grid,
  Box,
  Button,
  Stack,
  Dialog,
  DialogContent,
  DialogContentText,
  IconButton
} from "@mui/material";
const axios = require("axios");

export const ElecReports=()=>{
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState();
    const navigate = useNavigate();
    useEffect(() => {
      getdata();
    }, []);
    const getdata = async () => {
      setLoading(true);
      const months= localStorage.getItem("months")
      const formdata = new FormData();
      formdata.append("months",months)
      await axios.post("/api/month_elec_view", formdata).then((res) => {
        if (res.data.status === true) {
          setData(res.data.data);
          setLoading(false);
          console.log(res.data.data);
        }
      });
    };  

const columns= [
    { name: " Store No", selector: "store_no", sortable: true,width:  "6%" },
    { name: "Store Code", selector: "store_code", sortable: true, width:  "6%" },
    { name: "Store Name", selector: "store_name", sortable: true, width:  "6%" },
    { name: "City", selector: "city", sortable: true , width:  "6%"},
    { name: "State", selector: "state", sortable: true , width:  "6%"},
    { name: "Region", selector: "region", sortable: true , width:  "6%"},
    {
      name: "January-Elec-kWh",
      selector: "january_elec_kwh",
      sortable: true,
      width: "7%",
    },
    {
      name: "February-Elec-kWh",
      selector: "february_elec_kwh",
      sortable: true,
      width: "7%",
    },
    {
      name: "March-Elec-kWh",
      selector: "march_elec_kwh",
      sortable: true,
      width: "7%",
    },
    {
        name: "April-Elec-kWh",
        selector: "april_elec_kwh",
        sortable: true,
        width: "7%",
      },
      {
        name: "May-Elec-kWh",
        selector: "may_elec_kwh",
        sortable: true,
        width: "7%",
      },
      {
        name: "June-Elec-kWh",
        selector: "june_elec_kwh",
        sortable: true,
        width: "7%",
      },
      {
        name: "July-Elec-kWh",
        selector: "july_elec_kwh",
        sortable: true,
        width: "7%",
      },
      {
        name: "August-Elec-kWh",
        selector: "august_elec_kwh",
        sortable: true,
        width: "7%",
      },
      {
        name: "September-Elec-kWh",
        selector: "september_elec_kwh",
        sortable: true,
        width: "8%",
      },
      {
        name: "October-Elec-kWh",
        selector: "october_elec_kwh",
        sortable: true,
        width: "7%",
      },
      {
        name: "November-Elec-kWh",
        selector: "november_elec_kwh",
        sortable: true,
        width: "8%",
      },
      {
        name: "December-Elec-kWh",
        selector: "december_elec_kwh",
        sortable: true,
        width: "8%",
      },
]
const tableData = {
    columns,
    data,
  };
  return (
    <Box sx={{ m: 9 }}>
      <Stack direction="row ">
        <Typography variant="h4">Elec Report</Typography>&nbsp;&nbsp;&nbsp;
      </Stack>
      <Box
        sx={{
          width: 1000,
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
            print={false}
            pagination
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
        <Button
          variant="contained"
          onClick={() => navigate("/Dashboard/yearlyreports")}
        >
          Back
        </Button>
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
};