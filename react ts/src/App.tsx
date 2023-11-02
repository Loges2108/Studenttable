
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
 
import Student from './Student';
import Course from './Courses';
import { Box } from "@mui/material";
import Layout from './Layout';


function App() {
  return (
    <Router>
      <Layout children/>
     <Box padding={5} border={2}>
      <Routes>
        <Route path="/students" element={<Student/>} />
        <Route path="/courses" element={<Course/>} />
      </Routes>
      </Box>
    </Router>
  );
}

export default App;

