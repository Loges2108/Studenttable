import React, { useState } from "react";
import { Drawer, IconButton, TextField, Box,Button, Tooltip, Typography, Divider} from "@mui/material";
import { Cancel as CancelIcon } from "@mui/icons-material";
import axios from "axios";
import { Icourse } from "./Interface";


type CourseDetailsDrawerProps =  {
  open: boolean;
  onClose: () => void;
  details: Icourse
  onSuccess: () => void;
  isEditable:boolean; 
   
}

const CourseDrawer: React.FC<CourseDetailsDrawerProps> = ({ open, onClose, details, onSuccess,
  isEditable }) => {
    const [editedCourse, setEditedCourse] = useState( details );

    const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setEditedCourse((prevDetails: Icourse) => ({ ...prevDetails, [name]: value }));
    };
    const onSaveChanges = async () => {
      try {
        if (editedCourse._id) {
         
          await axios.put<Icourse>(`http://localhost:3200/updatecourse/${editedCourse._id}`, editedCourse).then(()=>{
              onSuccess();
              
          });
        } else {
          
          await axios.post<Icourse[]>("http://localhost:3200/createcourse", editedCourse).then(()=>{
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
     {details&& (
            <Box padding={3} alignItems={"center"} justifyItems={"center"}>
              <Box>
              <Tooltip title="Cancel">
                <IconButton onClick={onClose} style={{ float: "right" }}>
                  <CancelIcon />
                </IconButton>
                </Tooltip>
                <Typography variant="h4" > {editedCourse._id != "" ? "Course Details" : "Add Details"}</Typography>
                <Divider />
              <Box paddingY={3}>
              <form onSubmit={(e)=>{e.preventDefault();onSaveChanges()}}>
                <Box>
                <TextField fullWidth
                size="medium"
                  sx={{ gap: 2, padding: 2 }}
                  label="Title"
                  name="title"
                  value={editedCourse.title}
                  onChange={handleTextFieldChange}
              autoFocus={!isEditable}
                />

                <TextField fullWidth
                size="medium"
                  sx={{ gap: 2, padding: 2 }}
                  label="Description"
                  name="description"
                  value={editedCourse.description}
                  onChange={handleTextFieldChange}
              autoFocus={!isEditable}
                />

                <TextField fullWidth
                size="medium"
                  sx={{ gap: 2, padding: 2 }}
                  label="Fees"
                  name="fees"
                  value={editedCourse.fees}
                  onChange={handleTextFieldChange}
              autoFocus={!isEditable}
                />
                </Box>

                { isEditable&&
           <Box display={"flex"}
           justifyContent={"flex-end"}
           gap={1}
           marginTop={2}>
      
          
          <Button 
          variant="contained" color="primary"
          onClick={onSaveChanges}
          >Save</Button>
        
        
        
        <Button 
          variant="contained" color="primary"
          onClick={onClose}>Cancel</Button>
        
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