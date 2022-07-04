import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState, useCallback } from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import useUser from "../../Hooks/useUser";
import { addTask } from "../../Actions/tasksActions";
import { Alert } from "@mui/material";
import SimpleFileUpload from "react-simple-file-upload";

export default function TaskForm(props) {
  const [name, setName] = useState();
  const [error, setError] = useState();
  const [file, setFile] = useState();
  const dispatch = useDispatch();

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleSubmit = async () => {
    if (name && file) {
      await dispatch(addTask(props.course.id, name, file));
      props.setOpen(false);
    } else setError(true);
  };

  const handleFile = (url) => {
    setFile(url)
  };

  return (
    <Dialog open={props.open} onClose={handleClose}>
      {error && <Alert severity="error">Some details are missing.</Alert>}

      <DialogTitle>Add Tasks</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill the form, drag a file and click 'Submit':
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Task Name"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => setName(e.target.value)}
        />
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <SimpleFileUpload
            apiKey="9cdd9705c3027e652fccc937143932d8"
            onSuccess={handleFile}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
