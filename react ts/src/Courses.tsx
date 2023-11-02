import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Grid,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import CourseDrawer from "./CourseDrawer";
import { Icourse } from "./Interface";

const initialCourseValues:Icourse = {
  _id: "",
  title: "",
  description: "",
  fees: 0,
};


function Course() {
  const [courses, setCourses] = useState<Icourse[]>([]);
  const [selectedCourse, setSelectedCourse] =
    useState<Icourse>(initialCourseValues);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [CourseDelete, setCourseDelete] = useState<Icourse | null>(null);

  const getAllCourse = async () => {
    const response = await axios.get< Icourse[]>(
      "http://localhost:3200/getcourses"
    );
    setCourses(response.data);
  };

  useEffect(() => {
    getAllCourse();
  }, []);

  const openDrawer = (courses: Icourse, editable: boolean) => {
    setSelectedCourse(courses);
    setIsDrawerOpen(editable);
    setIsDrawerOpen(true);
  };
  const openEditDrawer = (courses:Icourse) => {
    setSelectedCourse(courses);
    setIsDrawerOpen(true);
    setIsEditable(true);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setIsEditable(false);
  };
  const handleAddCourseClick = () => {
    setSelectedCourse(initialCourseValues);
    setIsDrawerOpen(true);
    setIsEditable(true);
  };
  const handleDeleteCourse = async (courseID:Icourse) => {
    try {
      await axios.delete<Icourse[]>(
        `http://localhost:3200/deletecoursebyid/${courseID}`
      );
      getAllCourse();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };
  const openDeleteDialog = (course:Icourse) => {
    setCourseDelete(course);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        paddingBottom={3}
      >
        <Grid>
          <Typography variant="h5">Course Details</Typography>
        </Grid>

        <Grid>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleAddCourseClick}
          >
            Add Course
          </Button>
        </Grid>
      </Grid>
      <Container>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">title</TableCell>
                <TableCell align="center">description</TableCell>
                <TableCell align="center">fees</TableCell>
                <TableCell align="center">view/edit/delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses &&
                courses.length &&
                courses?.map((bcourse, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{bcourse.title}</TableCell>
                    <TableCell align="center">{bcourse.description}</TableCell>
                    <TableCell align="center">{bcourse.fees}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="view">
                        <IconButton onClick={() => openDrawer(bcourse, false)}>
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton onClick={() => openEditDrawer(bcourse)}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => openDeleteDialog(bcourse)}>
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
        <CourseDrawer
          open={isDrawerOpen}
          onClose={closeDrawer}
          details={selectedCourse}
          onSuccess={() => {
            getAllCourse();
            setIsDrawerOpen(false);
            setIsEditable(false);
          }}
          isEditable={isEditable}
        />
      )}
      <Box sx={{display:"flex",alignItems:"center",justifyItems:"center",height:"700px",width:"800px"}}>
      <Dialog
      
        
        open={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
      >
        <Box>
          <DialogTitle>Delete Student</DialogTitle>
          <DialogContent>
            {CourseDelete && (
              <Box>
                <Typography variant="body1">
                  Title: {CourseDelete.title}
                </Typography>
                <Typography variant="body1">
                  Fees:
                  {CourseDelete.fees}
                </Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteDialog} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleDeleteCourse(CourseDelete!);
                closeDeleteDialog();
              }}
              color="error"
            >
              Delete
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      </Box>
    </>
  );
}

export default Course;
