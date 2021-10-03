
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PropertyCard from './components/property-card';
import PropertyForm from './components/new-property-form';
// or @mui/lab/Adapter{DayJS,Luxon,Moment} or any valid date-io adapter
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
export default function Home() {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Container maxWidth="lg">
        <Box>
          <PropertyForm/>
        </Box>
      </Container>
      </LocalizationProvider>
  );
}