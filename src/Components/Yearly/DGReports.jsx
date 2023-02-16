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

export const DGReports=()=>{
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
      await axios.post("/api/month_dg_view", formdata).then((res) => {
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
      name: "January-DG-kWh",
      selector: "january_dg_kwh",
      sortable: true,
      width: "7%",
    },
    {
      name:  "February-DG-kWh",
      selector: "february_dg_kwh",
      sortable: true,
      width: "7%",
    },
    {
      name:  "March-DG-kWh",
      selector: "march_dg_kwh",
      sortable: true,
      width: "7%",
    },
    {
        name: "April-DG-kWh",
        selector: "april_dg_kwh",
        sortable: true,
        width: "7%",
      },
      {
        name: "May-DG-kWh",
        selector: "may_dg_kwh",
        sortable: true,
        width: "7%",
      },
      {
        name: "June-DG-kWh",
        selector: "june_dg_kwh",
        sortable: true,
        width: "7%",
      },
      {
        name: "July-DG-kWh",
        selector: "july_dg_kwh",
        sortable: true,
        width: "7%",
      },
      {
        name: "August-DG-kWh",
        selector: "august_dg_kwh",
        sortable: true,
        width: "7%",
      },
      {
        name: "September-DG-kWh",
        selector: "september_dg_kwh",
        sortable: true,
        width: "8%",
      },
      {
        name: "October-DG-kWh",
        selector: "october_dg_kwh",
        sortable: true,
        width: "7%",
      },
      {
        name: "November-DG-kWh",
        selector: "november_dg_kwh",
        sortable: true,
        width: "8%",
      },
      {
        name: "December-DG-kWh",
        selector: "december_dg_kwh",
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
        <Typography variant="h4">DG Report</Typography>&nbsp;&nbsp;&nbsp;
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