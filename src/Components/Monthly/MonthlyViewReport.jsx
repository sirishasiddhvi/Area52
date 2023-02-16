import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Box,
  Button,
  Stack,IconButton, Dialog,
  DialogActions,
  DialogContent,
  Paper,DialogContentText
} from "@mui/material";
import DataTable from "react-data-table-component";
import ReactToExcel from "react-html-table-to-excel";
import { useNavigate, Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import DataTableExtensions from "react-data-table-component-extensions";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "react-data-table-component-extensions/dist/index.css";
const axios = require("axios");

export function MonthlyViewReport() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    getdata();
  }, []);
  const getdata = async () => {
    setLoading(true)
    const month = localStorage.getItem("month");
    const formdata = new FormData();
    formdata.append("vmonth", month);
    console.log(month);
    await axios.post("/api/monthly_view", formdata).then((res) => {
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
    { name: "Store Code", selector: "store_code", sortable: true ,width:"5%"},
    { name: "Store Name", selector: "store_name", sortable: true,width:"5%" },
    { name: "Opening Date", selector: "store_opening_date", sortable: true ,width:"5%"},
    { name: "City", selector: "city", sortable: true },
    { name: "State", selector: "state", sortable: true },
    { name: "Region", selector: "region", sortable: true },
    { name: "Type", selector: "type", sortable: true },
    { name: "Status of Store", selector: "status_of_store", sortable: true ,width:"6%" },
    { name: "Footage(m2)", selector: "footage_m2", sortable: true ,width:"5%"},
    { name: "Footage(ft2)", selector: "footage_ft2", sortable: true ,width:"5%"},
    {
      name: "Elec Billing",
      selector: "separate_elec_billing",
      sortable: true,width:"5%"
    },
    { name: "DG Billing", selector: "separate_dg_billing", sortable: true ,width:"5%" },
    {
      name: "Bill Received ",
      selector: "bill_received_by_store___sent_direct_to_ho",
      sortable: true,width:"5%"
    },
    {
      name: "Bill Paid Direct or Landlord",
      selector: "bill_paid_direct_or_landlord",
      sortable: true,width:"9%"
    },
    { name: "Service From", selector: "service_from", sortable: true ,width:"5%" },
    { name: "Service To", selector: "service_to", sortable: true ,width:"5%"},
    { name: "Elec - kWh", selector: "elec___kwh", sortable: true ,width:"5%"},
    { name: "DG - kWh", selector: "dg___kwh", sortable: true ,width:"5%"},
    { name: "HAVC-kW", selector: "hvac___kwh", sortable: true ,width:"5%"},
   { name: "R22-kg", selector: "r22___kg", sortable: true ,width:"5%"},
    { name: "R404-kg", selector: "r404___kg", sortable: true ,width:"5%"},
    { name: "R407-kg", selector: "r407___kg", sortable: true ,width:"5%"},
    { name: "Other-Kg", selector: "other___kg", sortable: true ,width:"5%"},
  ];
  const tableData = {
    columns,
    data,
  };
  return (
    <Box sx={{ m: 9 }}>
      <Stack direction="row ">
        <Typography variant="h4">Month Report</Typography>&nbsp;&nbsp;&nbsp;
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
        
        <Button variant="contained" onClick={()=>navigate("/Dashboard/monthlyreports")}>Back</Button>
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
