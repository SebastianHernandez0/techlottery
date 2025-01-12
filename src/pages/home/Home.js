import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppAppBar from '../../components/AppAppBar';
import FAQ from '../../components/FAQ';
import Footer from '../../components/Footer';
import AppTheme from '../../shared-theme/AppTheme';

export default function Home(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      
      <div>
        
        
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </div>
    </AppTheme>
  );
}
