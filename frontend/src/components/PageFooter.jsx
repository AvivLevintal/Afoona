import { Link } from "react-router-dom";
import React from 'react'
import Box from '@mui/material/Box';

function PageFooter() {
  return (
    <Box fontSize={{mobile: '8', laptop: '6'}} sx={{textDecoration: 'underline', textAlign: 'center'}}>
        <Link to='/' className='footer-link'>
            דף הבית
        </Link >
        <Link to='/terms' className='footer-link'>
            תקנון
        </Link>
        <a href='https://www.facebook.com/afoona.recipes/' className='footer-link'>
            כתבו לנו
        </a>
    </Box>
  )
}

export default PageFooter