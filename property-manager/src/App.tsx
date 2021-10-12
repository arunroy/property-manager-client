import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AddNewProperty from './components/views/add-property';
import EditProperty from './components/views/edit-property';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import PropertyList from './components/views/property-list';

const properties = [{
  address: '41 Manchester Road',
  description: 'Newly refurbished spacious flat',
  listedBy: 'Arun Roy',
  referenceId: '1'
},{
  address: '92 Cranbook Road',
  description: 'Meticulous apartment',
  listedBy: 'Scott Wills',
  referenceId: '2'
},{
  address: '203 Alps avenue',
  description: 'new construction',
  listedBy: 'Chuck Norris',
  referenceId: '3'
},{
  address: '45 Kensington Lane',
  description: 'Royal suites',
  listedBy: 'Arun Roy',
  referenceId: '4'
},
]

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/addNew">Add New property</Link>
          </li>
          <li>
            <Link to="/update">Edit property </Link>
          </li>
          <li>
            <Link to='/view'>List All Properties</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <PropertyList properties={properties}/>
          </Route>
          <Route path="/addNew">
            <AddNewPropertyView />
          </Route>
          <Route path="/update">
            <EditPropertyView/>
          </Route>
          <Route path='/view'>
            <PropertyListView/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export function AddNewPropertyView() {
 return (
   <LocalizationProvider dateAdapter={DateAdapter}>
     <Container maxWidth="lg">
       <Box>
       <AddNewProperty/>
       </Box>
     </Container>
     </LocalizationProvider>
 );
}

function EditPropertyView() {
  return (
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Container maxWidth="lg">
          <Box>
            <EditProperty/>
          </Box>
        </Container>
        </LocalizationProvider>
    );
}

export function PropertyListView() {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
    <Container maxWidth="lg">
      <Box>
        <PropertyList properties={properties}/>
      </Box>
    </Container>
    </LocalizationProvider>
  )
}