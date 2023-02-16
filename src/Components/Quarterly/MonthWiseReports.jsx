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

export const MonthWiseReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    getdata();
  }, []);
  const getdata = async () => {
    setLoading(true);
    const month1 = localStorage.getItem("month1");
    const month2 = localStorage.getItem("month2");
    const month3 = localStorage.getItem("month3");
    const quarter = localStorage.getItem("quarter");
    const year1 = localStorage.getItem("year1");
    const year2 = localStorage.getItem("year2");
    const formdata = new FormData();
    formdata.append("month1", month1);
    formdata.append("month2", month2);
    formdata.append("month3", month3);
    formdata.append("quarter",quarter)
    formdata.append("year", year1);
    formdata.append("year1", year2);
    await axios.post("/api/quarterly_view1", formdata).then((res) => {
      if (res.data.status === true) {
        setData(res.data.data);
        setLoading(false);
        console.log(res.data.data);
      }
    });
  };
  const columns = [
    { name: " Store No", selector: "store_no", sortable: true },
    { name: "Store Code", selector: "store_code", sortable: true, width: "5%" },
    { name: "Store Name", selector: "store_name", sortable: true, width: "5%" },
    { name: "City", selector: "city", sortable: true },
    { name: "State", selector: "state", sortable: true },
    { name: "Region", selector: "region", sortable: true },
    {
      name: "M1-Elec-kWh",
      selector: "month1_elec_kwh",
      sortable: true,
      width: "6%",
    },
    {
      name: "M2-Elec-kWh",
      selector: "month2_elec_kwh",
      sortable: true,
      width: "6%",
    },
    {
      name: "M3-Elec-kWh",
      selector: "month3_elec_kwh",
      sortable: true,
      width: "6%",
    },
    {
      name: "M1-DG-kWh",
      selector: "month1_dg_kwh",
      sortable: true,
      width: "6%",
    },
    {
      name: "M2-DG-kWh",
      selector: "month2_dg_kwh",
      sortable: true,
      width: "5%",
    },
    {
      name: "M3-DG-kWh",
      selector: "month3_dg_kwh",
      sortable: true,
      width: "5%",
    },
    {
      name: "M1-HVAC-kW",
      selector: "month1_hvac_kwh",
      sortable: true,
      width: "6%",
    },
    {
      name: "M2-HVAC-kW",
      selector: "month2_hvac_kwh",
      sortable: true,
      width: "6%",
    },
    {
      name: "M3-HVAC-kW",
      selector: "month3_hvac_kwh",
      sortable: true,
      width: "6%",
    },
    {
      name: "M1-R22-kg",
      selector: "month1_r22_kg",
      sortable: true,
      width: "5%",
    },
    {
      name: "M2-R22-kg",
      selector: "month2_r22_kg",
      sortable: true,
      width: "5%",
    },
    {
      name: "M3-R22-kg",
      selector: "month3_r22_kg",
      sortable: true,
      width: "5%",
    },
    {
      name: "M1-R404-kg",
      selector: "month1_r404_kg",
      sortable: true,
      width: "5%",
    },
    {
      name: "M2-R404-kg",
      selector: "month2_r404_kg",
      sortable: true,
      width: "5%",
    },
    {
      name: "M3-R404-kg",
      selector: "month3_r404_kg",
      sortable: true,
      width: "5%",
    },
    {
      name: "M1-R407-kg",
      selector: "month1_r407_kg",
      sortable: true,
      width: "5%",
    },
    {
      name: "M2-R407-kg",
      selector: "month2_r407_kg",
      sortable: true,
      width: "5%",
    },
    {
      name: "M3-R407-kg",
      selector: "month3_r407_kg",
      sortable: true,
      width: "5%",
    },
    // {
    //   name: "M1-Other-Kg",
    //   selector: "month1_other__kg",
    //   sortable: true,
    //   width: "5%",
    // },
    // {
    //   name: "M2-Other-Kg",
    //   selector: "month2_other__kg",
    //   sortable: true,
    //   width: "5%",
    // },
    // {
    //   name: "M3-Other-Kg",
    //   selector: "month3_other__kg",
    //   sortable: true,
    //   width: "5%",
    // },
  ];
  const tableData = {
    columns,
    data,
  };
  return (
    <Box sx={{ m: 9 }}>
      <Stack direction="row ">
        <Typography variant="h4">Monthwise Report</Typography>&nbsp;&nbsp;&nbsp;
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
          onClick={() => navigate("/Dashboard/quaterlyreports")}
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
