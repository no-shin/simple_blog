import { TextField, Button, Grid } from "@mui/material";
import SendIcon from '@mui/icons-material/Send'
import Header from "../components/header";

function form() {
  return (
    <div>
      <Header />
      <Grid container direction="column" spacing={3} alignItems="center">
        <Grid item><TextField id="mailadress" label="email" variant="standard" /></Grid>
        <Grid item><TextField id="password" label="Password" variant="standard" type="password" /></Grid>
        <Grid item><Button variant="contained" endIcon={<SendIcon />}>
          Send
        </Button></Grid>
      </Grid>
    </div>
  );
}

export default form;
