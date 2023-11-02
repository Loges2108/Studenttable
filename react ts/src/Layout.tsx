

import React, { ReactNode } from 'react';


import { Outlet } from 'react-router';
import Navbar from './Navbar';
import { Box } from '@mui/material';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = () => {
  return (
    <Box>
    <Navbar/>
    <Outlet/>  
    </Box>
  )
};

export default Layout;
