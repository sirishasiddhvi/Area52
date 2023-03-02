import "../../App.css"
import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  TableCell,
  Paper,
  TableBody,
  Table,
  TableContainer,
  TableRow,
  TableHead,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  DialogContentText,
  Typography,
} from "@mui/material";
import { Check, Save } from "@mui/icons-material";
import { green } from "@mui/material/colors";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { SnackContext } from "../Context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
const axios = require("axios");

export function FollowUp1() {
  const [open, setOpen] = useState(false);
  const [open_update, setOpen_update] = useState(false);
  const [open_summary, setOpen_summary] = useState(false);
  const [summary, setSummary] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  const [pageSize, setPageSize] = useState(7);
  const { snack, setSnack } = useContext(SnackContext);
  const [store_no, setStore_no] = useState();
  const [poc_name, setPoc_name] = useState();
  const [poc_mobile, setPoc_mobile] = useState();
  const [poc_email, setPoc_email] = useState();
  const [follow_1, setFollow_1] = useState();
  const [follow_2, setFollow_2] = useState();
  const [follow_3, setFollow_3] = useState();
  const [bill_paid, setBill_paid] = useState();
  const [notes, setNotes] = useState();
  const [id, setId] = useState();
  const [selectionModel, setSelectionModel] = useState([]);
  var today = new Date();
  var month_now = moment(today).format("MMMM");
  const [month, setMonth] = useState(month_now);
  const month_name = [
    { id: "01-2022", month: "January" },
    { id: "02-2022", month: "February" },
    { id: "03-2022", month: "March" },
    { id: "04-2022", month: "April" },
    { id: "05-2022", month: "May" },
    { id: "06-2022", month: "June" },
    { id: "07-2022", month: "July" },
    { id: "08-2022", month: "August" },
    { id: "09-2022", month: "September " },
    { id: "10-2022", month: "October" },
    { id: "11-2022", month: "November" },
    { id: "12-2022", month: "December" },
  ];
  useEffect(() => {
    const formdata = new FormData();
    formdata.append("month", month_now);
    setLoading(true);
    axios.post("/api/follow_monthly", formdata).then(function (res) {
      if (res.data.status === true) {
        console.log(res.data.data);
        setData(res.data.data);
        setLoading(false);
        setSnack({
          message: res.data.msg,
          type: "success",
          open: true,
        });
      } else {
        setSnack({
          message: res.data.msg,
          type: "error",
          open: true,
        });
      }
    });
  }, []);

  const monthSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(month);
    const formdata = new FormData();
    formdata.append("month", month);
    await axios.post("/api/follow_monthly", formdata).then(function (res) {
      console.log("hi");
      if (res.data.status === true) {
        console.log(month);
        console.log(res.data.data);
        setData(res.data.data);
        setLoading(false);
        setSnack({
          message: res.data.msg,
          type: "success",
          open: true,
        });
      } else {
        setSnack({
          message: res.data.msg,
          type: "error",
          open: true,
        });
      }
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(id);
    const formdata = new FormData();
    formdata.append("month", month);
    formdata.append("id", id);
    formdata.append("store_no", store_no);
    formdata.append("poc_name", poc_name);
    formdata.append("poc_mobile", poc_mobile);
    formdata.append("poc_email", poc_email);
    formdata.append("follow1", follow_1);
    formdata.append("follow2", follow_2);
    formdata.append("follow3", follow_3);
    formdata.append("bill_paid", bill_paid);
    formdata.append("mms", notes);
    await axios.post("/api/edit_follow", formdata).then(function (res) {
      console.log("hiiiiiii");
      if (res.data.status === true) {
        setOpen(false);
        const form_data = new FormData();
        form_data.append("month", month);
        axios.post("/api/follow_monthly", form_data).then(function (resp) {
          console.log("saved");
          console.log(resp.data.data);
          setData(resp.data.data);
        });
      }
    });
  };
  const updateSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    console.log(JSON.stringify(selectionModel));
    formdata.append("bulk_update", JSON.stringify(selectionModel));
    formdata.append("follow1", follow_1);
    formdata.append("follow2", follow_2);
    formdata.append("follow3", follow_3);
    formdata.append("billpaid", bill_paid);
    formdata.append("mms", notes);
    await axios
      .post("/api/followup_bulk_update", formdata)
      .then(function (res) {
        console.log("hiiiiiii");
        if (res.data.status === true) {
          setOpen_update(false);
          const form_data = new FormData();
          form_data.append("month", month);
          axios.post("/api/follow_monthly", form_data).then(function (resp) {
            console.log("hi");
            if (resp.data.status === true) {
              console.log(month);
              console.log(resp.data.data);
              setData(resp.data.data);
            }
          });
          setSnack({
            message: res.data.msg,
            type: "success",
            open: true,
          });
        }
      });
  };
  const columns = [
    // { field: "id", headerName: "ID", width: 80 , headerClassName: "follow",},
    { field: "store_no", headerName: "Store No.", width: 80 , headerClassName: "follow",},
    { field: "store_code", headerName: "Store Code", width: 90 , headerClassName: "follow",},
    { field: "store_name", headerName: "Store Name", width: 200 , headerClassName: "follow",},
    { field: "poc_name", headerName: "Shop POC Name", width: 130 , headerClassName: "follow",},
    { field: "poc_no", headerName: "Shop POC Mob No", width: 130 , headerClassName: "follow",},
    { field: "poc_email", headerName: "M&S Email Id", width: 130 , headerClassName: "follow",},
    {
      field: "follow1",
      headerName: "1st follow-up done on Date",
      headerClassName: "follow",
      width: 90,
      editable: true, headerClassName: "follow",
    },
    {
      field: "follow2",
      headerName: "2nd follow-up done on Date",
      width: 90,
      editable: true, headerClassName: "follow",
    },
    {
      field: "follow3",
      headerName: "3rd follow-up done on Date",
      width: 90,
      editable: true, headerClassName: "follow",
    },
    {
      field: "bill_paid",
      headerName: "Bill Received",
      width: 90,
      editable: true, headerClassName: "follow",
    },
    { field: "mms", headerName: "MMS", width: 90, editable: true ,headerClassName: "follow",},
    {
      field: "actions",
      headerName: "Actions",
      headerClassName: "follow",
      type: "actions",
      renderCell: (row) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            console.log(row.row);
            setId(row.id);
            setStore_no(row.row.store_no);
            setPoc_name(row.row.poc_name);
            setPoc_mobile(row.row.poc_mobile);
            setPoc_email(row.row.poc_email);
            setFollow_1(row.row.follow1);
            setFollow_2(row.row.follow2);
            setFollow_3(row.row.follow3);
            setBill_paid(row.row.bill_paid);
            setNotes(row.row.mms);
            setOpen(true);
          }}
        >
          edit
        </Button>
      ),
    },
  ];
 
  const monthSummary=async()=>{
    console.log("hhhhhhhh")
    setOpen_summary(true)
    const formdata = new FormData();
    formdata.append("month", month);
    await axios.post("/api/followup_summary", formdata).then(function (res) {
      console.log("hi");
      if (res.data.status === true) {
      console.log(res.data.data)
      setSummary(res.data.data)
      }else{
        console.log("nooooooo")
      }
  })
}
  return (
    <Box sx={{ m: 12, 
    width: "70%", 
  }}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
         <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Typography variant="h4">Follow Up</Typography>&nbsp;&nbsp;
        <Button
          disabled={selectionModel.length === 0 ? true : false}
          variant="contained"
          size="small"
          onClick={() => setOpen_update(true)}
        >
          update
        </Button></Grid>
        <Grid
        container
        direction="row"
        spacing={2}
        justifyContent="flex-end"
        alignItems="center"
      >
        {/* <Button
          variant="contained"
          size="small"
          onClick={monthSummary}
        >
        summary
        </Button>&nbsp;&nbsp; */}
        <form onSubmit={monthSubmit}>
          <TextField
            select
            fullwidth
            size="small"
            label="Month"
            name="month"
            variant="outlined"
            value={month}
            sx={{
              borderRadius: "8px",
              width: 100,
            }}
            onChange={(e) => setMonth(e.target.value)}
          >
            {month_name.map((months) => (
              <MenuItem value={months.month}>{months.month}</MenuItem>
            ))}
          </TextField>&nbsp;&nbsp;
          <Button type="submit" size="small" variant="contained">
            search
          </Button>
        </form>
      </Grid>
</Grid>
      <Box
        sx={{
          my: 5,
          height: "250%",
          // width: "90%",
          backgroundColor: "white"
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={pageSize}
          getRowId={(row) => row.id}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[7, 10, 20]}
          checkboxSelection
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
            console.log(selectionModel);
          }}
          selectionModel={selectionModel}
        />
         <Dialog
          open={open_summary}
          onClose={() => {
            setOpen_summary(false);
          }}
        ><DialogContent>
        <DialogContentText>
   <Box sx={{p:4}}>
   <Typography variant="h4"align="center">Summary</Typography><hr/>
    <Typography variant="h6"align="center">Month : {summary.month}</Typography>
         <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>summary</TableCell>
            <TableCell>Yes</TableCell>
            <TableCell>No</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Follow-Up1</TableCell>
            <TableCell>{summary.follow1yes}</TableCell>
            <TableCell> {summary.follow1no}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Follow-Up2</TableCell>
            <TableCell>{summary.follow2yes}</TableCell>
            <TableCell>{summary.follow2no}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Follow-Up3</TableCell>
            <TableCell>{summary.follow3yes}</TableCell>
            <TableCell>{summary.follow3no}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bill Paid</TableCell>
            <TableCell>{summary.billpaidyes}</TableCell>
            <TableCell>{summary.billpaidno}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    <Grid item
    direction="row"
    justifyContent="center"
    alignItems="center">
    <Button variant="contained" size="small" type="button" alignItems="center" sx={{m:2,mx:8}}onClick={()=>setOpen_summary(false)}>ok</Button></Grid>
        </Box>
          </DialogContentText>
          </DialogContent>
        </Dialog>
        <Dialog
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                height: "50%",
                width: "95%",
              }}
            >
              <DialogContent>
                <DialogContentText>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                  >
                    <Grid container>
                      <Typography sx={{ my: 2, mx: 15 }} variant="h5">
                        followUp MonthlyReports
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        disabled
                        size="small"
                        name="month"
                        label="Month"
                        value={month}
                        sx={{ m: 2, width: "80%" }}
                        onChange={(e) => setMonth(e.target.value)}
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        disabled
                        size="small"
                        name="storeno"
                        label="Store No."
                        value={store_no}
                        sx={{ m: 2, width: "80%" }}
                        onChange={(e) => setStore_no(e.target.value)}
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        size="small"
                        name="pocname"
                        label="POC Name."
                        value={poc_name}
                        sx={{ m: 2, width: "80%" }}
                        onChange={(e) => setPoc_name(e.target.value)}
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        size="small"
                        name="pocmobile"
                        label="POC Mobile Number"
                        value={poc_mobile}
                        sx={{ m: 2, width: "80%" }}
                        onChange={(e) => setPoc_mobile(e.target.value)}
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        size="small"
                        name="pocemail"
                        label="POC Email"
                        value={poc_email}
                        sx={{ m: 2, width: "80%" }}
                        onChange={(e) => setPoc_email(e.target.value)}
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        select
                        size="small"
                        name="first_follow"
                        label="Firstfollowup"
                        value={follow_1}
                        sx={{ m: 2, width: "80%" }}
                        onChange={(e) => setFollow_1(e.target.value)}
                      >
                        <MenuItem value="">--None--</MenuItem>
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        select
                        size="small"
                        name="second_follow"
                        label="Secondfollowup"
                        value={follow_2}
                        sx={{ m: 2, width: "80%" }}
                        onChange={(e) => setFollow_2(e.target.value)}
                      >
                        <MenuItem value="">--None--</MenuItem>
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        select
                        size="small"
                        variant="outlined"
                        name="third_follow"
                        label="Thirdfollowup"
                        value={follow_3}
                        sx={{ m: 2, width: "80%" }}
                        onChange={(e) => setFollow_3(e.target.value)}
                      >
                        <MenuItem value="">--None--</MenuItem>
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        select
                        size="small"
                        name="bill_received"
                        label="BillReceived"
                        value={bill_paid}
                        sx={{ m: 2, width: "80%" }}
                        onChange={(e) => setBill_paid(e.target.value)}
                      >
                        <MenuItem value="">--None--</MenuItem>
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        size="small"
                        name="notes"
                        label="MMS"
                        value={notes}
                        sx={{ m: 2, width: "80%" }}
                        onChange={(e) => setNotes(e.target.value)}
                      ></TextField>
                    </Grid>
                  </Grid>
                  {/* </Box> */}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-around"
                  alignItems="center"
                >
                  <Button
                    size="small"
                    variant="contained"
                    type="submit"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    back
                  </Button>
                  <Button size="small" variant="contained" type="submit">
                    save
                  </Button>
                </Grid>
              </DialogActions>
            </Box>
          </form>
        </Dialog>
        <Dialog
          open={open_update}
          onClose={() => {
            setOpen_update(false);
          }}
        >
          <form onSubmit={updateSubmit}>
            <Box>
              <DialogContent>
                <DialogContentText>
                  <Grid
                    container
                    direction="column"
                    justifyContent="space-around"
                    alignItems="center"
                  >
                    <Grid container>
                      <Typography sx={{ my: 2, mx: 5 }} variant="h5">
                        Bulk Update
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        select
                        fullWidth
                        size="small"
                        name="first_follow"
                        label="Firstfollowup"
                        value={follow_1}
                        sx={{ m: 2 }}
                        onChange={(e) => setFollow_1(e.target.value)}
                      >
                        <MenuItem value="">--None--</MenuItem>
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        select
                        size="small"
                        name="second_follow"
                        label="Secondfollowup"
                        value={follow_2}
                        sx={{ m: 2, width: "100%" }}
                        onChange={(e) => setFollow_2(e.target.value)}
                      >
                        <MenuItem value="">--None--</MenuItem>
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        select
                        size="small"
                        variant="outlined"
                        name="third_follow"
                        label="Thirdfollowup"
                        value={follow_3}
                        sx={{ m: 2, width: "80%" }}
                        onChange={(e) => setFollow_3(e.target.value)}
                      >
                        <MenuItem value="">--None--</MenuItem>
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        select
                        size="small"
                        name="bill_received"
                        label="BillReceived"
                        value={bill_paid}
                        sx={{ m: 2, width: "80%" }}
                        onChange={(e) => setBill_paid(e.target.value)}
                      >
                        <MenuItem value="">--None--</MenuItem>
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        size="small"
                        name="notes"
                        label="MMS"
                        value={notes}
                        sx={{ m: 2, width: "80%" }}
                        onChange={(e) => setNotes(e.target.value)}
                      ></TextField>
                    </Grid>
                  </Grid>
                  {/* </Box> */}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-around"
                  alignItems="center"
                >
                  <Button
                    size="small"
                    variant="contained"
                    type="submit"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    back
                  </Button>
                  <Button size="small" variant="contained" type="submit">
                    save
                  </Button>
                </Grid>
              </DialogActions>
            </Box>
          </form>
        </Dialog>
      </Box>
    </Box>
  );
}
