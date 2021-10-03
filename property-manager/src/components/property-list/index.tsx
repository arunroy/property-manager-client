import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PropertyCard from '../property-card';
import PropTypes, { InferProps } from 'prop-types';

interface PropertyInfoType {
    address?: string,
    description?: string, 
    listedBy?: string
}

interface Props {
    properties: PropertyInfoType[]
}

type PropertyList = Array<PropertyInfoType>


const properties = [{
    address: '41 Manchester Road',
    description: 'Newly refurbished spacious flat',
    listedBy: 'Arun Roy'
  },{
    address: '92 Cranbook Road',
    description: 'Meticulous apartment',
    listedBy: 'Scott Wills'
  },{
    address: '203 Alps avenue',
    description: 'new construction',
    listedBy: 'Chuck Norris'
  },{
    address: '45 Kensington Lane',
    description: 'Royal suites',
    listedBy: 'Arun Roy'
  },
  ]

export default function PropertyList({properties}: InferProps<typeof PropertyList.propTypes>){
    return(      
    <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                NationWide Property Manager
            </Typography>
            <Grid container spacing={10}>
            {
                properties?.map(property =>
                    <Grid item xs={12} sm={10} md={4} lg={6} xl={3}>
                                <div>
                                <img src="https://via.placeholder.com/280x200" alt="Property images"/>
                                        <div>
                                            <span>{ property.address }</span>
                                        </div>
                                        <div>
                                            <span>{ property.description }</span>
                                        </div>
                                        <div>
                                            <span> { property.listedBy }</span>
                                        </div>
                                </div>
                    </Grid>)
            }
            </Grid>
        </Box>
  </Container>);
}

PropertyList.propTypes = {
    properties: PropTypes.arrayOf(Object)
}