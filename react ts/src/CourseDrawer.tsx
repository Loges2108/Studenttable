import React, { useState } from "react";
import { Drawer, IconButton, TextField, Box,Button, Grid } from "@mui/material";
import { Cancel as CancelIcon } from "@mui/icons-material";
import axios from "axios";
interface ICourse {
  _id:string
    title:string,
    description:string,
    fees:number
  
}

type CourseDetailsDrawerProps =  {
  open: boolean;
  onClose: () => void;
  details: ICourse
  onSuccess: () => void;
  isEditable:boolean; 
   
}

const CourseDrawer: React.FC<CourseDetailsDrawerProps> = ({ open, onClose, details, onSuccess,
  isEditable }) => {
    const [editedCourse, setEditedCourse] = useState( details );

    const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setEditedCourse((prevDetails: ICourse) => ({ ...prevDetails, [name]: value }));
    };
    const onSaveChanges = async () => {
      try {
        if (editedCourse._id) {
         
          await axios.put<ICourse>(`http://localhost:3200/updatecourse/${editedCourse._id}`, editedCourse).then(()=>{
              onSuccess();
              
          });
        } else {
          
          await axios.post<ICourse[]>("http://localhost:3200/createcourse", editedCourse).then(()=>{
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
      },
    }}>
     {details&& (
            <Box padding={3} alignItems={"center"} justifyItems={"center"}>
              <Box>
                <IconButton onClick={onClose} style={{ float: "right" }}>
                  <CancelIcon />
                </IconButton>
                <h2>Course Details</h2>
              <Box>
              <form onSubmit={(e)=>{e.preventDefault();onSaveChanges()}}>
                <TextField fullWidth
                size="medium"
                  sx={{ gap: 2, padding: 1 }}
                  label="Title"
                  name="title"
                  value={editedCourse.title}
                  onChange={handleTextFieldChange}
              autoFocus={!isEditable}
                />

                <TextField fullWidth
                size="medium"
                  sx={{ gap: 2, padding: 1 }}
                  label="Description"
                  name="description"
                  value={editedCourse.description}
                  onChange={handleTextFieldChange}
              autoFocus={!isEditable}
                />

                <TextField fullWidth
                size="medium"
                  sx={{ gap: 2, padding: 1 }}
                  label="Fees"
                  name="fees"
                  value={editedCourse.fees}
                  onChange={handleTextFieldChange}
              autoFocus={!isEditable}
                />
                { isEditable&&
            <Box sx={{padding:1}}>
         <Grid container
  direction="row"
  justifyContent="end"
  alignItems="flex-start"
>
        <Grid item rowSpacing={5} >
          
          <Button sx={{padding:1}}
          variant="contained" color="primary"
          onClick={onSaveChanges}>Save</Button>
        </Grid>
        
        <Grid item rowSpacing={5} >
        <Button sx={{padding:1}}
          variant="contained" color="primary"
          onClick={onClose}>Cancel</Button>
        </Grid>
      </Grid>
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

export default CourseDrawer;