
import { Link} from 'react-router-dom';
import { AppBar, Toolbar, Box } from '@mui/material';

function Navbar() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
         <Box padding={1}>
            <Link to="/students" style={{ textDecoration: 'none', color: 'red' }}>
              Students
            </Link>
            </Box>
        <Box padding={1}>
            <Link to="/courses" style={{ textDecoration: 'none', color: 'white' }}>
              Courses
            </Link>
            </Box>
        </Toolbar>
      </AppBar>
      
    </Box>
  );
}

export default Navbar;