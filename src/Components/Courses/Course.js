import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import BasicBreadcrumbs from "../Breadcrumbs";
import Menu from "../Menu/Menu";
import { useEffect, useState } from "react";
import Table from "../Table";
import GradeForm from "../Grades/GradeForm";
import StudentForm from "../Students/StudentForm";
import useStudents from "../../Hooks/useStudents";
import useGrades from "../../Hooks/useGrades";
import useTasks from "../../Hooks/useTasks";
import TaskForm from "../Tasks/TaskForm";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { Alert } from "@mui/material";
import { useSelector } from "react-redux";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import TaskSolutionForm from "../Tasks/TaskSolutionForm";

export default function Course(props) {
  const [view, setView] = useState(1);
  const [gradeForm, setGradeForm] = useState(false);
  const [studentForm, setStudentForm] = useState(false);
  const [taskForm, setTaskForm] = useState(false);
  const [taskSolutionForm, setTaskSolutionForm] = useState(false);
  const [successTask, setSuccessTask] = useState();
  const taskDeleted = useSelector((state) => state.course.deletedTask);
  var course = props.course;
  const students = useStudents(course.id);
  const grades = useGrades(course.id);
  const tasks = useTasks(course.id);

  const _StudentsActionsCell = (params) => {
    return (
      <Stack direction="row" spacing={1}>
        <IconButton
          aria-label="delete"
          color="error"
          onClick={() => handleRemoveStudent(params)}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
    );
  };

  const _GradesActionsCell = (params) => {
    return (
      <Stack direction="row" spacing={1}>
        <IconButton
          aria-label="delete"
          color="error"
          onClick={() => handleRemoveGrade(params)}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
    );
  };

  const handleRemoveStudent = (Student) => {
    students.remove(Student.value.id);
  };

  const handleRemoveGrade = (grade) => {
    grades.remove(grade.value.id);
  };

  const studentsColumns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "idnumber", headerName: "ID Number", width: 200 },
    { field: "name", headerName: "Student Name", width: 250 },
    {
      field: "actions",
      headerName: "Actions",
      width: 280,
      renderCell: _StudentsActionsCell,
    },
  ];

  const gradesColumns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "studentid", headerName: "Student ID", width: 130 },
    { field: "courseid", headerName: "Course ID", width: 130 },
    { field: "grade", headerName: "Grade", width: 250 },
    props?.user?.admin && {
      field: "actions",
      headerName: "Actions",
      width: 280,
      renderCell: _GradesActionsCell,
    },
  ];

  const ActionsCell = (params) => {
    return (
      <Stack direction="row" spacing={1}>
        {props?.user?.admin && (
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => handleRemoveTask(params)}
          >
            <DeleteIcon />
          </IconButton>
        )}
        {!props?.user?.admin && (
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => handleUploadSolution(params)}
          >
            <UploadFileIcon />
          </IconButton>
        )}
        <a href={params?.value?.filename}>
          <IconButton aria-label="View">
            <DownloadIcon />
          </IconButton>
        </a>
      </Stack>
    );
  };

  useEffect(() => {
    tasks.refresh();
  }, [taskDeleted]);

  const taskColumns = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "name", headerName: "Task Name", width: 150 },
    { field: "filename", headerName: "Task's File Name", width: 200 },
    props?.user?.admin && { field: "solutions", headerName: "Solutions URL's", minWidth: 350, flex: 1},
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: ActionsCell,
    },
  ];

  const handleAddGrade = () => {
    setGradeForm(!gradeForm);
  };

  const handleAddStudent = () => {
    setStudentForm(!studentForm);
  };

  const handleAddTask = () => {
    setTaskForm(!taskForm);
  };

  const handleRemoveTask = (task) => {
    tasks.remove(task.value.id);
  };

  const handleUploadSolution = (task) => {
    setTaskSolutionForm(task)
  };

  useEffect(() => {
    if (taskDeleted) setSuccessTask(true);
  }, [taskDeleted]);

  const StudentList = students?.list?.map((student) => {
    return {
      id: student?.id,
      name: student.name,
      idnumber: student.idnumber,
      actions: student,
    };
  });

  const GradesList = () => {
    if(props?.user.admin) {
      return grades?.list?.map((grade) => {
        return {
          id: grade.id,
          studentid: grade.student?.idnumber,
          courseid: grade.courseId,
          grade: grade.grade,
          actions: grade,
        };
      });
    }
    return grades?.list
      ?.filter((grade) => grade.student.idnumber == props?.user?.idnumber)
      .map((filteredGrade) => {
        return {
          id: filteredGrade.id,
          studentid: filteredGrade.student?.idnumber,
          courseid: filteredGrade.courseId,
          grade: filteredGrade.grade,
          actions: filteredGrade,
        };
      });
  };

  const TaskList = tasks?.list?.map((task) => {
    var filename = task.filename.substring(
      task.filename.lastIndexOf("/") + 1,
      task.filename.length
    );
    return {
      id: task.id,
      name: task.name,
      filename: filename,
      solutions: task.filesolutions,
      actions: task,
    };
  });

  const Students = (
    <Card sx={styles.card}>
      <CardHeader action={<BasicBreadcrumbs />} />
      <CardContent sx={{ height: "90%" }}>
        <Table
          handleAdd={handleAddStudent}
          btnText="Add Student"
          title="Students List"
          columns={studentsColumns}
          rows={StudentList}
        />
      </CardContent>
    </Card>
  );

  const Grades = (
    <Card sx={styles.card}>
      <CardHeader action={<BasicBreadcrumbs />} />
      <CardContent sx={{ height: "90%" }}>
        <Table
          handleAdd={handleAddGrade}
          btnText={props?.user?.admin && "Add Grade"}
          title="Grades List"
          columns={gradesColumns}
          rows={GradesList()}
        />
      </CardContent>
    </Card>
  );

  const Tasks = (
    <Card sx={styles.card}>
      <CardHeader action={<BasicBreadcrumbs />} />
      <CardContent sx={{ height: "90%" }}>
        {successTask && (
          <Alert severity="success">Task has been deleted successfully</Alert>
        )}
        <Table
          handleAdd={handleAddTask}
          btnText={props?.user?.admin && "Add Task"}
          title="Task List"
          columns={taskColumns}
          rows={TaskList}
        />
      </CardContent>
    </Card>
  );

  return (
    <div className="course-container">
      <GradeForm
        course={course}
        students={students}
        open={gradeForm}
        setOpen={setGradeForm}
      />
      <StudentForm
        course={course}
        open={studentForm}
        setOpen={setStudentForm}
      />
      <TaskForm course={course} open={taskForm} setOpen={setTaskForm} />
      <TaskSolutionForm course={course} open={taskSolutionForm} setOpen={setTaskSolutionForm} />
      <Menu course={course} setView={setView} user={props?.user} />
      {view === 0 && Students}
      {view === 1 && Grades}
      {view === 2 && Tasks}
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
    flex: "6",
  },
};
