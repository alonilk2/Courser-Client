import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { addGrade } from "../../Actions/gradesActions";
import useUser from "../../Hooks/useUser";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Alert } from "@mui/material";
export default function GradeForm(props) {
  const [grade, setGrade] = useState();
  const [id, setId] = useState();
  const [error, setError] = useState();

  const dispatch = useDispatch();
  let studentList = props?.students?.list;

  useEffect(() => {
    if (props?.students?.length > 0) setId(props?.students[0].idnumber);
  }, []);

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleSubmit = async () => {
    if (grade && id) {
      await dispatch(addGrade(props.course.id, id, grade));
      props.setOpen(false);
    } else setError(true);
  };

  const rows = studentList?.map((student) => {
    return <MenuItem value={student.idnumber}>{student.idnumber}</MenuItem>;
  });

  return (
    <Dialog open={props.open} onClose={handleClose}>
      {error && <Alert severity="error">Some details are missing.</Alert>}
      <DialogTitle>Add Grade</DialogTitle>
      <DialogContent>
        <DialogContentText>Fill the form and click 'Submit':</DialogContentText>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Student ID</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={id}
            label="Student ID"
            onChange={(e) => setId(e.target.value)}
          >
            {rows}
          </Select>
        </FormControl>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Grade"
          type="number"
          fullWidth
          variant="standard"
          onChange={(e) => setGrade(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
