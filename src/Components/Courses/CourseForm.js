import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { addCourse } from "../../Actions/courseActions";
import useUser from "../../Hooks/useUser";
import { Alert } from "@mui/material";

export default function AddCourse(props) {
  const [name, setName] = useState();
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const user = useUser();

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleSubmit = async () => {
    if (name) {
      await dispatch(addCourse(name, user?.id));
      props.setOpen(false);
    } else setError(true);
  };

  return (
    <Dialog open={props.open} onClose={handleClose}>
      {error && <Alert severity="error">Some details are missing.</Alert>}
      <DialogTitle>Add Course</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter course name and click 'Submit':
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Course Name"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
