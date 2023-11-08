import React, { useState } from "react";
import { Drawer, IconButton, TextField, Box, Button, Checkbox, Typography ,FormControlLabel, Divider, Tooltip} from "@mui/material";
import { Cancel as CancelIcon, } from "@mui/icons-material";
import axios from "axios";
import { IStudent, Icourse } from "./Interface";


type StudentDrawerProps = {
  open: boolean;
  onClose: () => void;
  StudentData: IStudent;
  onSuccess: () => void;
  isEditable: boolean;
  courses: Icourse[];
}
const StudentDrawer: React.FC<StudentDrawerProps> = ({
  open,
  onClose,
  StudentData,
  onSuccess,
  isEditable,
  courses,
}: StudentDrawerProps) => {
  const [editedStudent, setEditedStudent] = useState<IStudent>({
    ...StudentData,
    courses: [],
  });
  const [selectedCourses, setSelectedCourses] = useState<string[]>(StudentData.courses.map(String));


  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedStudent((prevDetails: IStudent) => ({ ...prevDetails, [name]: value }));
  };

  const handleCourseCheckboxChange = (_id: string) => {
    if (selectedCourses.includes(_id)) {
      // If the course is already selected, remove it
      setSelectedCourses((prevCourses) =>
        prevCourses.filter((c) => c !== _id)
      );
    } else {
      // If the course is not selected, add it
      setSelectedCourses((prevCourses) => [...prevCourses, _id]);
    }
  };
  console.log(selectedCourses);


  const onSaveChanges = async () => {
    try {
      const editedStudentWithCourseIds = {
        ...editedStudent,
        courses: selectedCourses,
      };
  
      if (editedStudent._id) {
        await axios.put<IStudent>(`http://localhost:3200/updatestudent/${editedStudent._id}`, editedStudentWithCourseIds).then(() => {
          onSuccess();
        });
      } else {
        await axios.post<IStudent[]>("http://localhost:3200/createstudents", editedStudentWithCourseIds).then(() => {
          onSuccess();
        });
      }
      onClose();
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose} sx={{ position: "relative" }}
    PaperProps={{
      sx: {
        width: "350px",
        height: "100%",
        overflowX:"hidden"
      },
    }}>
      {StudentData && (
        <Box padding={3} alignItems={"center"} justifyItems={"center"}>
          <Box>
          <Tooltip title="Cancel">
            <IconButton onClick={onClose} style={{ float: "right" }}>
              <CancelIcon />
            </IconButton>
            </Tooltip>
            <Typography variant="h4">
            {editedStudent._id != "" ? "Student Details" : "Add Details"}</Typography>
            <Divider />
            <Box paddingY={3}>
            
          <form onSubmit={(e)=>{e.preventDefault();onSaveChanges()}}>
            <Box>
            <TextField fullWidth
              size="medium"
              sx={{ gap: 2, padding: 2 }}
              label="Name"
              name="name"
              value={editedStudent.name}
              onChange={handleTextFieldChange}
              autoFocus={!isEditable}
              InputLabelProps={{
                sx: { textAlign: "center" },
              }}
              InputProps={{
                sx: { textAlign: "center" },
              }}
            />

            <TextField fullWidth
              size="medium"
              sx={{ gap: 2, padding: 2 }}
              label="Age"
              name="age"
              value={editedStudent.age}
              onChange={handleTextFieldChange}
              autoFocus={!isEditable}
              InputLabelProps={{
                sx: { textAlign: "center" },
              }}
              InputProps={{
                sx: { textAlign: "center" },
              }}
            />

            <TextField fullWidth
              size="medium"
              sx={{ gap: 2, padding: 2 }}
              label="Email"
              name="email"
              value={editedStudent.email}
              onChange={handleTextFieldChange}
              autoFocus={!isEditable}
              InputLabelProps={{
                sx: { textAlign: "center" },
              }}
              InputProps={{
                sx: { textAlign: "center" },
              }}
            />
            <TextField fullWidth
              size="medium"
              sx={{ gap: 2, padding: 2 }}
              label="Gender"
              name="gender"
              value={editedStudent.gender}
              onChange={handleTextFieldChange}
              autoFocus={!isEditable}
              InputLabelProps={{
                sx: { textAlign: "center" },
              }}
              InputProps={{
                sx: { textAlign: "center" },
              }}
            />
            <TextField fullWidth
              size="medium"
              sx={{ gap: 2, padding: 2 }}
              label="PhoneNumber"
              name="phoneNumber"
              value={editedStudent.phoneNumber}
              onChange={handleTextFieldChange}
              autoFocus={!isEditable}
              InputLabelProps={{
                sx: { textAlign: "center" },
              }}
              InputProps={{
                sx: { textAlign: "center" },
              }}
            />
            </Box>
            <Box>
             <Typography variant="h6">Courses</Typography>
             </Box>

             {courses &&
  courses.map((courseData: Icourse) => (
    <Box key={courseData._id}>

      <FormControlLabel
        control={
          <Checkbox
            checked={selectedCourses.includes(courseData._id)}
            onChange={() => handleCourseCheckboxChange(courseData._id)}
          />
        }
        label={courseData.title}
      />
    </Box>
  ))}


            { isEditable&&
            <Box display={"flex"}
            justifyContent={"flex-end"}
            gap={1}
            marginTop={2}>
    
            <Button variant="contained" color="primary" onClick={onSaveChanges}>
              Save
            </Button>
          
           
            <Button  variant="contained" color="primary" onClick={onClose}>
              Cancel
            </Button>
            
           
            </Box>
}
            </form>
            </Box>
          </Box>
        </Box>
      )}
    </Drawer>
  );
};

export default StudentDrawer;



