import { Alert } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useDispatch } from "react-redux";
import SimpleFileUpload from "react-simple-file-upload";
import { addTaskSolution } from "../../Actions/tasksActions";
import { BitlyClient } from 'bitly-react';
import { bitly_key } from "../../Constants";
const bitly = new BitlyClient(bitly_key, {});

export default function TaskSolutionForm(props) {
  const [error, setError] = useState();
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  let filesolutions = props?.open?.value?.filesolutions ? props?.open?.value?.filesolutions.split(",") : []
  console.log()
  const handleClose = () => {
    props.setOpen(false);
  };

  const handleSubmit = async () => {
    if (file) {
      let result = await bitly.shorten(file)
      filesolutions.push(result.url)
      await dispatch(addTaskSolution(props.course.id, filesolutions));
      props.setOpen(false);
    } else setError(true);
  };

  const handleFile = (url) => {
    setFile(url)
  };

  return (
    <Dialog open={props.open !== false} onClose={handleClose}>
      {error && <Alert severity="error">Some details are missing.</Alert>}

      <DialogTitle>Add Tasks</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Drag a file and click 'Submit':
        </DialogContentText>
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
