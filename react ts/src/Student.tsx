import { useEffect, useState } from "react";
import {
  Container,
  
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  Paper,
  Box,
} from "@mui/material";
import axios from "axios";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import StudentDrawer from "./StudentDrawer";
import { IStudent, Icourse } from "./Interface";

const initialValues: IStudent = {
  _id: "",
  name: "",
  phoneNumber: 0,
  gender: "",
  age: 0,
  email: "",
  courses:[],
};

function Student() {
  const [students, setStudents] = useState<IStudent[]>();
  const [selectedStudent, setSelectedStudent] =
    useState<IStudent>(initialValues);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [courses, setCourses] = useState<Icourse[]>();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<IStudent | null>(null);

  const getAllCourses = async () => {
    const response = await axios.get<Icourse[]>("http://localhost:3200/getcourses");
    setCourses(response.data);
  };

  const getAllStudents = async () => {
    try {
      const response = await axios.get<IStudent[]>(
        "http://localhost:3200/getstudents"
      );

      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    getAllStudents();
    getAllCourses();
  }, []);

  const openDrawer = (student: IStudent, editable: boolean) => {
    setSelectedStudent(student);
    setIsDrawerOpen(editable);
    setIsDrawerOpen(true);
  };

  const openEditDrawer = (student: IStudent) => {
    setSelectedStudent(student);
    setIsDrawerOpen(true);
    setIsEditable(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setIsEditable(false);
  };

  const handleAddStudentClick = () => {
    setSelectedStudent(initialValues);
    setIsDrawerOpen(true);
    setIsEditable(true);
  };

  const handleDeleteStudent = async (student: IStudent) => {
    try {
      await axios.delete<IStudent[]>(
        `http://localhost:3200/deletestudentbyid/${student._id}`
      );
      getAllStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };
  const openDeleteDialog = (student: IStudent) => {
    setStudentToDelete(student);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };
 

  return (
    <>
    <Grid container 
  direction="row"
  justifyContent="space-between"
  alignItems="flex-start"
  paddingBottom={3}
>
        <Grid  >
          <Typography variant="h5">Student Details</Typography>
        </Grid>
        
        <Grid  >
        <Button
            variant="contained"
            color="secondary"
            onClick={handleAddStudentClick}
          >
            Add student
          </Button>
        </Grid>
      </Grid>

      <Container >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">name</TableCell>
                <TableCell align="center">email</TableCell>
                <TableCell align="center">phoneNumber</TableCell>
                <TableCell align="center">gender</TableCell>
                <TableCell align="center">age</TableCell>
                <TableCell align="center">Courses</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students &&
                students.length &&
                students?.map((student, index) => (
                  <TableRow key={index}>
                    <TableCell align="center" component="th">
                      {student.name}
                    </TableCell>
                    <TableCell align="center">{student.email}</TableCell>
                    <TableCell align="center">{student.phoneNumber}</TableCell>
                    <TableCell align="center">{student.gender}</TableCell>
                    <TableCell align="center">{student.age}</TableCell>
                    <TableCell align="center">
                    
                        {
                          student.courses && student.courses.map((id,index)=>(
                            <p key={index}>
                              {courses?.find((_course)=>_course._id == id)?.title}
                            </p>
                          ))
                        }

                    </TableCell>

                    <TableCell align="center">
                      <Tooltip title="View">
                        <IconButton onClick={() => openDrawer(student, false)}>
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton onClick={() => openEditDrawer(student)}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => openDeleteDialog(student)}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      

      {isDrawerOpen && (
        <StudentDrawer
          open={isDrawerOpen}
          onClose={closeDrawer}
          StudentData={selectedStudent}
          onSuccess={() => {
            getAllStudents();
            setIsDrawerOpen(false);
            setIsEditable(false);
          }}
          courses={courses ?? []}
          isEditable={isEditable}
        />
      )}
      <Dialog sx={{height:"600px"}} open={isDeleteDialogOpen} onClose={closeDeleteDialog}>
        <Box>
        <DialogTitle>Delete Student</DialogTitle>
        <DialogContent>
          {studentToDelete && (
            <div>
              <p>Name: {studentToDelete.name}</p>
              <p>Email: {studentToDelete.email}</p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDeleteStudent(studentToDelete!);
              closeDeleteDialog();
            }}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}

export default Student;
