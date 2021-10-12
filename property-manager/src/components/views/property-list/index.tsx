import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import PropertyTile from '../../patterns/property-tile';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface PropertyInfoType {
    address: string,
    description: string, 
    listedBy: string,
    referenceId: string
}

interface Props {
    properties: PropertyInfoType[]
}

const API_URL = 'http://localhost:9000/graphql';

export default function PropertyList({properties}: Props){

    const source = axios.CancelToken.source();
    const [hasEncounteredError, setLoaderror] = useState(false);

    const fetchPropertyDetails = async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
              }

            const details = await axios.post(API_URL,{
                cancelToken: source.token,
                headers,
                body: { query: `
                query {
                    properties {
                      _id
                      address
                      description
                      price
                      datePosted
                    }
                  }`
                }});

                console.log('Property Info from remote DB');
                console.log(details);
                return details;
        }
        catch(e) {
            setLoaderror(true);
            console.log(e);
        }
   
    }

    useEffect(() => {
        fetchPropertyDetails();
        return () => {
            source.cancel();
        }
    }, [])

    if(hasEncounteredError){
        return null;
    }

    return(      
    <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                NationWide Property Manager
            </Typography>
            <Grid container spacing={10}>
            {
                properties?.map((property, index) =>
                    <Grid item xs={12} sm={10} md={4} lg={6} xl={3} key={index}>
                        <PropertyTile {...property}/>
                    </Grid>)
            }
            </Grid>
        </Box>
  </Container>);
}

PropertyList.propTypes = {
    properties: PropTypes.arrayOf(Object)
}