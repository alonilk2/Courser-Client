import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import "../css/HomePage.css";
import useCourses from "../Hooks/useCourses";
import AddCourse from "./Courses/CourseForm";
import NavBar from "./Navbar/Navbar";
import Course from "./Courses/Course";
import { useSelector } from "react-redux";
import Menu from "./Menu/Menu";
import Table from "./Table";
import useUser from "../Hooks/useUser";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [courseView, setCourseView] = useState();
  const isDeleted = useSelector((state) => state.course.deleted);
  const user = useUser();
  const courses = useCourses(user?.id);

  const handleAdd = () => {
    setOpen(!open);
  };

  const handleView = (course) => {
    setCourseView(course.value);
  };

  const handleRemove = (course) => {
    courses.remove(course.value.id);
  };

  const ActionsCell = (params) => {
    return (
      <Stack direction="row" spacing={1}>
        {user?.admin && <IconButton
          aria-label="delete"
          color="error"
          onClick={() => handleRemove(params)}
        >
          <DeleteIcon />
        </IconButton>}
        <IconButton aria-label="View" onClick={() => handleView(params)}>
          <RemoveRedEyeIcon />
        </IconButton>
      </Stack>
    );
  };

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Course name", width: 250 },
    {
      field: "count",
      headerName: "Students count",
      width: 250,
      type: "number",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 280,
      renderCell: ActionsCell,
    },
  ];

  const rows = courses?.list?.map((course) => {
    return { id: course.id, name: course.name, actions: course };
  });

  useEffect(() => {
    setTimeout(() => {
      courses.refresh();
    }, [2000]);
  }, [open, isDeleted]);

  return (
    <div className="home-container">
      <AddCourse open={open} setOpen={setOpen} />
      <NavBar />
      <div className="datagrid-container">
        {courseView ? (
          <Course course={courseView} user={user}/>
        ) : (
          <Table
            handleAdd={handleAdd}
            rows={rows}
            columns={columns}
            title="Course List"
            btnText={user?.admin && "Add Course"}
          />
        )}
      </div>
    </div>
  );
}
const styles = {
  btn: {
    width: "150px",
    fontWeight: "400",
    textTransform: "inherit",
  },
  card: {
    height: "100%",
  },
};
